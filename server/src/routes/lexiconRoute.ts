import { Router, Request, Response } from 'express';
import { getFullLexicon, BASE_SIGNS, QUICK_STARTERS } from '../data/lexiconData.js';

export const lexiconRouter = Router();

// GET all signs (with optional category and pagination)
lexiconRouter.get('/', (req: Request, res: Response) => {
  const full = getFullLexicon();
  const category = req.query.category as string | undefined;
  const page = parseInt(req.query.page as string || '1', 10);
  const limit = parseInt(req.query.limit as string || '100', 10);

  let filtered = full;
  if (category && category !== 'All' && category !== 'All Signs') {
    filtered = full.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const items = filtered.slice(startIndex, startIndex + limit);

  res.json({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    items
  });
});

// GET unique categories
lexiconRouter.get('/categories', (_req: Request, res: Response) => {
  const full = getFullLexicon();
  const categories = Array.from(new Set(full.map(s => s.category)));
  res.json({ categories: ['All Signs', 'Core 16', ...categories.filter(c => c !== 'Core 16')] });
});

// GET search signs
lexiconRouter.get('/search', (req: Request, res: Response) => {
  const q = ((req.query.q as string) || '').trim().toLowerCase();
  if (!q) {
    res.json({ items: BASE_SIGNS });
    return;
  }

  const full = getFullLexicon();
  const matches = full.filter(s =>
    s.en.toLowerCase().includes(q) ||
    s.hi.includes(q) ||
    s.hiPh.toLowerCase().includes(q) ||
    s.ta.includes(q) ||
    s.taPh.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q)
  ).slice(0, 50);

  res.json({ count: matches.length, items: matches });
});

// GET quick starter phrases
lexiconRouter.get('/starters', (_req: Request, res: Response) => {
  res.json({ starters: QUICK_STARTERS });
});

