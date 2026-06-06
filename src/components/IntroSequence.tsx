"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function IntroSequence({
  playing,
  onComplete
}: {
  playing: boolean;
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const FRAME_COUNT = 89;
  const MIN_READY = 15; // start playback after 15 frames are available

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.067s.webp`;
      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count >= MIN_READY && !ready) setReady(true);
        if (count === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      img.onerror = (e) => {
        console.error(`Failed to load frame ${i}`, e);
        count++;
        setLoadedCount(count);
        if (count >= MIN_READY && !ready) setReady(true);
        if (count === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (index: number, imgs: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgs[index]) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    const canvas = canvasRef.current;
    const img = imgs[index];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    if (ready && !playing) {
      drawFrame(0, images);
    }
  }, [ready, playing, images]);

  useEffect(() => {
    if (ready && playing) {
      // Play audio in sync with frame sequence
      const audio = new Audio("/intro-audio.mp3");
      audio.volume = 1.0;
      audio.play().catch(() => {});

      let currentFrame = 0;
      let animationFrameId: number;
      let lastTime = Date.now();
      const delayMs = 67; // approx 15fps

      const renderLoop = () => {
        const now = Date.now();
        if (now - lastTime >= delayMs) {
          drawFrame(currentFrame, images);
          currentFrame++;
          lastTime = now;
        }
        if (currentFrame < FRAME_COUNT) {
          animationFrameId = requestAnimationFrame(renderLoop);
        } else {
          setTimeout(onComplete, 500);
        }
      };

      animationFrameId = requestAnimationFrame(renderLoop);

      return () => {
        cancelAnimationFrame(animationFrameId);
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [ready, playing, images, onComplete]);

  // Show a simple loading overlay while frames are still loading
  const loadingOverlay = (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-mono">
      Loading… {loadedCount}/{FRAME_COUNT}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0d0d0d] pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover opacity-80 mix-blend-screen" />
      <div className="absolute inset-0 bg-black/20" />
      {!ready && loadingOverlay}
    </motion.div>
  );
}
