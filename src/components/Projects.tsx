"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const PROJECTS = [
  {
    title: "Fine-Tuned LLaMA Model",
    description: "Fine-tuned a LLaMA model on a custom Hinglish dataset for conversational AI tasks. Preprocessed Hindi-English code-mixed data and trained using Hugging Face Transformers.",
    tech: ["Python", "Transformers", "Hugging Face", "LLMs"],
    link: "https://colab.research.google.com/drive/11vUP-9vtXxoYdzUsi2J_dDpQ_oe5Cf80",
    github: "#",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI Resume Analyzer",
    description: "Developed an AI-powered resume analysis system using NLP techniques. Matched candidate skills with job requirements and generated ATS optimization suggestions.",
    tech: ["Python", "NLP", "Machine Learning"],
    link: "https://resumekt.vercel.app",
    github: "#",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Client-Based Music Web Application",
    description: "Built a responsive music streaming web application with dynamic UI and content approval workflows.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://japriya.vercel.app",
    github: "#",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-[#0a0a0a]">
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured <span className="text-accent">Projects</span></h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            A selection of my recent work in AI, Machine Learning, and Web Development.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-12 md:gap-24">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center group"
          >
            {/* Project Image */}
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative group-hover:border-accent/50 transition-colors">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Project Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full bg-white/5 text-sm font-medium text-gray-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-6">
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-accent transition-colors font-semibold">
                  <Code className="w-5 h-5" /> Code
                </a>
                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-accent transition-colors font-semibold">
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
