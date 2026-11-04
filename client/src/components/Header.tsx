import React from 'react';
import { Camera, CameraOff, BookOpen, Sparkles } from 'lucide-react';
import { useSignStore } from '../store/useSignStore.js';

interface HeaderProps {
  onToggleCamera: () => void;
  onOpenLexicon: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleCamera, onOpenLexicon }) => {
  const { cameraRunning, activeMode, setActiveMode, isAiPolishing } = useSignStore();

  return (
    <header className="border-b border-surface-700 bg-surface-900/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl">🤟</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                SignBridge AI
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                React + Node
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Assistive Sign Language to English, Hindi & Tamil Voice Translator
            </p>
          </div>
        </div>

        {/* Center / Mode Toggle & AI Indicator */}
        <div className="flex items-center gap-2">
          {/* AI Status Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-800 border border-surface-700 text-xs text-slate-300">
            <Sparkles className={`w-3.5 h-3.5 ${isAiPolishing ? 'text-amber-400 animate-spin' : 'text-indigo-400'}`} />
            <span className="hidden md:inline">
              {isAiPolishing ? 'Gemini AI Refining...' : 'Hybrid AI Interpreter'}
            </span>
          </div>

          {/* Mode Switcher: Sentence vs Fingerspell */}
          <div className="flex items-center p-0.5 rounded-lg bg-surface-800 border border-surface-700 text-xs font-semibold">
            <button
              onClick={() => setActiveMode('SENTENCE')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeMode === 'SENTENCE'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sentence Mode
            </button>
            <button
              onClick={() => setActiveMode('SPELL')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeMode === 'SPELL'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              A–Z Spell
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Dictionary Drawer Button */}
          <button
            onClick={onOpenLexicon}
            className="px-3.5 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 border border-surface-600 text-xs sm:text-sm font-semibold flex items-center gap-2 text-slate-200 transition-all hover:border-slate-500"
            title="Browse full 1,080+ Trilingual Lexicon"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">1,080+ Signs</span>
          </button>

          {/* Camera Start / Stop Button */}
          <button
            onClick={onToggleCamera}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
              cameraRunning
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
            }`}
          >
            {cameraRunning ? (
              <>
                <CameraOff className="w-4 h-4" />
                <span>Stop Camera</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>Start Live Camera</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
