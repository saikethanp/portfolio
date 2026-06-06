"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import IntroSequence from "@/components/IntroSequence";
import HeroDashboard from "@/components/HeroDashboard";
import TagScroll from "@/components/TagScroll";
import AboutMeSplit from "@/components/AboutMeSplit";
import ServicesGrid from "@/components/ServicesGrid";
import Projects from "@/components/Projects";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [introState, setIntroState] = useState<'splash' | 'playing' | 'done'>('splash');

  return (
    <main className="bg-background min-h-screen text-white selection:bg-accent selection:text-white relative">
      
      {/* Intro sequence and splash screen logic */}
      <AnimatePresence>
        {introState === 'splash' && (
          <SplashScreen key="splash" onStart={() => setIntroState('playing')} />
        )}

        {(introState === 'splash' || introState === 'playing') && (
          <IntroSequence key="intro" playing={introState === 'playing'} onComplete={() => setIntroState('done')} />
        )}
      </AnimatePresence>

      {/* Main website content after intro finishes */}
      {introState === 'done' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative z-20 bg-background"
        >
          <HeroDashboard />
          <TagScroll />
          <AboutMeSplit />
          <ServicesGrid />
          <Projects />
          <ExperienceTimeline />
          <Certifications />
          <Contact />
          <Footer />
        </motion.div>
      )}

    </main>
  );
}
