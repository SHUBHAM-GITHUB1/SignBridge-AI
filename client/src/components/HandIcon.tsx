import React from 'react';
import { SignItem } from '../types/sign.js';

interface HandIconProps {
  sign: SignItem;
  size?: number;
  className?: string;
}

export const HandIcon: React.FC<HandIconProps> = ({ sign, size = 38, className = '' }) => {
  const f = sign.fingers || [1, 1, 1, 1, 1];
  const pt = sign.poseType || '';
  const activeStroke = '#34D399'; // Emerald-400
  const curledStroke = '#475569'; // Slate-600

  const isThumbDown = pt === 'thumb_down';
  const isPinch = pt === 'food_pinch' || pt === 'ok_circle';

  // Finger Y top positions
  const iY = f[1] ? 8 : (isPinch ? 21 : 24);
  const mY = f[2] ? 6 : (pt === 'food_pinch' ? 21 : 24);
  const rY = f[3] ? 8 : 25;
  const pY = f[4] ? 12 : 26;

  // Thumb coordinates
  let tx = f[0] ? 7 : 15;
  let ty = f[0] ? 20 : 27;
  if (isThumbDown) { tx = 8; ty = 40; }
  if (isPinch) { tx = 17; ty = 21; }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Palm Base */}
      <rect x="14" y="24" width="22" height="16" rx="6" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />

      {/* Thumb */}
      <path d={`M15 30 L${tx} ${ty}`} stroke={f[0] ? activeStroke : curledStroke} strokeWidth="4" strokeLinecap="round" />

      {/* Index */}
      <line x1="17" y1="24" x2="17" y2={iY} stroke={f[1] || isPinch ? activeStroke : curledStroke} strokeWidth="3.6" strokeLinecap="round" />

      {/* Middle */}
      <line x1="22.5" y1="24" x2="22.5" y2={mY} stroke={f[2] ? activeStroke : curledStroke} strokeWidth="3.6" strokeLinecap="round" />

      {/* Ring */}
      <line x1="28" y1="24" x2="28" y2={rY} stroke={f[3] ? activeStroke : curledStroke} strokeWidth="3.6" strokeLinecap="round" />

      {/* Pinky */}
      <line x1="33.5" y1="24" x2="33.5" y2={pY} stroke={f[4] ? activeStroke : curledStroke} strokeWidth="3.4" strokeLinecap="round" />

      {/* Pinch indicator */}
      {isPinch && <circle cx="17" cy="20" r="3.5" stroke="#FBBF24" strokeWidth="1.8" fill="none" />}
    </svg>
  );
};

