export type SpatialZone = 'UPPER' | 'MID' | 'LOWER';
export type RecognitionMode = 'SENTENCE' | 'SPELL';

export interface HandLandmark {
  x: number;
  y: number;
  z?: number;
}

export interface HandData {
  landmarks: HandLandmark[];
  handedness?: 'Left' | 'Right';
}

export interface SignItem {
  id: string;
  en: string;
  letter?: string;
  hi: string;
  hiPh: string;
  hiAcoustic: string;
  ta: string;
  taPh: string;
  taAcoustic: string;
  category: string;
  zone: SpatialZone;
  hint: string;
  fingers: [number, number, number, number, number];
  poseType: string;
  isTwoHanded?: boolean;
}

export interface TrilingualOutput {
  en: string;
  enPh?: string;
  hi: string;
  hiPh?: string;
  hiAcoustic?: string;
  ta: string;
  taPh?: string;
  taAcoustic?: string;
}

export interface ClassificationResult {
  sign: SignItem;
  confidence: number;
  fingerStates: [number, number, number, number, number];
  zone: SpatialZone;
  handsCount: number;
}
