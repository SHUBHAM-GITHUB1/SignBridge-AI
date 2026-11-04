import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config.js';
import { translateRouter } from './routes/translateRoute.js';
import { ttsRouter } from './routes/ttsRoute.js';
import { lexiconRouter } from './routes/lexiconRoute.js';

const app = express();

// Middlewares
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SignBridge AI API',
    version: '1.0.0',
    geminiConfigured: Boolean(config.geminiApiKey)
  });
});

// API Routes
app.use('/api/translate', translateRouter);
app.use('/api/tts', ttsRouter);
app.use('/api/lexicon', lexiconRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(config.port, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SignBridge Node Server running on http://localhost:${config.port}`);
  console.log(`🌐 Health check: http://localhost:${config.port}/api/health`);
  console.log(`🔑 Gemini API Key: ${config.geminiApiKey ? 'Configured ✅' : 'Missing (Set in .env) ⚠️'}`);
  console.log(`=======================================================`);
});

