"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroDashboard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
    }
  };
  
  const floatVariantsDelayed = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-[#ffb677] via-[#ff7a26] to-[#d64e05] overflow-hidden text-black pb-24 flex flex-col">
      {/* Background Particles/Stars (simulated with tiny divs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() * 0.5 + 0.2, y: Math.random() * 100 + "%", x: Math.random() * 100 + "%" }}
            animate={{ y: [null, Math.random() * 100 + "%"] }}
            transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full bg-white/40"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 py-6 w-full gap-4"
      >
        <div className="text-sm font-bold tracking-widest uppercase text-black/80">
          INDIA TIME - {time || "..."}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm font-black tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="mailto:saikethan2905@gmail.com" 
          className="px-6 py-2 rounded-full border border-black/20 hover:bg-black hover:text-white transition-colors text-sm font-bold tracking-wider"
        >
          Email me
        </motion.a>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 lg:px-32 pt-20 gap-16 flex-1">
        
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full lg:w-3/5 flex flex-col gap-8"
        >
          <motion.div variants={itemVariants}>
            <p className="text-black/80 font-bold mb-2">Hi, I&apos;m</p>
            <p className="text-[#d64e05] font-black text-xl md:text-2xl mb-4 tracking-wide">Software Developer</p>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-[8rem] font-black leading-[0.9] tracking-tighter drop-shadow-sm"
          >
            Sai<br />
            Kethan
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-4"
          >
            {["AI Architect", "Full Stack Engineer", "LLM Fine-Tuning", "MERN Stack"].map((skill, i) => (
              <motion.span 
                key={i} 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.4)" }}
                className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-bold shadow-sm cursor-default transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "#ffaa22" }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff9900] text-black font-black uppercase tracking-wider shadow-xl"
            >
              View Projects <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Content (Floating Cards) */}
        <div className="w-full lg:w-2/5 flex flex-col gap-8 lg:pr-12">
          <motion.div 
            variants={floatVariants}
            animate="animate"
          >
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl hover:shadow-[0_20px_50px_rgba(214,78,5,0.3)] transition-shadow duration-500"
            >
              <p className="font-black text-2xl leading-snug mb-4 text-black">
                Building cinematic digital <span className="text-[#ff7a26]">experiences</span> with modern web technologies & AI.
              </p>
              <p className="text-gray-500 font-medium text-sm">
                Available for freelance & full-time opportunities.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={floatVariantsDelayed}
            animate="animate"
          >
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="bg-[#f0eadd] rounded-[2rem] p-8 md:p-10 shadow-xl border border-white/50 hover:shadow-[0_20px_40px_rgba(214,78,5,0.2)] transition-shadow duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                <p className="font-black text-lg text-black">Available For work</p>
              </div>
              <p className="text-gray-600 font-semibold text-sm leading-relaxed">
                Based in India <br />
                Available Worldwide
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
