"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  // Phase 1 (0 to 0.25)
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.25], [0, 1, 1, 0]);
  const phase1Scale = useTransform(scrollYProgress, [0, 0.25], [0.8, 1.2]);

  // Phase 2 (0.25 to 0.5)
  const phase2Opacity = useTransform(scrollYProgress, [0.22, 0.35, 0.4, 0.5], [0, 1, 1, 0]);
  const phase2Y = useTransform(scrollYProgress, [0.25, 0.5], [50, -50]);

  // Phase 3 (0.5 to 0.75)
  const phase3Opacity = useTransform(scrollYProgress, [0.48, 0.6, 0.65, 0.75], [0, 1, 1, 0]);
  const phase3Scale = useTransform(scrollYProgress, [0.5, 0.75], [0.9, 1.1]);

  // Phase 4 (0.75 to 1)
  const phase4Opacity = useTransform(scrollYProgress, [0.72, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const phase4Y = useTransform(scrollYProgress, [0.75, 1], [50, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center text-center px-4 h-screen">
      
      {/* PHASE 1 */}
      <motion.div
        style={{ opacity: phase1Opacity, scale: phase1Scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-[12vw] font-black tracking-tighter text-white/5 uppercase select-none">
          SAI KETHAN
        </h1>
      </motion.div>

      {/* PHASE 2 */}
      <motion.div
        style={{ opacity: phase2Opacity, y: phase2Y }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      >
        <p className="text-accent tracking-[0.2em] text-sm md:text-base font-semibold uppercase">
          AI • ML • FULL STACK
        </p>
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white drop-shadow-xl">
          Sai Kethan
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mt-4 font-medium">
          B.Tech CSE • AI Engineer • Full Stack Developer
        </p>
      </motion.div>

      {/* PHASE 3 */}
      <motion.div
        style={{ opacity: phase3Opacity, scale: phase3Scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl text-white drop-shadow-2xl">
          AI Engineer &<br />
          <span className="text-accent">Creative Developer</span>
        </h2>
      </motion.div>

      {/* PHASE 4 */}
      <motion.div
        style={{ opacity: phase4Opacity, y: phase4Y }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      >
        <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl text-white drop-shadow-2xl">
          Building Intelligent Systems<br />
          For Real World Problems
        </h2>
        <p className="text-gray-300 text-lg md:text-2xl mt-4 font-medium tracking-wide">
          Machine Learning • NLP • LLMs • Web Development
        </p>
      </motion.div>

    </div>
  );
}
