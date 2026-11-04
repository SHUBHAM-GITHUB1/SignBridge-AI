import { create } from 'zustand';
import { SignItem, SpatialZone, RecognitionMode, TrilingualOutput } from '../types/sign.js';
import { BASE_SIGNS } from '../engine/lexicon.js';
import { composeDeterministicTrilingual } from '../engine/deterministicComposer.js';

interface SignState {
  cameraRunning: boolean;
  activeMode: RecognitionMode;
  currentSign: SignItem;
  currentConfidence: number;
  currentZone: SpatialZone;
  detectedHandsCount: number;
  isHandMoving: boolean;
  holdProgress: number;
  signedSequence: SignItem[];
  trilingualOutput: TrilingualOutput;
  isAiPolishing: boolean;
  isSpeaking: boolean;
  activeAudioLang: 'en' | 'hi' | 'ta' | null;
  allSigns: SignItem[];
  calibratedVectors: Record<string, number[]>;

  // Actions
  setCameraRunning: (running: boolean) => void;
  setActiveMode: (mode: RecognitionMode) => void;
  setCurrentDetection: (sign: SignItem, conf: number, zone: SpatialZone, isMoving: boolean, handsCount?: number) => void;
  setHoldProgress: (progress: number) => void;
  lockInSign: (sign: SignItem) => void;
  removeSignAtIndex: (index: number) => void;
  clearSequence: () => void;
  applyQuickStarter: (signIds: string[]) => void;
  setAllSigns: (signs: SignItem[]) => void;
  setSpeakingState: (speaking: boolean, lang: 'en' | 'hi' | 'ta' | null) => void;
  refineWithGemini: () => Promise<void>;
}

const defaultInitialSequence = [
  BASE_SIGNS[0], // HELLO
  BASE_SIGNS[1], // I
  BASE_SIGNS[8], // NEED
  BASE_SIGNS[5], // WATER
  BASE_SIGNS[10] // PLEASE
];

let geminiDebounceTimer: any = null;

export const useSignStore = create<SignState>((set, get) => ({
  cameraRunning: false,
  activeMode: 'SENTENCE',
  currentSign: BASE_SIGNS[0],
  currentConfidence: 0.98,
  currentZone: 'MID',
  detectedHandsCount: 0,
  isHandMoving: false,
  holdProgress: 0,
  signedSequence: defaultInitialSequence,
  trilingualOutput: composeDeterministicTrilingual(defaultInitialSequence),
  isAiPolishing: false,
  isSpeaking: false,
  activeAudioLang: null,
  allSigns: BASE_SIGNS,
  calibratedVectors: {},

  setCameraRunning: (running) => set({ cameraRunning: running }),

  setActiveMode: (mode) => set({ activeMode: mode }),

  setCurrentDetection: (sign, conf, zone, isMoving, handsCount = 1) => {
    // Skip the setState if nothing meaningful changed — prevents 60fps re-renders
    const s = get();
    if (
      s.currentSign.id === sign.id &&
      s.isHandMoving === isMoving &&
      s.currentZone  === zone &&
      s.detectedHandsCount === handsCount &&
      Math.abs(s.currentConfidence - conf) < 0.03
    ) return;
    set({ currentSign: sign, currentConfidence: conf, currentZone: zone, isHandMoving: isMoving, detectedHandsCount: handsCount });
  },

  setHoldProgress: (progress) => {
    // Quantise to 1% steps — avoids a re-render on every sub-percent jitter
    const rounded = Math.round(progress * 100) / 100;
    if (Math.abs(get().holdProgress - rounded) < 0.01) return;
    set({ holdProgress: rounded });
  },

  lockInSign: (sign) => {
    const nextSequence = [...get().signedSequence, sign];
    const immediateOutput = composeDeterministicTrilingual(nextSequence);

    set({
      signedSequence: nextSequence,
      trilingualOutput: immediateOutput
    });

    get().refineWithGemini();
  },

  removeSignAtIndex: (index) => {
    const nextSequence = get().signedSequence.filter((_, i) => i !== index);
    const immediateOutput = composeDeterministicTrilingual(nextSequence);

    set({
      signedSequence: nextSequence,
      trilingualOutput: immediateOutput
    });

    get().refineWithGemini();
  },

  clearSequence: () => {
    const immediateOutput = composeDeterministicTrilingual([]);
    set({
      signedSequence: [],
      trilingualOutput: immediateOutput
    });
  },

  applyQuickStarter: (signIds) => {
    const { allSigns } = get();
    const resolved = signIds
      .map(id => allSigns.find(s => s.id === id) || BASE_SIGNS.find(s => s.id === id))
      .filter((s): s is SignItem => Boolean(s));

    const immediateOutput = composeDeterministicTrilingual(resolved);
    set({
      signedSequence: resolved,
      trilingualOutput: immediateOutput
    });

    get().refineWithGemini();
  },

  setAllSigns: (signs) => set({ allSigns: signs }),

  setSpeakingState: (speaking, lang) =>
    set({ isSpeaking: speaking, activeAudioLang: lang }),

  refineWithGemini: async () => {
    const { signedSequence } = get();
    if (signedSequence.length === 0) return;

    if (geminiDebounceTimer) {
      clearTimeout(geminiDebounceTimer);
    }

    set({ isAiPolishing: true });

    geminiDebounceTimer = setTimeout(async () => {
      try {
        const gloss = signedSequence.map(s => s.en.split('/')[0].trim()).join(' + ');

        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gloss })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.en && data.hi && data.ta) {
            set({
              trilingualOutput: {
                en: data.en,
                enPh: data.enPh || get().trilingualOutput.enPh,
                hi: data.hi,
                hiPh: data.hiPh || get().trilingualOutput.hiPh,
                hiAcoustic: data.hiAcoustic || get().trilingualOutput.hiAcoustic,
                ta: data.ta,
                taPh: data.taPh || get().trilingualOutput.taPh,
                taAcoustic: data.taAcoustic || get().trilingualOutput.taAcoustic,
              }
            });
          }
        }
      } catch (err) {
        console.warn('[Store] Gemini refinement request failed, using deterministic output:', err);
      } finally {
        set({ isAiPolishing: false });
      }
    }, 450);
  }
}));

