"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * IntroSequence – plays a short MP4 intro video. If the video fails to load (e.g., missing file),
 * it falls back to the original frame‑by‑frame canvas animation using the images in
 * `/public/sequence/`.
 *
 * • Desktop & mobile friendly – full‑screen video, object‑cover, playsInline.
 * • Automatic fallback – prevents a black screen when the video asset is unavailable.
 * • Calls `onComplete` when the video ends or when the canvas animation finishes.
 */
export default function IntroSequence({
  playing,
  onComplete,
}: {
  playing: boolean;
  onComplete: () => void;
}) {
  const [fallback, setFallback] = useState(false); // true -> use canvas animation
  const videoRef = useRef<HTMLVideoElement>(null);

  // Notify parent when the video ends
  const handleEnded = () => {
    onComplete();
  };

  // If video errors (e.g., missing file), switch to fallback
  const handleError = () => {
    console.warn("Intro video failed to load – switching to canvas fallback");
    setFallback(true);
  };

  // Autoplay logic – works for both video and canvas paths
  useEffect(() => {
    if (fallback) return; // canvas handles its own playback
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [playing, fallback]);

  // ---------- Canvas fallback implementation ----------
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const FRAME_COUNT = 89;
  const MIN_READY = 5; // start after a few frames are loaded

  // Load frame images only when fallback is active
  useEffect(() => {
    if (!fallback) return;
    const loaded: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.067s.webp`;
      img.onload = () => {
        loaded[i] = img;
        loadedCount++;
        setImages([...loaded]);
        if (loadedCount >= MIN_READY) setReady(true);
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loadedCount++;
        if (loadedCount >= MIN_READY) setReady(true);
      };
    }
  }, [fallback]);

  // Draw a single frame onto the canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = images[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Play canvas animation when both ready and `playing` are true
  useEffect(() => {
    if (!fallback || !ready || !playing) return;

    // Play audio in sync (keep original audio file if you still have it)
    const audio = new Audio("/intro-audio.mp3");
    audio.volume = 1.0;
    audio.play().catch(() => {});

    let frame = 0;
    let animationId: number;
    const delayMs = 67; // ≈15fps
    let last = Date.now();

    const loop = () => {
      const now = Date.now();
      if (now - last >= delayMs) {
        drawFrame(frame);
        frame++;
        last = now;
      }
      if (frame < FRAME_COUNT) {
        animationId = requestAnimationFrame(loop);
      } else {
        setTimeout(onComplete, 500);
      }
    };
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [fallback, ready, playing, images, onComplete]);

  // Simple loading overlay while frames load (only shown for fallback)
  const loadingOverlay = (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-mono">
      Loading… {images.filter(Boolean).length}/{FRAME_COUNT}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0d0d0d] z-0"
    >
      {/* Video element – displayed when not in fallback mode */}
      {!fallback && (
        <video
          ref={videoRef}
          id="intro-video"
          src="/intro.mp4"
          className="w-full h-full object-cover"
          onEnded={handleEnded}
          onError={handleError}
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* Canvas fallback – shown only after an error or missing video */}
      {fallback && (
        <>
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
          {!ready && loadingOverlay}
        </>
      )}
    </motion.div>
  );
}
