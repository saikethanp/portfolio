"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * IntroSequence – plays a short MP4 video with audio.
 * Supports distinct desktop and mobile ratio videos.
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
  const [videoSrc, setVideoSrc] = useState("/intro.mp4");

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

  // Autoplay when `playing` or `videoSrc` changes – works after a user click, so audio is allowed.
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
  }, [playing, videoSrc]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0d0d0d] z-0"
    >
      <video
        key={videoSrc} // Triggers video element recreation when the source shifts
        ref={videoRef}
        id="intro-video"
        src={videoSrc}
        className="w-full h-full object-cover"
        onEnded={handleEnded}
        playsInline
        preload="auto"
      />
    </motion.div>
  );
}
