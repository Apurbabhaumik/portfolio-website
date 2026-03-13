"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Image as ImageIcon, ChevronDown } from "lucide-react";
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
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          <div className="relative" ref={dropdownRef}>
            <Magnetic strength={20}>
              <button
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-primary border border-white/10 bg-white/5 rounded-full overflow-hidden transition-all hover:bg-white/10 active:scale-95 interactive"
              >
                <Download size={16} className="text-accent" />
                Resume
                <ChevronDown size={14} className={`transition-transform duration-300 ${isResumeOpen ? 'rotate-180' : ''}`} />
              </button>
            </Magnetic>

            <AnimatePresence>
              {isResumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-4 left-0 w-64 bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 origin-bottom-left"
                >
                  <div className="p-2 space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-secondary font-bold px-3 py-1 mb-1">
                      Choose Format
                    </p>
                    
                    {/* PDF OPTION */}
                    <div className="group/item">
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/item:bg-red-500/20 transition-colors">
                            <FileText size={16} className="text-red-400" />
                          </div>
                          <span className="text-sm font-medium">PDF Document</span>
                        </div>
                      </div>
                      <div className="flex gap-2 px-3 pb-2 ml-11">
                        <a href="/resume.pdf" target="_blank" className="text-xs text-secondary hover:text-accent transition-colors">View</a>
                        <span className="text-zinc-700">|</span>
                        <a href="/resume.pdf" download className="text-xs text-secondary hover:text-accent transition-colors">Download</a>
                      </div>
                    </div>

                    <div className="h-px bg-white/5 mx-2 my-1" />

                    {/* IMAGE OPTION */}
                    <div className="group/item">
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500/20 transition-colors">
                            <ImageIcon size={16} className="text-blue-400" />
                          </div>
                          <span className="text-sm font-medium">Image (PNG)</span>
                        </div>
                      </div>
                      <div className="flex gap-2 px-3 pb-2 ml-11">
                        <a href="/resume.png" target="_blank" className="text-xs text-secondary hover:text-accent transition-colors">View</a>
                        <span className="text-zinc-700">|</span>
                        <a href="/resume.png" download className="text-xs text-secondary hover:text-accent transition-colors">Download</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
