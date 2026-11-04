import { useRef, useCallback } from 'react';
import { useSignStore } from '../store/useSignStore.js';

export function useSpeech() {
  const { isSpeaking, activeAudioLang, setSpeakingState } = useSignStore();
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopSpeaking = useCallback(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingState(false, null);
  }, [setSpeakingState]);

  const speakText = useCallback(
    async (text: string, lang: 'en' | 'hi' | 'ta') => {
      if (!text || !text.trim()) return;

      // Stop any active speech first
      stopSpeaking();
      setSpeakingState(true, lang);

      // Tier 1: Try Backend Gemini Neural TTS Audio Endpoint
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, lang })
        });

        if (response.ok) {
          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          activeAudioRef.current = audio;

          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            activeAudioRef.current = null;
            setSpeakingState(false, null);
          };

          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            activeAudioRef.current = null;
            fallbackToNativeSpeech(text, lang, setSpeakingState);
          };

          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('[Speech] Backend Neural TTS unavailable, using native browser speech:', err);
      }

      // Tier 2: Native Web Speech API Fallback
      fallbackToNativeSpeech(text, lang, setSpeakingState);
    },
    [setSpeakingState, stopSpeaking]
  );

  return {
    speakText,
    stopSpeaking,
    isSpeaking,
    activeAudioLang
  };
}

function fallbackToNativeSpeech(
  text: string,
  lang: 'en' | 'hi' | 'ta',
  setSpeakingState: (speaking: boolean, lang: 'en' | 'hi' | 'ta' | null) => void
) {
  if (!('speechSynthesis' in window)) {
    console.warn('[Speech] Web Speech API not supported in this browser.');
    setSpeakingState(false, null);
    return;
  }

  const langCodes: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    ta: 'ta-IN'
  };

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCodes[lang] || 'en-IN';
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(langCodes[lang]) || v.lang.startsWith(lang));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    setSpeakingState(false, null);
  };

  utterance.onerror = () => {
    setSpeakingState(false, null);
  };

  window.speechSynthesis.speak(utterance);
}

