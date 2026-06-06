"use client";

import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    year: "2024",
    title: "Started B.Tech Computer Science Engineering",
    description: "Focused on AI, ML and software development fundamentals."
  },
  {
    year: "2025",
    title: "StudyOwl Internship",
    description: "Worked on AI Resume Analyzer using NLP and Machine Learning."
  },
  {
    year: "2025",
    title: "Fine-Tuned LLaMA Model",
    description: "Built custom conversational AI using Hinglish datasets."
  },
  {
    year: "2025",
    title: "Music Web Application",
    description: "Developed a client-based responsive streaming platform."
  },
  {
    year: "2026",
    title: "Advanced AI Projects",
    description: "Expanding expertise in LLMs, automation and intelligent systems."
  }
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Journey & <span className="text-accent">Experience</span></h2>
      </div>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:border-none space-y-12 md:space-y-24">
        {/* Central Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col md:flex-row items-start w-full"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-accent ring-4 ring-background z-10" />

            {/* Content */}
            <div className={`ml-8 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}>
              <span className="text-accent font-bold text-xl mb-2 block">{exp.year}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{exp.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
