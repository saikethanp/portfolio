"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * IntroSequence – plays a short MP4 video with audio.
 * The video starts when `playing` becomes true (after the user clicks START).
 * When the video ends, `onComplete` is called to advance the app.
 */
export default function IntroSequence({
  playing,
  onComplete,
}: {
  playing: boolean;
  onComplete: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    onComplete();
  };

  // Autoplay when `playing` changes – works after a user click, so audio is allowed.
  useEffect(() => {
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
  }, [playing]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0d0d0d] z-0"
    >
      <video
        ref={videoRef}
        id="intro-video"
        src="/intro.mp4"
        className="w-full h-full object-cover"
        onEnded={handleEnded}
        playsInline
        preload="auto"
      />
    </motion.div>
  );
}
