"use client";

import { motion } from "framer-motion";

export default function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent pointer-events-auto"
    >
      <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-10 hidden md:block">
        <h1 className="text-2xl font-bold tracking-[0.3em] text-white whitespace-nowrap origin-left">
          PORTFOLIO 2026
        </h1>
      </div>

      <div className="text-center z-10 flex flex-col items-center mt-32">
        <h2 className="text-white/60 tracking-[0.4em] uppercase text-sm md:text-base font-semibold mb-8 drop-shadow-lg">
          Sai Kethan
        </h2>
        
        <button
          onClick={onStart}
          className="group relative px-10 py-3 rounded-[2rem] border border-[#ff6b35] text-[#ff6b35] font-bold tracking-[0.2em] text-sm uppercase transition-all duration-300 hover:bg-[#ff6b35]/10 hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]"
        >
          START
        </button>
      </div>
    </motion.div>
  );
}
