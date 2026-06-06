"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Full Stack Development Internship with NLP",
    issuer: "StudyOwl",
    year: "2025"
  },
  {
    title: "GenAI Data Analytics Simulation",
    issuer: "Tata (Forage)",
    year: "2025"
  },
  {
    title: "Data Analytics Simulation",
    issuer: "Deloitte",
    year: "2026"
  }
];

const EDUCATION = [
  {
    degree: "B.Tech Computer Science Engineering",
    institution: "Madanapalle Institute of Technology & Science",
    year: "2024–2027",
    score: "CGPA: 7.75"
  },
  {
    degree: "Intermediate MPC",
    institution: "Narayana Junior College",
    year: "",
    score: "91%"
  },
  {
    degree: "SSC",
    institution: "Sri Chaitanya Children's Academy",
    year: "",
    score: "99.9%"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-[#0a0a0a]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Education */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
          </div>
          
          <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                <p className="text-gray-400 mb-4">{edu.institution}</p>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-accent">{edu.score}</span>
                  {edu.year && <span className="text-gray-500">{edu.year}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Certifications</h2>
          </div>
          
          <div className="space-y-8">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-400">{cert.issuer}</span>
                  <span className="text-accent font-medium">{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
