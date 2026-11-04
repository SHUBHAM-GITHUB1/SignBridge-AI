import { useEffect, useRef, useCallback } from 'react';
import { HandLandmark } from '../types/sign.js';
import { smoothLandmarksEMA } from '../engine/velocityGate.js';

interface UseHandTrackerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  active: boolean;
  onFrame: (landmarks: HandLandmark[][] | null) => void;
  isMovingRef: React.MutableRefObject<boolean>;
}

// MediaPipe target: 20fps inference (50ms between sends).
// The rAF loop still runs at 60fps so the skeleton draw stays silky-smooth;
// only the expensive WASM send is throttled.
const MP_INTERVAL_MS = 50;

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],       // Index
  [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
  [0, 13], [13, 14], [14, 15], [15, 16],// Ring
  [0, 17], [17, 18], [18, 19], [19, 20],// Pinky
  [5, 9], [9, 13], [13, 17],            // Palm base
];

export function useHandTracker({
  videoRef,
  canvasRef,
  active,
  onFrame,
  isMovingRef,
}: UseHandTrackerProps) {
  const mpHandsRef           = useRef<any>(null);
  const animFrameIdRef       = useRef<number | null>(null);
  const prevSmoothedHandsRef = useRef<HandLandmark[][]>([]);
  // Last detected multi-hand landmarks (consumed by rAF draw loop at 60fps)
  const latestLandmarksRef   = useRef<HandLandmark[][] | null>(null);
  const mpBusyRef            = useRef(false);
  const lastMpSendRef        = useRef(0);

  // ── MediaPipe Dual Hand Tracking init ──────────────────────────────────────
  useEffect(() => {
    const Win: any = window;
    if (typeof Win.Hands === 'undefined') return;

    try {
      const hands = new Win.Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      // Enable simultaneous 2-Hand Tracking
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.65,
        minTrackingConfidence: 0.60,
      });

      hands.onResults((results: any) => {
        mpBusyRef.current = false; // MP finished — allow next send

        const rawHandsList: any[] = results.multiHandLandmarks || [];
        if (rawHandsList.length === 0) {
          prevSmoothedHandsRef.current = [];
          latestLandmarksRef.current   = null;
          onFrame(null);
          return;
        }

        // Process all detected hands (up to 2) with X coordinate mirroring
        const processedHands: HandLandmark[][] = [];

        rawHandsList.forEach((rawHand: any[], hIdx: number) => {
          const mirrored: HandLandmark[] = rawHand.map((p: any) => ({
            x: 1 - p.x,  // mirror for front webcam view
            y: p.y,
            z: p.z || 0,
          }));

          const prevHand = prevSmoothedHandsRef.current[hIdx] || null;
          const smoothed = smoothLandmarksEMA(mirrored, prevHand);
          processedHands.push(smoothed);
        });

        prevSmoothedHandsRef.current = processedHands;
        latestLandmarksRef.current   = processedHands;
        onFrame(processedHands);     // Pass all detected hands to classifier
      });

      mpHandsRef.current = hands;
    } catch (err) {
      console.warn('[HandTracker] MediaPipe init error:', err);
    }

    return () => {
      try { mpHandsRef.current?.close(); } catch (_) {}
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Unified 60fps rAF loop — renders both hand skeletons ──────────────────
  const rafLoop = useCallback(() => {
    if (!active) return;

    const now   = performance.now();
    const video = videoRef.current;
    const mp    = mpHandsRef.current;

    // ── Send to MediaPipe at ~20fps ───────────────────────────────────────────
    if (
      mp &&
      video &&
      video.readyState >= 2 &&
      !mpBusyRef.current &&
      now - lastMpSendRef.current >= MP_INTERVAL_MS
    ) {
      mpBusyRef.current = true;
      lastMpSendRef.current = now;
      mp.send({ image: video }).catch(() => { mpBusyRef.current = false; });
    }

    // ── Draw dual hand skeletons directly from ref ───────────────────────────
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const cw = canvas.clientWidth  || 640;
        const ch = canvas.clientHeight || 480;
        if (canvas.width !== cw || canvas.height !== ch) {
          canvas.width  = cw;
          canvas.height = ch;
        }

        const handsList = latestLandmarksRef.current;
        if (handsList && handsList.length > 0) {
          drawMultiHandSkeletonDirect(ctx, handsList, cw, ch, isMovingRef.current);
        } else {
          ctx.clearRect(0, 0, cw, ch);
        }
      }
    }

    animFrameIdRef.current = requestAnimationFrame(rafLoop);
  }, [active, videoRef, canvasRef, isMovingRef]);

  useEffect(() => {
    if (active) {
      animFrameIdRef.current = requestAnimationFrame(rafLoop);
    } else {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      prevSmoothedHandsRef.current = [];
      latestLandmarksRef.current   = null;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [active, rafLoop, canvasRef]);

  return { isReady: Boolean(mpHandsRef.current) };
}

// ── Multi-Hand 3D Skeleton Renderer ───────────────────────────────────────────
function drawMultiHandSkeletonDirect(
  ctx: CanvasRenderingContext2D,
  handsList: HandLandmark[][],
  width: number,
  height: number,
  isMoving: boolean
) {
  ctx.clearRect(0, 0, width, height);

  // Hand 1 (Primary / Dominant): Indigo / Emerald theme
  // Hand 2 (Secondary): Cyan / Sky theme
  const HAND_THEMES = [
    {
      boneStroke: isMoving ? 'rgba(251, 191, 36, 0.85)' : 'rgba(99, 102, 241, 0.90)',
      tipFill: '#10B981',   // Emerald
      jointFill: '#6366F1', // Indigo
      wristFill: '#818CF8'
    },
    {
      boneStroke: isMoving ? 'rgba(245, 158, 11, 0.85)' : 'rgba(6, 182, 212, 0.90)',
      tipFill: '#38BDF8',   // Sky
      jointFill: '#0EA5E9', // Cyan
      wristFill: '#38BDF8'
    }
  ];

  const TIP_INDICES = new Set([4, 8, 12, 16, 20]);
  const palmCenters: Array<{ x: number; y: number }> = [];

  handsList.forEach((landmarks, hIdx) => {
    if (!landmarks || landmarks.length < 21) return;
    const theme = HAND_THEMES[hIdx % HAND_THEMES.length];

    // Compute palm center for inter-hand interaction visualization
    const pcX = (landmarks[0].x + landmarks[5].x + landmarks[9].x + landmarks[13].x + landmarks[17].x) / 5 * width;
    const pcY = (landmarks[0].y + landmarks[5].y + landmarks[9].y + landmarks[13].y + landmarks[17].y) / 5 * height;
    palmCenters.push({ x: pcX, y: pcY });

    // Draw bones
    ctx.beginPath();
    ctx.lineWidth   = 3;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    ctx.strokeStyle = theme.boneStroke;

    for (const [from, to] of CONNECTIONS) {
      const p1 = landmarks[from];
      const p2 = landmarks[to];
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
    }
    ctx.stroke();

    // Draw joints
    for (let i = 0; i < 21; i++) {
      const p = landmarks[i];
      const x = p.x * width;
      const y = p.y * height;
      const isTip = TIP_INDICES.has(i);

      ctx.beginPath();
      ctx.arc(x, y, isTip ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = isTip ? theme.tipFill : (i === 0 ? theme.wristFill : '#E2E8F0');
      ctx.fill();
    }
  });

  // ── Inter-Hand Engagement / Contact Visualizer ─────────────────────────────
  if (palmCenters.length >= 2) {
    const [p0, p1] = palmCenters;
    const dX = p0.x - p1.x;
    const dY = p0.y - p1.y;
    const distPx = Math.hypot(dX, dY);

    // If hands are engaged close together (within 160px on screen)
    if (distPx < 180) {
      ctx.save();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.75)'; // Emerald-400 dashed connector
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();

      // Middle contact point glow
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      ctx.beginPath();
      ctx.arc(midX, midY, 8, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(52, 211, 153, 0.85)';
      ctx.fill();
      ctx.restore();
    }
  }
}

// ── Legacy Export ─────────────────────────────────────────────────────────────
export function drawHandSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: HandLandmark[],
  width: number,
  height: number,
  isMoving: boolean
) {
  drawMultiHandSkeletonDirect(ctx, [landmarks], width, height, isMoving);
}
