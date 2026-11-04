import { HandLandmark } from '../types/sign.js';
import { dist2D } from './geometry18D.js';

export const VELOCITY_GATE_THRESHOLD = 0.055;
export const EMA_ALPHA = 0.52;   // Higher = snappier skeleton tracking, less lag
export const HOLD_DURATION_MS = 700;  // Slightly quicker lock-in feel

export function smoothLandmarksEMA(
  current: HandLandmark[],
  previous: HandLandmark[] | null
): HandLandmark[] {
  if (!previous || previous.length !== current.length) {
    return current.map(p => ({ ...p }));
  }

  return current.map((curr, i) => ({
    x: EMA_ALPHA * curr.x + (1 - EMA_ALPHA) * previous[i].x,
    y: EMA_ALPHA * curr.y + (1 - EMA_ALPHA) * previous[i].y,
    z: EMA_ALPHA * (curr.z || 0) + (1 - EMA_ALPHA) * (previous[i].z || 0)
  }));
}

/**
 * Computes hand velocity across successive frames normalized by palm size.
 * Uses 6 key landmark indices for efficiency and robustness.
 */
export function computeHandVelocity(
  currLm: HandLandmark[] | null,
  prevLm: HandLandmark[] | null
): number {
  if (!currLm || !prevLm) return 0;
  const scale = Math.max(dist2D(currLm[0], currLm[9]), 0.05);
  // Wrist + all 5 fingertips
  const keyIndices = [0, 4, 8, 12, 16, 20];
  let total = 0;
  for (const idx of keyIndices) {
    total += dist2D(currLm[idx], prevLm[idx]) / scale;
  }
  return total / keyIndices.length;
}

/**
 * Computes aggregate velocity across all tracked hands (supports 1 or 2 hands).
 */
export function computeMultiHandVelocity(
  currHands: HandLandmark[][] | null,
  prevHands: HandLandmark[][] | null
): number {
  if (!currHands || !prevHands || currHands.length === 0 || prevHands.length === 0) return 0;
  let totalVel = 0;
  const count = Math.min(currHands.length, prevHands.length);
  for (let i = 0; i < count; i++) {
    totalVel += computeHandVelocity(currHands[i], prevHands[i]);
  }
  return totalVel / count;
}

/**
 * Variance-based stability checker — ensures that the last N landmarks
 * have low variance (hand is genuinely still, not just slow).
 */
export function computeLandmarkVariance(history: HandLandmark[][]): number {
  if (history.length < 3) return Infinity;
  const keyIndices = [0, 4, 8, 12, 16, 20];
  let totalVar = 0;
  for (const idx of keyIndices) {
    const xs = history.map(f => f[idx].x);
    const ys = history.map(f => f[idx].y);
    const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const my = ys.reduce((a, b) => a + b, 0) / ys.length;
    const vx = xs.reduce((a, b) => a + (b - mx) ** 2, 0) / xs.length;
    const vy = ys.reduce((a, b) => a + (b - my) ** 2, 0) / ys.length;
    totalVar += vx + vy;
  }
  return totalVar / keyIndices.length;
}
