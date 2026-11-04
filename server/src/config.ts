import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: 'gemini-2.5-flash',
  geminiTtsModel: 'gemini-2.5-flash-preview-tts',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};

