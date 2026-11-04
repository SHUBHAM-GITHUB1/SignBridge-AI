import React, { useRef } from 'react';
import { Header } from './components/Header.js';
import { VisionCanvas } from './components/VisionCanvas.js';
import { SequenceBar } from './components/SequenceBar.js';
import { TrilingualCards } from './components/TrilingualCards.js';
import { QuickStarters } from './components/QuickStarters.js';
import { LexiconDrawer } from './components/LexiconDrawer.js';
import { useWebcam } from './hooks/useWebcam.js';
import { useHandTracker } from './hooks/useHandTracker.js';
import { useSignClassifier } from './hooks/useSignClassifier.js';
import { useState } from 'react';

export const App: React.FC = () => {
  const [isLexiconOpen, setIsLexiconOpen] = useState(false);

  // Refs shared between the rAF loop (in useHandTracker) and the classifier
  // — no React state involved so no re-renders on every camera frame
  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const isMovingRef = useRef<boolean>(false);

  const { videoRef, cameraRunning, toggleCamera } = useWebcam();
  const { handleFrame } = useSignClassifier({ isMovingRef });

  useHandTracker({
    videoRef,
    canvasRef,
    active: cameraRunning,
    onFrame: handleFrame,  // pure logic — no setState inside
    isMovingRef,           // rAF reads this to pick skeleton colour
  });

  return (
    <div className="min-h-screen bg-surface-900 text-slate-100 flex flex-col font-sans">
      <Header
        onToggleCamera={toggleCamera}
        onOpenLexicon={() => setIsLexiconOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <VisionCanvas
              videoRef={videoRef}
              canvasRef={canvasRef}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <SequenceBar />
            <QuickStarters />
          </div>
        </div>

        <div className="pt-2">
          <TrilingualCards />
        </div>
      </main>

      <LexiconDrawer
        isOpen={isLexiconOpen}
        onClose={() => setIsLexiconOpen(false)}
      />

      <footer className="border-t border-surface-700/60 py-4 px-6 text-center text-xs text-slate-500">
        SignBridge AI • Full-Stack React + Node.js Trilingual Assistive Voice Interpreter • MediaPipe 3D Hand Tracking
      </footer>
    </div>
  );
};

export default App;
