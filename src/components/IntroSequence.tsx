"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * IntroSequence – plays a short MP4 video with audio.
 * Supports distinct desktop and mobile ratio videos.
 * Handles mobile constraints (e.g. autoplay restrictions, load errors)
 * by offering a skip option and handling failures gracefully.
 */
export default function IntroSequence({
  playing,
  onComplete,
}: {
  playing: boolean;
  onComplete: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState("/intro.mp4");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check screen width to determine whether to play the mobile or desktop video
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setVideoSrc("/intro-mobile.mp4");
      } else {
        setVideoSrc("/intro.mp4");
      }
    };

    checkScreenSize();

    // Optionally handle screen resize events if the user resizes the window
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleEnded = () => {
    onComplete();
  };

  const handleError = () => {
    console.error("Video failed to play or load. Skipping intro sequence.");
    setHasError(true);
    // Auto complete if video fails to load to prevent a permanent blank screen
    onComplete();
  };

  // Autoplay when `playing` or `videoSrc` changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      // Force loading of the correct video source
      video.load();
      video.currentTime = 0;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay block or error:", error);
          // If video fails or gets blocked, we can mute it and retry to allow playback on mobile
          video.muted = true;
          video.play().catch(() => {
            // If it still fails, we auto-advance after a small delay
            setTimeout(() => {
              onComplete();
            }, 1000);
          });
        });
      }
    } else {
      video.pause();
    }
  }, [playing, videoSrc, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0d0d0d] z-0 flex items-center justify-center"
    >
      <video
        key={videoSrc}
        ref={videoRef}
        id="intro-video"
        src={videoSrc}
        className="w-full h-full object-cover"
        onEnded={handleEnded}
        onError={handleError}
        playsInline
        webkit-playsinline="true"
        preload="auto"
        muted={false} // Start with sound enabled since they clicked 'START'
      />

      {/* Skip button for mobile users or if video is slow / lagging */}
      {playing && (
        <button
          onClick={onComplete}
          className="absolute bottom-10 right-6 z-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50 border border-white/20 rounded-full bg-black/40 backdrop-blur-md transition-all active:scale-95 hover:text-white hover:border-white/50"
        >
          Skip Intro
        </button>
      )}
    </motion.div>
  );
}
