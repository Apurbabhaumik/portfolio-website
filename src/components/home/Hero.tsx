"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import Magnetic from "@/components/layout/Magnetic";
import ScrambleText from "@/components/layout/ScrambleText";
import dynamic from "next/dynamic";

// Dynamically import heavy 3D models to improve Initial Load / TTI
const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
});

const quotes = [
  "Building systems, exploring ideas, and turning code into experiences.",
  "Turning complex logic into scalable, elegant real-time systems.",
  "Writing code that bridges the gap between raw data and human experience.",
  "Driven by curiosity, fueled by logic.",
  "Passionate about system architecture, performance, and the art of programming."
];

export default function Hero() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote on mount to avoid hydration mismatch
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 flex flex-col items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <h2 className="text-secondary font-mono tracking-widest text-sm md:text-base uppercase mb-4 pl-1">
            Student & Full Stack Developer
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-primary mb-6 flex flex-wrap gap-x-4">
            <ScrambleText text="Apurba" delay={400} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark inline-block min-w-[4ch]">
              <ScrambleText text="Bhaumik" delay={1200} />
            </span>
          </h1>
        </motion.div>

        <div className="w-full max-w-2xl h-[80px]">
          <AnimatePresence mode="wait">
            {quote && (
              <motion.div
                key={quote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="text-lg md:text-2xl text-secondary font-light leading-relaxed">
                  {quote}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-6 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={20}>
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-accent rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 interactive"
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              View Work
            </a>
          </Magnetic>
          
          <Magnetic strength={20}>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-primary border border-border rounded-full overflow-hidden transition-all hover:border-accent hover:text-accent active:scale-95 interactive"
            >
              Let's Talk
            </a>
          </Magnetic>

          <Magnetic strength={20}>
            <a
              href="/resume.png"
              download
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-primary border border-white/10 bg-white/5 rounded-full overflow-hidden transition-all hover:bg-white/10 active:scale-95 interactive"
            >
              <Download size={16} className="text-accent" />
              Download CV
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs text-secondary font-mono tracking-widest mb-2 uppercase">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent"></div>
      </motion.div>
    </section>
  );
}
