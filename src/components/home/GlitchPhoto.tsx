"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlitchPhoto() {
  const [isHovered, setIsHovered] = useState(false);

  // Split image into horizontal slices for the glitch effect
  const slices = 8;

  return (
    <div 
      className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] overflow-hidden rounded-md border border-white/10 group grayscale hover:grayscale-0 transition-all duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Image */}
      <motion.img 
        src="/profile.jpeg" 
        alt="Apurba Bhaumik"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Glitch Overlay */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "brightness(2)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 z-10 bg-background/20 backdrop-blur-[2px]"
          >
            {Array.from({ length: slices }).map((_, i) => {
              // Calculate random glitch properties
              const isEven = i % 2 === 0;
              const duration = 0.15 + Math.random() * 0.2;
              const delay = Math.random() * 0.5;
              const xOffset = isEven ? [0, 8, -5, 0] : [0, -8, 5, 0];
              
              return (
                <motion.div
                  key={i}
                  className="absolute inset-x-0"
                  style={{
                    height: `${100 / slices}%`,
                    top: `${(100 / slices) * i}%`,
                    backgroundImage: "url(/profile.jpeg)",
                    backgroundSize: "100% 100%", // Fit to the container bounds
                    backgroundPosition: `center ${(100 / slices) * i}%`,
                    backgroundRepeat: "no-repeat",
                    // Cyberpunk filter on the slices
                    filter: isEven 
                      ? "hue-rotate(90deg) contrast(150%) saturate(200%)" 
                      : "hue-rotate(270deg) contrast(200%) saturate(150%)",
                    clipPath: `inset(${(100 / slices) * i}% 0 ${100 - (100 / slices) * (i + 1)}% 0)`
                  }}
                  animate={{
                    x: xOffset,
                    opacity: [0.7, 1, 0.5, 0.9],
                  }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyberpunk CRT Scanlines */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px]" />
      
      {/* Structural Corner Accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent z-30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent z-30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 right-4 w-2 h-2 bg-accent z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />

      {/* Terminal UI Overlay */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-6 z-30"
          >
            <motion.div 
              className="font-mono text-[10px] md:text-xs text-accent tracking-widest uppercase bg-black/80 backdrop-blur-md px-3 py-1.5 border border-accent/30"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              [ ENCRYPTED_ENTITY ]
            </motion.div>
            <div className="mt-2 flex gap-1">
              <motion.div className="h-1 w-2 bg-accent" animate={{ opacity: [0,1,0] }} transition={{ duration: 0.5, repeat: Infinity }} />
              <motion.div className="h-1 w-2 bg-accent" animate={{ opacity: [0,1,0] }} transition={{ duration: 0.5, delay: 0.1, repeat: Infinity }} />
              <motion.div className="h-1 w-4 bg-accent/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hover Reveal UI */}
      <div className="absolute bottom-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
        <div className="font-mono text-[10px] md:text-xs text-white tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/20">
          STATUS: ONLINE
        </div>
      </div>
    </div>
  );
}
