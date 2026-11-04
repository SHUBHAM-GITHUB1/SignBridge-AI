import React from 'react';
import { useSignStore } from '../store/useSignStore.js';
import { HandIcon } from './HandIcon.js';

interface VisionCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const VisionCanvas: React.FC<VisionCanvasProps> = ({ videoRef, canvasRef }) => {
  const {
    cameraRunning,
    currentSign,
    currentConfidence,
    currentZone,
    detectedHandsCount,
    isHandMoving,
    holdProgress,
  } = useSignStore();

  // Circular progress SVG (radius 22, circumference ≈ 138.2)
  const radius          = 22;
  const circumference   = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - holdProgress * circumference;

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-surface-950 rounded-2xl overflow-hidden border border-surface-700 shadow-2xl">
      {/* Video stream — mirrored via CSS scale */}
      <video
        ref={videoRef as any}
        playsInline
        muted
        className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${
          cameraRunning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Skeleton canvas — drawn directly by rAF, NOT by React */}
      <canvas
        ref={canvasRef as any}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Camera-off placeholder */}
      {!cameraRunning && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gradient-to-b from-surface-950/70 to-surface-900/90">
          <div className="w-20 h-20 rounded-3xl bg-surface-800/80 border border-surface-600 flex items-center justify-center mb-4 pulse-glow">
            <HandIcon sign={currentSign} size={54} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-1">Camera Inactive</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            Click <strong className="text-emerald-400">"Start Live Camera"</strong> above for
            real-time 3D hand tracking, or tap any sign below to test.
          </p>
        </div>
      )}

      {/* Top Left: Spatial Zone & Multi-Hand Tracking Badges */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-900/80 backdrop-blur-md border border-surface-700 text-[11px] font-mono text-slate-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>ZONE: {currentZone}</span>
        </div>

        {cameraRunning && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold backdrop-blur-md border shadow-md transition-all ${
              detectedHandsCount >= 2
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-500/20 shadow-sm'
                : 'bg-surface-900/80 text-slate-400 border-surface-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                detectedHandsCount >= 2 ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'
              }`}
            />
            <span>{detectedHandsCount >= 2 ? 'DUAL HANDS ACTIVE' : '1 HAND TRACKED'}</span>
          </div>
        )}
      </div>

      {/* Motion status */}
      <div className="absolute top-3 right-3 z-20">
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-md flex items-center gap-1.5 transition-colors ${
            isHandMoving
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isHandMoving ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
            }`}
          />
          {isHandMoving ? 'Moving Hand' : 'Steady • Locking'}
        </span>
      </div>

      {/* Bottom HUD: live sign + hold ring */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-900/85 backdrop-blur-md border border-surface-700 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-surface-800 border border-surface-600 flex items-center justify-center shrink-0">
            <HandIcon sign={currentSign} size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black text-white">
                {currentSign.en}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {(currentConfidence * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
              {currentSign.hint}
            </p>
          </div>
        </div>

        {/* Hold-to-lock circular ring */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r={radius} className="stroke-surface-700" strokeWidth="4" fill="none" />
              <circle
                cx="26" cy="26" r={radius}
                className="stroke-emerald-400 transition-all duration-75"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-[10px] font-mono font-bold text-slate-200">
              {isHandMoving ? 'WAIT' : `${Math.round(holdProgress * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
