"use client";

import { motion } from "framer-motion";

const TAGS = [
  "Python", "Machine Learning", "Artificial Intelligence", 
  "Transformers", "NLP", "Prompt Engineering", "MongoDB", 
  "MySQL", "JavaScript", "Git", "Cloud Computing", 
  "Full Stack Development", "LLM Fine-Tuning", "AI Automation"
];

// Split tags into two rows for the marquee effect
const ROW1 = TAGS.slice(0, 7);
const ROW2 = TAGS.slice(7);

const MarqueeRow = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap py-4 mask-edges">
      <motion.div
        className="flex gap-4 md:gap-8 min-w-max pr-4 md:pr-8"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* We duplicate the items 4 times to ensure a smooth continuous loop */}
        {[...items, ...items, ...items, ...items].map((tag, i) => (
          <div
            key={i}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium text-sm md:text-lg backdrop-blur-sm hover:bg-white/10 hover:text-accent transition-colors cursor-default"
          >
            {tag}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TagScroll() {
  return (
    <section className="py-24 overflow-hidden bg-[#0a0a0a]">
      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW1} />
        <MarqueeRow items={ROW2} reverse />
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
}
