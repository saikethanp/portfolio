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
  const [loaded, setLoaded] = useState(false);
  const FRAME_COUNT = 89;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.067s.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
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
    if (loaded && !playing) {
      drawFrame(0, images);
    }
  }, [loaded, playing, images]);

  useEffect(() => {
    if (playing && loaded) {
      // Play audio in sync with frame sequence
      const audio = new Audio("/intro-audio.mp3");
      audio.volume = 1.0;
      audio.play().catch(() => {
        // Autoplay may be blocked; audio will just be silent if so
      });

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
          // Add a slight delay before triggering complete to ensure last frame is drawn
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
  }, [playing, loaded, images, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0d0d0d] pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover opacity-80 mix-blend-screen" />
      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
  );
}
