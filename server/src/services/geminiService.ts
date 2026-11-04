import { config } from '../config.js';
import { synthesizeSemanticGrammar } from './grammarRules.js';

export interface TrilingualResult {
  en: string;
  enPh?: string;
  hi: string;
  hiPh?: string;
  hiAcoustic?: string;
  ta: string;
  taPh?: string;
  taAcoustic?: string;
  source: 'gemini' | 'fallback';
}

const grammarCache = new Map<string, TrilingualResult>();

function fallbackTranslate(gloss: string): TrilingualResult {
  const tokens = gloss.split(/\s*\+\s*|\s+/).filter(Boolean);
  const synthesized = synthesizeSemanticGrammar(tokens);
  return {
    ...synthesized,
    source: 'fallback'
  };
}

/**
 * Refines a sequence of signed words (gloss) into natural trilingual sentences
 * in English, Hindi (Devanagari), and Tamil with phonetic pronunciation guides.
 */
export async function refineTrilingualGrammar(gloss: string): Promise<TrilingualResult> {
  const cleanGloss = gloss.trim();
  if (!cleanGloss) {
    throw new Error('Gloss sequence cannot be empty');
  }

  // Check in-memory cache
  if (grammarCache.has(cleanGloss)) {
    return grammarCache.get(cleanGloss)!;
  }

  if (!config.geminiApiKey) {
    console.warn('[Gemini] No GEMINI_API_KEY set. Returning smart dictionary composition.');
    return fallbackTranslate(cleanGloss);
  }

  const prompt = `You are an expert Indian trilingual assistive interpreter (English, Hindi, Tamil).
Convert this signed sequence into a natural, polite, first-person spoken sentence in English, Hindi (Devanagari script), and Tamil (Tamil script).
Also provide hyphenated syllable-by-syllable pronunciation guides and acoustic respellings.

Signed Sequence: "${cleanGloss}"

Respond ONLY with valid JSON in this exact structure without markdown fences:
{
  "en": "polite English sentence",
  "enPh": "Pronunciation: syllable guide",
  "hi": "प्राकृतिक और विनम्र हिंदी वाक्य",
  "hiPh": "Na-mas-te, mu-jhe...",
  "hiAcoustic": "Nuh-mus-tay, moo-jhay...",
  "ta": "இயற்கையான தமிழ் வாக்கியம்",
  "taPh": "Va-nak-kam, e-nak-ku...",
  "taAcoustic": "Vuh-nuk-kum, eh-nuk-koo..."
}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent?key=${config.geminiApiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = (await response.json()) as any;
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const parsed = JSON.parse(rawText) as TrilingualResult;
    parsed.source = 'gemini';

    // Store in cache (limit cache size to 500 entries)
    if (grammarCache.size > 500) {
      const firstKey = grammarCache.keys().next().value;
      if (firstKey) grammarCache.delete(firstKey);
    }
    grammarCache.set(cleanGloss, parsed);

    return parsed;
  } catch (err: any) {
    console.error('[Gemini Service] Grammar refinement failed, using smart dictionary:', err.message);
    return fallbackTranslate(cleanGloss);
  }
}

/**
 * Converts PCM16 raw byte buffer to a valid WAV Buffer.
 */
function pcm16ToWavBuffer(pcmBytes: Buffer, sampleRate: number = 24000, numChannels: number = 1): Buffer {
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = pcmBytes.length;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;

  const wav = Buffer.alloc(totalSize);

  // RIFF Chunk Descriptor
  wav.write('RIFF', 0);
  wav.writeUInt32LE(totalSize - 8, 4);
  wav.write('WAVE', 8);

  // "fmt " sub-chunk
  wav.write('fmt ', 12);
  wav.writeUInt32LE(16, 16);          // Subchunk1Size (16 for PCM)
  wav.writeUInt16LE(1, 20);           // AudioFormat (1 = PCM)
  wav.writeUInt16LE(numChannels, 22); // NumChannels
  wav.writeUInt32LE(sampleRate, 24);  // SampleRate
  wav.writeUInt32LE(byteRate, 28);    // ByteRate
  wav.writeUInt16LE(blockAlign, 32);  // BlockAlign
  wav.writeUInt16LE(16, 34);          // BitsPerSample

  // "data" sub-chunk
  wav.write('data', 36);
  wav.writeUInt32LE(dataSize, 40);

  // Write PCM audio data
  pcmBytes.copy(wav, 44);

  return wav;
}

/**
 * Synthesize authentic speech audio via Gemini Neural TTS API.
 */
export async function synthesizeGeminiTTS(text: string, langKey: 'en' | 'hi' | 'ta'): Promise<Buffer> {
  if (!config.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server');
  }

  const langPrompts: Record<string, string> = {
    en: `Speak naturally, warmly, and clearly in Indian English: "${text}"`,
    hi: `Speak naturally, warmly, and clearly in native Hindi (हिंदी) with authentic Indian pronunciation: "${text}"`,
    ta: `Speak naturally, warmly, and clearly in native Tamil (தமிழ்) with authentic Tamil Nadu pronunciation: "${text}"`
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiTtsModel}:generateContent?key=${config.geminiApiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: langPrompts[langKey] || text }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: langKey === 'ta' ? 'Aoede' : (langKey === 'hi' ? 'Puck' : 'Kore')
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini TTS API error (${response.status}): ${errText}`);
  }

  const data = (await response.json()) as any;
  const base64Pcm = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Pcm) {
    throw new Error('No audio data received from Gemini TTS');
  }

  const rawPcm = Buffer.from(base64Pcm, 'base64');
  return pcm16ToWavBuffer(rawPcm, 24000, 1);
}
