"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroSequence({
  playing,
  onComplete,
}: {
  playing: boolean;
  onComplete: () => void;
}) {
  // When the video ends we inform the parent
  const handleEnded = () => {
    onComplete();
  };

  // Auto‑play when `playing` becomes true. The START button already counts as a user gesture.
  useEffect(() => {
    const video = document.getElementById("intro-video") as HTMLVideoElement | null;
    if (video) {
      if (playing) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked – unlikely because we have a click
          });
        }
      } else {
        video.pause();
      }
    }
  }, [playing]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0d0d0d] pointer-events-none z-0"
    >
      <video
        id="intro-video"
        src="/intro.mp4"
        className="w-full h-full object-cover"
        onEnded={handleEnded}
        playsInline
        muted={false}
        preload="auto"
      />
    </motion.div>
  );
}
