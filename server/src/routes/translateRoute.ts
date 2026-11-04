import { Router, Request, Response } from 'express';
import { refineTrilingualGrammar } from '../services/geminiService.js';
import { applyGrammarRules } from '../services/grammarRules.js';
import { getFullLexicon, SignItem } from '../data/lexiconData.js';

export const translateRouter = Router();

translateRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { gloss, sequence } = req.body;

    // ── 1. Extract token list ───────────────────────────────────────────────
    let tokens: string[] = [];
    if (typeof gloss === 'string' && gloss.trim()) {
      // "Hello + I + Need + Water + Please"  or  "HELLO I NEED WATER"
      tokens = gloss.trim().split(/\s*\+\s*|\s+/).filter(Boolean);
    } else if (Array.isArray(sequence) && sequence.length > 0) {
      tokens = sequence.map((s: any) => {
        if (typeof s === 'string') return s;
        return s.id || s.en?.split('/')[0]?.trim() || '';
      }).filter(Boolean);
    } else {
      res.status(400).json({ error: 'Please provide either a "gloss" string or a "sequence" array.' });
      return;
    }

    // ── 2. Normalise tokens to sign IDs (upper-snake-case) ──────────────────
    //    Map plain English words to IDs via lexicon if possible
    const lexicon = getFullLexicon();
    const byId  = new Map<string, SignItem>(lexicon.map(s => [s.id.toUpperCase(), s]));
    const byEn  = new Map<string, SignItem>();
    for (const s of lexicon) {
      const key = s.en.split('/')[0].trim().toUpperCase();
      if (!byEn.has(key)) byEn.set(key, s);
    }

    const normTokens = tokens.map(t => {
      const up = t.trim().toUpperCase().replace(/\s+/g, '_');
      if (byId.has(up)) return up;
      const enKey = t.trim().toUpperCase();
      if (byEn.has(enKey)) return byEn.get(enKey)!.id.toUpperCase();
      return up;
    });

    // ── 3. Apply fast local grammar rules (0ms, no network) ─────────────────
    const grammarResult = applyGrammarRules(normTokens);
    if (grammarResult) {
      res.json({ success: true, ...grammarResult });
      return;
    }

    // ── 4. Try Gemini AI for novel combinations ──────────────────────────────
    const glossForGemini = normTokens.join(' + ');
    const result = await refineTrilingualGrammar(glossForGemini);
    res.json({ success: true, ...result });

  } catch (err: any) {
    console.error('Translation route error:', err);
    res.status(500).json({ error: err.message || 'Internal translation error' });
  }
});
