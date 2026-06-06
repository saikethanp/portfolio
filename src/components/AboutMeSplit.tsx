"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function AnimatedCounter({ value, suffix, text }: { value: number; suffix: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (current) => {
    // For decimals like 7.75
    if (value % 1 !== 0) {
      return current.toFixed(2);
    }
    return Math.round(current).toString();
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors">
      <div className="flex items-baseline gap-1 text-5xl md:text-6xl font-bold text-accent">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-gray-400 font-medium">{text}</p>
    </div>
  );
}

export default function AboutMeSplit() {
  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            From Curiosity To <br className="hidden md:block" />
            <span className="text-accent">AI Innovation</span>
          </h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              I am a Computer Science Engineering student passionate about Artificial Intelligence, 
              Machine Learning, NLP, and Full Stack Development.
            </p>
            <p>
              I have hands-on experience in building AI-driven applications including fine-tuning 
              Large Language Models, developing intelligent resume analysis systems, and creating 
              responsive web applications.
            </p>
            <p>
              My goal is to build impactful AI products and scalable software systems that solve 
              real-world problems and improve human productivity.
            </p>
          </div>
        </motion.div>

        {/* Stats Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <AnimatedCounter value={10} suffix="+" text="Tech Stack" />
          <AnimatedCounter value={3} suffix="+" text="Major Projects" />
          <AnimatedCounter value={3} suffix="+" text="Certifications" />
          <AnimatedCounter value={2} suffix="+" text="Internships" />
        </div>

      </div>
    </section>
  );
}
