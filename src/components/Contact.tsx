"use client";

import { motion } from "framer-motion";
import { Mail, User, Globe } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-8 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight">
          Let&apos;s Build Something <br className="hidden md:block" />
          <span className="text-accent">Together</span>
        </h2>
        <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-16">
          Always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="mailto:saikethan2905@gmail.com"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent/90 transition-transform hover:scale-105 active:scale-95"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/sai-kethan-2907sk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-transform hover:scale-105 active:scale-95"
          >
            <User className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="https://portfolioikethan.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-transform hover:scale-105 active:scale-95"
          >
            <Globe className="w-5 h-5" />
            Portfolio
          </a>
        </div>
      </motion.div>
    </section>
  );
}
