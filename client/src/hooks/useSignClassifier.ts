import { useRef, useCallback } from 'react';
import { HandLandmark, SignItem } from '../types/sign.js';
import { useSignStore } from '../store/useSignStore.js';
import { classifyMultiHandSign3D } from '../engine/geometry18D.js';
import {
  computeMultiHandVelocity,
  computeLandmarkVariance,
  VELOCITY_GATE_THRESHOLD,
  HOLD_DURATION_MS,
} from '../engine/velocityGate.js';

/** How many frames must agree before a sign is considered dominant. */
const VOTE_WINDOW = 10;

/** Landmark history depth for variance-based still-check. */
const VARIANCE_HISTORY = 5;

/** Landmark variance ceiling — above this we treat the hand as moving. */
const VARIANCE_THRESHOLD = 0.0005;

/** Minimum winning vote fraction needed to advance the hold ring. */
const VOTE_MAJORITY_THRESHOLD = 0.52;

/** Minimum per-frame confidence needed to advance the hold ring. */
const MIN_LOCK_CONFIDENCE = 0.80;

/** Same-sign re-lock cooldown (ms). */
const SAME_SIGN_COOLDOWN_MS = 1500;

interface UseSignClassifierProps {
  /** Ref written by classifier and read by rAF draw loop for skeleton colour. */
  isMovingRef: React.MutableRefObject<boolean>;
}

export function useSignClassifier({ isMovingRef }: UseSignClassifierProps) {
  const {
    allSigns,
    calibratedVectors,
    setCurrentDetection,
    setHoldProgress,
    lockInSign,
  } = useSignStore();

  const prevHandsRef         = useRef<HandLandmark[][] | null>(null);
  const voteBufferRef        = useRef<Array<{ id: string; conf: number }>>([]);
  const landmarkHistoryRef   = useRef<HandLandmark[][]>([]);
  const holdSignIdRef        = useRef<string | null>(null);
  const holdAccumulatedMsRef = useRef<number>(0);
  const lastLockedIdRef      = useRef<string | null>(null);
  const lastLockedTimeRef    = useRef<number>(0);
  const lastTimestampRef     = useRef<number>(performance.now());

  const handleFrame = useCallback(
    (landmarks: HandLandmark[][] | null) => {
      const now = performance.now();
      const dt  = Math.min(100, now - lastTimestampRef.current);
      lastTimestampRef.current = now;

      if (!landmarks || landmarks.length === 0) {
        prevHandsRef.current         = null;
        voteBufferRef.current        = [];
        landmarkHistoryRef.current   = [];
        holdAccumulatedMsRef.current = 0;
        holdSignIdRef.current        = null;
        isMovingRef.current          = false;
        setHoldProgress(0);
        return;
      }

      // ── 1. Multi-Hand Velocity + Variance stability check ────────────────────
      const velocity = computeMultiHandVelocity(landmarks, prevHandsRef.current);
      prevHandsRef.current = landmarks;

      const primaryHand = landmarks[0];
      landmarkHistoryRef.current.push(primaryHand);
      if (landmarkHistoryRef.current.length > VARIANCE_HISTORY) {
        landmarkHistoryRef.current.shift();
      }
      const variance = computeLandmarkVariance(landmarkHistoryRef.current);

      const isMoving = velocity > VELOCITY_GATE_THRESHOLD || variance > VARIANCE_THRESHOLD;
      isMovingRef.current = isMoving;

      // ── 2. Multi-Hand 3D Classification (Handles 1 or 2 Hands) ───────────────
      const classification = classifyMultiHandSign3D(landmarks, calibratedVectors, allSigns);

      // ── 3. Recency-weighted vote buffer ──────────────────────────────────────
      voteBufferRef.current.push({ id: classification.sign.id, conf: classification.confidence });
      if (voteBufferRef.current.length > VOTE_WINDOW) voteBufferRef.current.shift();

      const tally: Record<string, number> = {};
      let totalWeight = 0;
      voteBufferRef.current.forEach((item, idx) => {
        const w = (idx + 1) / VOTE_WINDOW;  // linear ramp, oldest = smallest weight
        tally[item.id] = (tally[item.id] || 0) + w * item.conf;
        totalWeight    += w * item.conf;
      });

      let bestId    = classification.sign.id;
      let bestScore = -1;
      for (const [id, score] of Object.entries(tally)) {
        if (score > bestScore) { bestScore = score; bestId = id; }
      }

      const isMajority = totalWeight > 0 && bestScore / totalWeight > VOTE_MAJORITY_THRESHOLD;
      const winningSign: SignItem = allSigns.find(s => s.id === bestId) || classification.sign;
      const winningConf = isMajority ? bestScore / totalWeight : classification.confidence;

      // ── 4. Store update (gated to prevent 60fps re-renders) ──────────────────
      setCurrentDetection(winningSign, winningConf, classification.zone, isMoving, classification.handsCount);

      // ── 5. Motion gate — decay hold while moving ─────────────────────────────
      if (isMoving) {
        holdAccumulatedMsRef.current = Math.max(
          0,
          holdAccumulatedMsRef.current - dt * 1.8,
        );
        setHoldProgress(holdAccumulatedMsRef.current / HOLD_DURATION_MS);
        return;
      }

      // ── 6. Require confidence + majority to fill hold ring ───────────────────
      if (!isMajority || winningConf < MIN_LOCK_CONFIDENCE) {
        holdAccumulatedMsRef.current = Math.max(
          0,
          holdAccumulatedMsRef.current - dt * 0.5,
        );
        setHoldProgress(holdAccumulatedMsRef.current / HOLD_DURATION_MS);
        return;
      }

      // ── 7. Reset hold if the dominant sign changes ───────────────────────────
      if (holdSignIdRef.current !== winningSign.id) {
        holdSignIdRef.current        = winningSign.id;
        holdAccumulatedMsRef.current = 0;
      }

      // ── 8. Same-sign cooldown ────────────────────────────────────────────────
      if (
        lastLockedIdRef.current === winningSign.id &&
        now - lastLockedTimeRef.current < SAME_SIGN_COOLDOWN_MS
      ) {
        setHoldProgress(1);
        return;
      }

      // ── 9. Accumulate hold time and lock when complete ───────────────────────
      holdAccumulatedMsRef.current += dt;
      const progress = Math.min(1, holdAccumulatedMsRef.current / HOLD_DURATION_MS);
      setHoldProgress(progress);

      if (progress >= 1) {
        lastLockedIdRef.current      = winningSign.id;
        lastLockedTimeRef.current    = now;
        holdAccumulatedMsRef.current = 0;
        holdSignIdRef.current        = null;
        setHoldProgress(0);
        lockInSign(winningSign);
      }
    },
    [allSigns, calibratedVectors, isMovingRef, lockInSign, setCurrentDetection, setHoldProgress],
  );

  return { handleFrame };
}
