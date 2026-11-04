import { useRef, useCallback } from 'react';
import { useSignStore } from '../store/useSignStore.js';

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { cameraRunning, setCameraRunning } = useSignStore();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraRunning(true);
      return true;
    } catch (err: any) {
      console.error('[Webcam] Failed to start camera:', err);
      setCameraRunning(false);
      return false;
    }
  }, [setCameraRunning]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraRunning(false);
  }, [setCameraRunning]);

  const toggleCamera = useCallback(async () => {
    if (cameraRunning) {
      stopCamera();
    } else {
      await startCamera();
    }
  }, [cameraRunning, startCamera, stopCamera]);

  return {
    videoRef,
    cameraRunning,
    startCamera,
    stopCamera,
    toggleCamera
  };
}

