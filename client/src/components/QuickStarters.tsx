import React from 'react';
import { Zap } from 'lucide-react';
import { QUICK_STARTERS } from '../engine/lexicon.js';
import { useSignStore } from '../store/useSignStore.js';

export const QuickStarters: React.FC = () => {
  const { applyQuickStarter } = useSignStore();

  return (
    <div className="bg-surface-850 border border-surface-700 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
          Quick Starters (1-Tap Scenarios)
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_STARTERS.map((starter) => (
          <button
            key={starter.label}
            onClick={() => applyQuickStarter(starter.ids)}
            className="px-3.5 py-2 rounded-xl bg-surface-800 hover:bg-surface-750 active:scale-95 border border-surface-650 hover:border-indigo-500/50 text-xs sm:text-sm font-semibold text-slate-200 transition-all flex items-center gap-2 shadow-sm"
          >
            <span>{starter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

