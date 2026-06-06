"use client";

import { motion } from "framer-motion";
import { Brain, Code2, MessageSquare, Sparkles, Database, Cloud } from "lucide-react";

const SERVICES = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Building intelligent systems using ML, NLP, Transformers and LLMs."
  },
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Modern responsive applications using JavaScript, HTML, CSS and databases."
  },
  {
    icon: MessageSquare,
    title: "LLM Fine-Tuning",
    description: "Custom dataset preparation, training and evaluation using Hugging Face."
  },
  {
    icon: Sparkles,
    title: "Prompt Engineering",
    description: "Designing effective prompts for AI assistants and automation workflows."
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "MySQL and MongoDB architecture for scalable applications."
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    description: "Deploying applications using Git, cloud platforms and Vercel."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ServicesGrid() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Expertise & <span className="text-accent">Services</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Specialized in bridging the gap between cutting-edge artificial intelligence and robust software engineering.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-transform duration-300">
              <service.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
