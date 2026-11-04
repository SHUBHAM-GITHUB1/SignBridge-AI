import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Plus } from 'lucide-react';
import { SignItem } from '../types/sign.js';
import { BASE_SIGNS, CATEGORIES } from '../engine/lexicon.js';
import { HandIcon } from './HandIcon.js';
import { useSignStore } from '../store/useSignStore.js';

interface LexiconDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LexiconDrawer: React.FC<LexiconDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Signs');
  const [signs, setSigns] = useState<SignItem[]>(BASE_SIGNS);
  const [loading, setLoading] = useState(false);
  const { lockInSign } = useSignStore();

  // Load signs from backend API
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function fetchSigns() {
      setLoading(true);
      try {
        const res = await fetch(`/api/lexicon?limit=500&category=${encodeURIComponent(selectedCategory)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.items) {
            setSigns(data.items);
          }
        }
      } catch (err) {
        console.warn('Failed to load server lexicon, using default:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSigns();
    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedCategory]);

  const filteredSigns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return signs;
    return signs.filter(
      s =>
        s.en.toLowerCase().includes(q) ||
        s.hi.includes(q) ||
        s.hiPh.toLowerCase().includes(q) ||
        s.ta.includes(q) ||
        s.taPh.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [signs, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-surface-900 border border-surface-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-surface-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                1,080+ Trilingual Sign Dictionary
              </h2>
              <p className="text-xs text-slate-400">
                Browse or tap any sign to append to your translation sequence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-slate-400 hover:text-white border border-surface-650 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 sm:px-6 space-y-3 bg-surface-850 border-b border-surface-700">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search sign in English, Hindi, or Tamil (e.g., water, नमस्ते, உதவி)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-900 border border-surface-650 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-surface-800 text-slate-400 hover:text-white hover:bg-surface-750'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Signs Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
              Loading signs catalog...
            </div>
          ) : filteredSigns.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-slate-500 text-sm">
              No signs match your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSigns.map(sign => (
                <div
                  key={sign.id}
                  onClick={() => {
                    lockInSign(sign);
                    onClose();
                  }}
                  className="group p-3 rounded-xl bg-surface-850 hover:bg-surface-800 border border-surface-700 hover:border-indigo-500/50 cursor-pointer transition-all flex items-center justify-between gap-3 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-surface-900 border border-surface-700 flex items-center justify-center shrink-0">
                      <HandIcon sign={sign} size={36} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {sign.en}
                      </h4>
                      <p className="text-xs text-amber-300 font-hindi">
                        {sign.hi}
                      </p>
                      <p className="text-xs text-emerald-300 font-tamil">
                        {sign.ta}
                      </p>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-surface-800 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white transition-all shrink-0">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

