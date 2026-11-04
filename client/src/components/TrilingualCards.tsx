import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSignStore } from '../store/useSignStore.js';
import { useSpeech } from '../hooks/useSpeech.js';

export const TrilingualCards: React.FC = () => {
  const { trilingualOutput, isAiPolishing } = useSignStore();
  const { speakText, stopSpeaking, isSpeaking, activeAudioLang } = useSpeech();

  const handleSpeak = (text: string, lang: 'en' | 'hi' | 'ta') => {
    if (isSpeaking && activeAudioLang === lang) {
      stopSpeaking();
    } else {
      speakText(text, lang);
    }
  };

  return (
    <div className="space-y-4">
      {/* Cards Header */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
            Real-Time Voice Translation Output
          </h2>
          {isAiPolishing && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
              <Sparkles className="w-3 h-3 animate-spin" />
              Polishing...
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (isSpeaking) {
                stopSpeaking();
              } else {
                await speakText(trilingualOutput.en, 'en');
              }
            }}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Speak Sentence</span>
          </button>
        </div>
      </div>

      {/* Grid of 3 High-Contrast Trilingual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. English Card */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-surface-850 border border-surface-700 hover:border-indigo-500/40 shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  ENGLISH
                </span>
                <span className="text-[11px] text-slate-400 font-mono">en-IN</span>
              </div>
              <button
                onClick={() => handleSpeak(trilingualOutput.en, 'en')}
                className={`p-2 rounded-xl border transition-all ${
                  isSpeaking && activeAudioLang === 'en'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-surface-800 hover:bg-indigo-600 text-slate-300 hover:text-white border-surface-650'
                }`}
                title="Speak in Indian English"
              >
                {isSpeaking && activeAudioLang === 'en' ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3">
              {trilingualOutput.en}
            </p>
          </div>

          <div className="pt-3 border-t border-surface-700/60">
            <p className="text-[11px] font-mono text-indigo-300/80 truncate">
              {trilingualOutput.enPh || 'Pronunciation ready'}
            </p>
          </div>
        </div>

        {/* 2. Hindi Card (Devanagari) */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-surface-850 border border-surface-700 hover:border-amber-500/40 shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  हिंदी (HINDI)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">hi-IN</span>
              </div>
              <button
                onClick={() => handleSpeak(trilingualOutput.hi, 'hi')}
                className={`p-2 rounded-xl border transition-all ${
                  isSpeaking && activeAudioLang === 'hi'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-surface-800 hover:bg-amber-600 text-slate-300 hover:text-white border-surface-650'
                }`}
                title="Speak in Hindi"
              >
                {isSpeaking && activeAudioLang === 'hi' ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-lg sm:text-xl font-hindi font-bold text-amber-50 leading-relaxed mb-3">
              {trilingualOutput.hi}
            </p>
          </div>

          <div className="pt-3 border-t border-surface-700/60">
            <p className="text-[11px] font-mono text-amber-300/80 truncate">
              {trilingualOutput.hiPh || 'Phonetics: Na-mas-te...'}
            </p>
          </div>
        </div>

        {/* 3. Tamil Card (Tamil Script) */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-surface-850 border border-surface-700 hover:border-emerald-500/40 shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  தமிழ் (TAMIL)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">ta-IN</span>
              </div>
              <button
                onClick={() => handleSpeak(trilingualOutput.ta, 'ta')}
                className={`p-2 rounded-xl border transition-all ${
                  isSpeaking && activeAudioLang === 'ta'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-surface-800 hover:bg-emerald-600 text-slate-300 hover:text-white border-surface-650'
                }`}
                title="Speak in Tamil"
              >
                {isSpeaking && activeAudioLang === 'ta' ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-lg sm:text-xl font-tamil font-bold text-emerald-50 leading-relaxed mb-3">
              {trilingualOutput.ta}
            </p>
          </div>

          <div className="pt-3 border-t border-surface-700/60">
            <p className="text-[11px] font-mono text-emerald-300/80 truncate">
              {trilingualOutput.taPh || 'Phonetics: Va-nak-kam...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
