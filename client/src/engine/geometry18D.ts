import { HandLandmark, SignItem, SpatialZone, ClassificationResult } from '../types/sign.js';

// ──────────────────────────────────────────────────────────────────────────────
// Low-level geometric primitives
// ──────────────────────────────────────────────────────────────────────────────

export function dist3D(a: HandLandmark, b: HandLandmark): number {
  return Math.hypot(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
}
export function dist2D(a: HandLandmark, b: HandLandmark): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
export function angle3D(a: HandLandmark, b: HandLandmark, c: HandLandmark): number {
  const v1 = { x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) };
  const v2 = { x: c.x - b.x, y: c.y - b.y, z: (c.z || 0) - (b.z || 0) };
  const m1 = Math.hypot(v1.x, v1.y, v1.z) || 1e-6;
  const m2 = Math.hypot(v2.x, v2.y, v2.z) || 1e-6;
  const dot = (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z) / (m1 * m2);
  return (Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI;
}

// ──────────────────────────────────────────────────────────────────────────────
// 18D scale-invariant feature vector
// ──────────────────────────────────────────────────────────────────────────────

export function extract18DFeatures(lm: HandLandmark[]): number[] {
  if (!lm || lm.length < 21) return new Array(18).fill(0);
  const wrist = lm[0];
  const palmCenter = {
    x: (lm[0].x + lm[5].x + lm[9].x + lm[13].x + lm[17].x) / 5,
    y: (lm[0].y + lm[5].y + lm[9].y + lm[13].y + lm[17].y) / 5,
    z: ((lm[0].z||0)+(lm[5].z||0)+(lm[9].z||0)+(lm[13].z||0)+(lm[17].z||0)) / 5
  };
  const palmScale = Math.max(dist3D(wrist, lm[9]), dist3D(lm[5], lm[17]), 0.05);
  const thumbAng  = (angle3D(lm[1],lm[2],lm[3]) + angle3D(lm[2],lm[3],lm[4])) / 360;
  const indexAng  = (angle3D(lm[5],lm[6],lm[7]) + angle3D(lm[6],lm[7],lm[8])) / 360;
  const middleAng = (angle3D(lm[9],lm[10],lm[11]) + angle3D(lm[10],lm[11],lm[12])) / 360;
  const ringAng   = (angle3D(lm[13],lm[14],lm[15]) + angle3D(lm[14],lm[15],lm[16])) / 360;
  const pinkyAng  = (angle3D(lm[17],lm[18],lm[19]) + angle3D(lm[18],lm[19],lm[20])) / 360;
  const dThumb  = dist3D(lm[4], palmCenter) / palmScale;
  const dIndex  = dist3D(lm[8], palmCenter) / palmScale;
  const dMiddle = dist3D(lm[12], palmCenter) / palmScale;
  const dRing   = dist3D(lm[16], palmCenter) / palmScale;
  const dPinky  = dist3D(lm[20], palmCenter) / palmScale;
  const pinchTI  = dist2D(lm[4],lm[8]) / palmScale;
  const spIM     = dist2D(lm[8],lm[12]) / palmScale;
  const spMR     = dist2D(lm[12],lm[16]) / palmScale;
  const spRP     = dist2D(lm[16],lm[20]) / palmScale;
  const pinchTM  = dist2D(lm[4],lm[12]) / palmScale;
  const spanTP   = dist2D(lm[4],lm[17]) / palmScale;
  const tDirY    = (lm[4].y - wrist.y) / palmScale;
  const tDirX    = (lm[4].x - lm[5].x) / palmScale;
  return [thumbAng,indexAng,middleAng,ringAng,pinkyAng, dThumb,dIndex,dMiddle,dRing,dPinky, pinchTI,spIM,spMR,spRP, pinchTM,spanTP,tDirY,tDirX];
}

export function vectorDistance18D(vA: number[], vB: number[]): number {
  if (!vA || !vB || vA.length !== vB.length) return Infinity;
  let s = 0; for (let i=0;i<vA.length;i++) s+=(vA[i]-vB[i])**2;
  return Math.sqrt(s / vA.length);
}

export function getSpatialZone(lm: HandLandmark[]): SpatialZone {
  const palmY = (lm[0].y + lm[9].y) / 2;
  if (palmY < 0.36) return 'UPPER';
  if (palmY > 0.68) return 'LOWER';
  return 'MID';
}

// ──────────────────────────────────────────────────────────────────────────────
// Per-finger state helpers
// ──────────────────────────────────────────────────────────────────────────────

function fingerOpen(lm: HandLandmark[], wrist: HandLandmark, mcp:number, pip:number, dip:number, tip:number): boolean {
  const a1 = angle3D(lm[mcp],lm[pip],lm[dip]);
  const a2 = angle3D(lm[pip],lm[dip],lm[tip]);
  return a1 > 140 && a2 > 130 && dist2D(lm[tip],wrist) > dist2D(lm[mcp],wrist)*1.05;
}

function fingerPartiallyBent(lm: HandLandmark[], mcp:number, pip:number, dip:number): boolean {
  const a1 = angle3D(lm[mcp],lm[pip],lm[dip]);
  return a1 > 90 && a1 < 148; // between clearly curled and clearly open
}

function thumbExtended(lm: HandLandmark[], ps: number): boolean {
  return dist2D(lm[4],lm[17])/ps > 0.90 && dist2D(lm[4],lm[5])/ps > 0.48 && angle3D(lm[1],lm[2],lm[4]) > 130;
}
function thumbCurled(lm: HandLandmark[], ps: number): boolean {
  return dist2D(lm[4],lm[17])/ps < 0.70;
}
function thumbUp(lm: HandLandmark[]): boolean {
  return lm[4].y < lm[3].y && lm[3].y < lm[2].y && lm[2].y < lm[1].y;
}
function thumbDown(lm: HandLandmark[]): boolean {
  return lm[4].y > lm[3].y && lm[3].y > lm[2].y;
}
function indexPointingUp(lm: HandLandmark[]): boolean {
  return lm[8].y < lm[6].y && lm[6].y < lm[5].y;
}

/** All fingertips close to each other — flat-O / MORE shape */
function allTipsBunched(lm: HandLandmark[], ps: number): boolean {
  const tips = [lm[4],lm[8],lm[12],lm[16],lm[20]];
  for (let i=0;i<tips.length-1;i++) {
    if (dist2D(tips[i],tips[i+1])/ps > 0.55) return false;
  }
  return true;
}

/** OK: thumb-index pinch circle + other 3 up */
function isOKCircle(lm: HandLandmark[], wrist: HandLandmark, ps: number): boolean {
  return dist2D(lm[4],lm[8])/ps < 0.38 &&
    fingerOpen(lm,wrist,9,10,11,12) && fingerOpen(lm,wrist,13,14,15,16) && fingerOpen(lm,wrist,17,18,19,20);
}

/** Food pinch: thumb+index+middle pinched, ring+pinky curled */
function isFoodPinch(lm: HandLandmark[], wrist: HandLandmark, ps: number): boolean {
  return dist2D(lm[4],lm[8])/ps < 0.44 && dist2D(lm[4],lm[12])/ps < 0.52 &&
    !fingerOpen(lm,wrist,13,14,15,16) && !fingerOpen(lm,wrist,17,18,19,20);
}

/** W-sign: index+middle+ring up, thumb+pinky curled */
function isWSign(lm: HandLandmark[], wrist: HandLandmark, ps: number): boolean {
  return !thumbExtended(lm,ps) &&
    fingerOpen(lm,wrist,5,6,7,8) && fingerOpen(lm,wrist,9,10,11,12) && fingerOpen(lm,wrist,13,14,15,16) &&
    !fingerOpen(lm,wrist,17,18,19,20);
}

/** Three-finger NEED: thumb+index+middle up, ring+pinky curled */
function isThreeFingers(lm: HandLandmark[], wrist: HandLandmark, ps: number): boolean {
  return thumbExtended(lm,ps) &&
    fingerOpen(lm,wrist,5,6,7,8) && fingerOpen(lm,wrist,9,10,11,12) &&
    !fingerOpen(lm,wrist,13,14,15,16) && !fingerOpen(lm,wrist,17,18,19,20);
}

/**
 * Hook index — index bent at PIP (not open by standard test), all others curled.
 * This is the PAIN/HURT sign.
 */
function isHookIndex(lm: HandLandmark[], wrist: HandLandmark): boolean {
  const indexPIPang = angle3D(lm[5],lm[6],lm[7]);
  const indexDIPang = angle3D(lm[6],lm[7],lm[8]);
  // PIP bent (90-130°), DIP fairly straight, others definitely curled
  const indexHooked = indexPIPang > 85 && indexPIPang < 135 && indexDIPang > 120;
  const othersOff = !fingerOpen(lm,wrist,9,10,11,12) && !fingerOpen(lm,wrist,13,14,15,16) && !fingerOpen(lm,wrist,17,18,19,20);
  return indexHooked && othersOff;
}

/**
 * Middle-only extended (all others curled) — MEDICINE sign.
 */
function isMiddleOnly(lm: HandLandmark[], wrist: HandLandmark): boolean {
  return !fingerOpen(lm,wrist,5,6,7,8) &&
    fingerOpen(lm,wrist,9,10,11,12) &&
    !fingerOpen(lm,wrist,13,14,15,16) && !fingerOpen(lm,wrist,17,18,19,20);
}

/**
 * C-curve: all four fingers partially bent, spread. Used for DRINK/HUNGRY.
 * Note: distinguished from open palm (all straight) and closed fist (all tightly curled).
 */
function isCCurve(lm: HandLandmark[], wrist: HandLandmark): boolean {
  const iPartial = fingerPartiallyBent(lm,5,6,7) && !fingerOpen(lm,wrist,5,6,7,8);
  const mPartial = fingerPartiallyBent(lm,9,10,11) && !fingerOpen(lm,wrist,9,10,11,12);
  const rPartial = fingerPartiallyBent(lm,13,14,15) && !fingerOpen(lm,wrist,13,14,15,16);
  return iPartial && mPartial && rPartial;
}

// ──────────────────────────────────────────────────────────────────────────────
// Main classifier — ordered from most-specific to most-general
// ──────────────────────────────────────────────────────────────────────────────

function mk(
  id: string,
  conf: number,
  fs: [number, number, number, number, number],
  zone: SpatialZone,
  all: SignItem[],
  handsCount: number = 1
): ClassificationResult {
  return { sign: all.find(s => s.id === id) || all[0], confidence: conf, fingerStates: fs, zone, handsCount };
}

export function classifyHandSign3D(
  lm: HandLandmark[],
  calibratedVectors: Record<string, number[]>,
  allSigns: SignItem[]
): ClassificationResult {
  const zone = getSpatialZone(lm);
  const wrist = lm[0];
  const ps = Math.max(dist2D(wrist,lm[9]), dist2D(lm[5],lm[17]), 0.05);
  const feat = extract18DFeatures(lm);

  // ── 1. User calibrated vectors (highest priority) ────────────────────────────
  let bestCalibId: string|null = null, bestCalibDist = Infinity;
  for (const [id,vec] of Object.entries(calibratedVectors)) {
    const d = vectorDistance18D(feat,vec);
    if (d < bestCalibDist) { bestCalibDist=d; bestCalibId=id; }
  }
  if (bestCalibId && bestCalibDist < 0.30) {
    return mk(bestCalibId, Math.max(0.72,Math.min(0.99,1-bestCalibDist)), [0,0,0,0,0], zone, allSigns);
  }

  // ── 2. Derive per-finger booleans ────────────────────────────────────────────
  const tOn = thumbExtended(lm,ps);
  const tOff = thumbCurled(lm,ps);
  const iOn = fingerOpen(lm,wrist,5,6,7,8);
  const mOn = fingerOpen(lm,wrist,9,10,11,12);
  const rOn = fingerOpen(lm,wrist,13,14,15,16);
  const pOn = fingerOpen(lm,wrist,17,18,19,20);
  const fs: [number,number,number,number,number] = [tOn?1:0,iOn?1:0,mOn?1:0,rOn?1:0,pOn?1:0];

  // ── 3. Prioritised pose checks ───────────────────────────────────────────────

  // OPEN PALM — all 5 fully extended
  if (tOn && iOn && mOn && rOn && pOn) {
    // Sub-classify by zone: UPPER→HELLO / MID→HAPPY / LOWER→SAD
    if (zone === 'LOWER') return mk('SAD',   0.88, fs, zone, allSigns);
    if (zone === 'UPPER') return mk('HELLO', 0.96, fs, zone, allSigns);
    return mk('HAPPY', 0.90, fs, zone, allSigns);
  }

  // CLOSED FIST — all 5 curled
  if (tOff && !iOn && !mOn && !rOn && !pOn) return mk('PLEASE', 0.94, fs, zone, allSigns);

  // THUMB UP — only thumb pointing upward
  if (tOn && !iOn && !mOn && !rOn && !pOn && thumbUp(lm)) return mk('YES', 0.95, fs, zone, allSigns);

  // THUMB DOWN — only thumb pointing downward
  if (tOn && !iOn && !mOn && !rOn && !pOn && thumbDown(lm)) return mk('NO', 0.94, fs, zone, allSigns);

  // SORRY / A-FIST — thumb on side of fist (not extended as L, not curl fully)
  // thumb alongside but not spread out wide
  if (!tOn && !tOff && !iOn && !mOn && !rOn && !pOn) return mk('SORRY', 0.90, fs, zone, allSigns);

  // OK CIRCLE — thumb+index circle, 3 up
  if (isOKCircle(lm,wrist,ps)) return mk('OK', 0.94, fs, zone, allSigns);

  // FOOD PINCH — 3-finger pinch, ring+pinky off
  if (isFoodPinch(lm,wrist,ps)) return mk('FOOD', 0.92, fs, zone, allSigns);

  // FLAT-O / MORE — all tips bunched together
  if (allTipsBunched(lm,ps) && !isOKCircle(lm,wrist,ps)) return mk('MORE', 0.91, fs, zone, allSigns);

  // ILY — thumb+index+pinky, middle+ring curled
  if (tOn && iOn && !mOn && !rOn && pOn) return mk('HELP', 0.95, fs, zone, allSigns);

  // SHAKA — thumb+pinky (distinguish DOCTOR vs CALL by zone)
  if (tOn && !iOn && !mOn && !rOn && pOn) {
    return zone === 'UPPER' ? mk('CALL',   0.92, fs, zone, allSigns)
                            : mk('DOCTOR', 0.93, fs, zone, allSigns);
  }

  // HORNS/WHERE — index+pinky, thumb curled
  if (!tOn && iOn && !mOn && !rOn && pOn) return mk('WHERE', 0.92, fs, zone, allSigns);

  // HOOK INDEX — PAIN/HURT (index bent at pip, others curled)
  if (isHookIndex(lm,wrist)) return mk('PAIN', 0.91, fs, zone, allSigns);

  // MIDDLE ONLY — MEDICINE
  if (isMiddleOnly(lm,wrist)) return mk('MEDICINE', 0.90, fs, zone, allSigns);

  // W-SIGN — index+middle+ring up, thumb+pinky off → WATER
  if (isWSign(lm,wrist,ps)) return mk('WATER', 0.96, fs, zone, allSigns);

  // PEACE / V-SIGN — index+middle only
  if (!tOn && iOn && mOn && !rOn && !pOn) {
    // Sub-classify: UPPER zone→HOSPITAL (H-sign looks similar), MID→BATHROOM
    return zone === 'UPPER' ? mk('HOSPITAL', 0.88, fs, zone, allSigns)
                            : mk('BATHROOM', 0.95, fs, zone, allSigns);
  }

  // FOUR FINGERS UP — 4 fingers up, thumb tucked
  if (!tOn && iOn && mOn && rOn && pOn) {
    // UPPER zone → WAIT, LOWER zone → TIRED/BAD
    if (zone === 'LOWER') return mk('TIRED', 0.88, fs, zone, allSigns);
    return mk('WAIT', 0.94, fs, zone, allSigns);
  }

  // THREE FINGERS NEED — thumb+index+middle up, ring+pinky off
  // Check after W-sign to avoid collision
  if (isThreeFingers(lm,wrist,ps)) return mk('NEED', 0.92, fs, zone, allSigns);

  // C-CURVE — partial bend all fingers → DRINK or HUNGRY by zone
  if (isCCurve(lm,wrist)) {
    return zone === 'UPPER' ? mk('DRINK',  0.88, fs, zone, allSigns)
                            : mk('HUNGRY', 0.87, fs, zone, allSigns);
  }

  // INDEX ONLY pointing up → I / Me
  if (!tOn && iOn && !mOn && !rOn && !pOn && indexPointingUp(lm)) return mk('I', 0.95, fs, zone, allSigns);

  // L-SHAPE — thumb+index → YOU
  if (tOn && iOn && !mOn && !rOn && !pOn) return mk('YOU', 0.91, fs, zone, allSigns);

  // PINKY ONLY → THANK_YOU
  if (!tOn && !iOn && !mOn && !rOn && pOn) return mk('THANK_YOU', 0.93, fs, zone, allSigns);

  // RING+PINKY — SLEEP sign area
  if (!tOn && !iOn && !mOn && rOn && pOn) return mk('SLEEP', 0.85, fs, zone, allSigns);

  // ── 4. 18D prototype-distance fallback ─────────────────────────────────────
  const fallback = classify18DFallback(feat, allSigns, zone);
  if (fallback) return fallback;

  // ── 5. Last-resort zone heuristic ───────────────────────────────────────────
  return mk(zone==='UPPER'?'HELLO':zone==='LOWER'?'NO':'OK', 0.52, fs, zone, allSigns);
}

function classify18DFallback(features: number[], allSigns: SignItem[], zone: SpatialZone): ClassificationResult | null {
  const CANDIDATES = ['HELLO','PLEASE','YES','NO','OK','FOOD','HELP','DOCTOR','WHERE','WATER',
    'BATHROOM','WAIT','NEED','I','YOU','THANK_YOU','PAIN','MORE','DRINK','MEDICINE','SORRY'];
  const pool = allSigns.filter(s => CANDIDATES.includes(s.id));
  let bestId='', bestScore=-1;
  for (const sign of pool) {
    const [t,i,m,r,p] = sign.fingers;
    const exp = [t?1.4:0.45, i?1.5:0.45, m?1.5:0.45, r?1.5:0.45, p?1.4:0.45];
    const act = features.slice(5,10);
    let score=0;
    for (let k=0;k<5;k++) score += Math.max(0, 1 - Math.abs(act[k]-exp[k])*1.8);
    score /= 5;
    if (score > bestScore) { bestScore=score; bestId=sign.id; }
  }
  if (bestScore > 0.65 && bestId) {
    const sign = allSigns.find(s=>s.id===bestId)||allSigns[0];
    return { sign, confidence: 0.60+bestScore*0.22, fingerStates:[0,0,0,0,0], zone, handsCount: 1 };
  }
  return null;
}

/**
 * Classify Multi-Hand (Two-Handed) Gestures
 * Evaluates dual hand interaction, relative palm & wrist distances, and contact postures.
 * Gracefully falls back to single-hand recognition when only one hand is active.
 */
export function classifyMultiHandSign3D(
  handsList: HandLandmark[][],
  calibratedVectors: Record<string, number[]>,
  allSigns: SignItem[]
): ClassificationResult {
  if (!handsList || handsList.length === 0) {
    const defaultSign = allSigns.find(s => s.id === 'HELLO') || allSigns[0];
    return { sign: defaultSign, confidence: 0, fingerStates: [0,0,0,0,0], zone: 'MID', handsCount: 0 };
  }

  // If only 1 hand is present, evaluate single-hand pipeline directly
  if (handsList.length === 1) {
    return classifyHandSign3D(handsList[0], calibratedVectors, allSigns);
  }

  // ── Two Hands Detected! ──────────────────────────────────────────────────────
  const hA = handsList[0];
  const hB = handsList[1];
  const wristA = hA[0];
  const wristB = hB[0];
  const scaleA = Math.max(dist2D(wristA, hA[9]), dist2D(hA[5], hA[17]), 0.05);
  const scaleB = Math.max(dist2D(wristB, hB[9]), dist2D(hB[5], hB[17]), 0.05);
  const avgScale = (scaleA + scaleB) / 2;

  const palmA = {
    x: (hA[0].x + hA[5].x + hA[9].x + hA[13].x + hA[17].x) / 5,
    y: (hA[0].y + hA[5].y + hA[9].y + hA[13].y + hA[17].y) / 5
  };
  const palmB = {
    x: (hB[0].x + hB[5].x + hB[9].x + hB[13].x + hB[17].x) / 5,
    y: (hB[0].y + hB[5].y + hB[9].y + hB[13].y + hB[17].y) / 5
  };

  const normPalmDist = dist2D(palmA, palmB) / avgScale;
  const normWristDist = dist2D(wristA, wristB) / avgScale;
  const zoneA = getSpatialZone(hA);
  const zoneB = getSpatialZone(hB);
  const overallZone: SpatialZone = (zoneA === 'UPPER' || zoneB === 'UPPER') ? 'UPPER' : (zoneA === 'LOWER' && zoneB === 'LOWER') ? 'LOWER' : 'MID';

  // Finger states for Hand A and Hand B
  const tA_curl = thumbCurled(hA, scaleA);
  const iA = fingerOpen(hA, wristA, 5,6,7,8);
  const mA = fingerOpen(hA, wristA, 9,10,11,12);
  const rA = fingerOpen(hA, wristA, 13,14,15,16);
  const pA = fingerOpen(hA, wristA, 17,18,19,20);

  const tB_curl = thumbCurled(hB, scaleB);
  const iB = fingerOpen(hB, wristB, 5,6,7,8);
  const mB = fingerOpen(hB, wristB, 9,10,11,12);
  const rB = fingerOpen(hB, wristB, 13,14,15,16);
  const pB = fingerOpen(hB, wristB, 17,18,19,20);

  const isFistA = tA_curl && !iA && !mA && !rA && !pA;
  const isFistB = tB_curl && !iB && !mB && !rB && !pB;
  const isOpenA = iA && mA && rA && pA;
  const isOpenB = iB && mB && rB && pB;

  // 1. Two-Handed Authentic HELP:
  // Dominant hand closed fist resting directly on flat open palm of other hand
  if (normPalmDist < 1.25 && ((isFistA && isOpenB) || (isFistB && isOpenA))) {
    const fs: [number,number,number,number,number] = [1,1,0,0,1];
    return mk('HELP', 0.98, fs, overallZone, allSigns, 2);
  }

  // 2. Two-Handed NAMASTE / RESPECT / GREETING:
  // Both palms flat open and pressed together in front of chest/chin (pointing upward)
  if (normPalmDist < 0.85 && isOpenA && isOpenB && (hA[8].y < wristA.y) && (hB[8].y < wristB.y)) {
    const fs: [number,number,number,number,number] = [1,1,1,1,1];
    return mk('NAMASTE', 0.98, fs, overallZone, allSigns, 2);
  }

  // 3. Two-Handed MORE:
  // Both hands have all fingertips bunched together (flat-O) and touching
  if (normPalmDist < 1.05 && allTipsBunched(hA, scaleA) && allTipsBunched(hB, scaleB)) {
    const fs: [number,number,number,number,number] = [1,1,1,1,1];
    return mk('MORE', 0.97, fs, overallZone, allSigns, 2);
  }

  // 4. Two-Handed WORK:
  // Both hands in fists, one fist on top of the other fist wrist
  if (normPalmDist < 1.15 && isFistA && isFistB) {
    const fs: [number,number,number,number,number] = [0,0,0,0,0];
    return mk('WORK', 0.96, fs, overallZone, allSigns, 2);
  }

  // 5. Two-Handed BOOK / STUDY:
  // Both hands flat open, wrists close, palms facing up/toward user like an open book
  if (normWristDist < 1.1 && isOpenA && isOpenB && normPalmDist < 1.45) {
    const fs: [number,number,number,number,number] = [1,1,1,1,1];
    return mk('BOOK', 0.95, fs, overallZone, allSigns, 2);
  }

  // 6. Two-Handed FAMILY:
  // Both hands in OK / F circle touching
  if (normPalmDist < 1.2 && isOKCircle(hA, wristA, scaleA) && isOKCircle(hB, wristB, scaleB)) {
    const fs: [number,number,number,number,number] = [1,0,1,1,1];
    return mk('FAMILY', 0.96, fs, overallZone, allSigns, 2);
  }

  // 7. Two-Handed STOP / WAIT:
  // One open hand chopping or meeting the other open hand perpendicularly
  if (normPalmDist < 1.0 && isOpenA && isOpenB) {
    const fs: [number,number,number,number,number] = [0,1,1,1,1];
    return mk('WAIT', 0.94, fs, overallZone, allSigns, 2);
  }

  // If no 2-handed macro gesture is detected, evaluate each hand individually
  // and choose the dominant hand with higher classification confidence
  const resA = classifyHandSign3D(hA, calibratedVectors, allSigns);
  const resB = classifyHandSign3D(hB, calibratedVectors, allSigns);

  const best = (resA.confidence >= resB.confidence) ? resA : resB;
  return { ...best, handsCount: 2 };
}
