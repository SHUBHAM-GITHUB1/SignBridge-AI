import React from 'react';
import { Delete, Trash2, Layers } from 'lucide-react';
import { useSignStore } from '../store/useSignStore.js';
import { HandIcon } from './HandIcon.js';

export const SequenceBar: React.FC = () => {
  const { signedSequence, removeSignAtIndex, clearSequence } = useSignStore();

  return (
    <div className="bg-surface-850 border border-surface-700 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
            Active Signed Sequence ({signedSequence.length})
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              if (signedSequence.length > 0) {
                removeSignAtIndex(signedSequence.length - 1);
              }
            }}
            disabled={signedSequence.length === 0}
            className="px-2.5 py-1 rounded-lg bg-surface-750 hover:bg-surface-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-300 border border-surface-600 flex items-center gap-1.5 transition-all"
            title="Delete Last Sign"
          >
            <Delete className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={clearSequence}
            disabled={signedSequence.length === 0}
            className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-rose-300 border border-rose-500/20 flex items-center gap-1.5 transition-all"
            title="Clear Sequence"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Chip Sequence Container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 min-h-[52px]">
        {signedSequence.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">
            No signs locked yet. Perform a sign or tap the quick starters below!
          </p>
        ) : (
          signedSequence.map((sign, idx) => (
            <div
              key={`${sign.id}-${idx}`}
              className="group flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl bg-surface-800 border border-surface-650 hover:border-indigo-500/50 shadow-md shrink-0 transition-all"
            >
              <div className="w-6 h-6 rounded-md bg-surface-900 border border-surface-700 flex items-center justify-center">
                <HandIcon sign={sign} size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">
                  {sign.en}
                </span>
                <span className="text-[10px] text-indigo-300 leading-tight">
                  {sign.hi} • {sign.ta}
                </span>
              </div>
              <button
                onClick={() => removeSignAtIndex(idx)}
                className="opacity-60 group-hover:opacity-100 hover:text-rose-400 text-slate-400 text-xs ml-1 transition-all"
                title="Remove Sign"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

