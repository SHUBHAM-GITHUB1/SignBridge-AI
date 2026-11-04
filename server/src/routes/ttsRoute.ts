import { Router, Request, Response } from 'express';
import { synthesizeGeminiTTS } from '../services/geminiService.js';

export const ttsRouter = Router();

ttsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { text, lang } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text field is required for TTS synthesis.' });
      return;
    }

    const targetLang = (lang === 'hi' || lang === 'ta' || lang === 'en') ? lang : 'en';

    const wavBuffer = await synthesizeGeminiTTS(text, targetLang);

    res.set({
      'Content-Type': 'audio/wav',
      'Content-Length': wavBuffer.length.toString(),
      'Cache-Control': 'public, max-age=86400'
    });

    res.send(wavBuffer);
  } catch (err: any) {
    console.error('TTS route error:', err.message);
    res.status(500).json({
      error: err.message || 'Failed to synthesize neural audio',
      fallbackToNative: true
    });
  }
});

