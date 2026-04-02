"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none bg-[var(--background)]">
      {/* 
        We use ultra-large blurred absolute divs to create an aurora/mesh gradient 
        that slowly moves and breathes behind all content.
      */}

      {/* Deep Red / Katana Glow passing across the center */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full bg-red-900/30 blur-[140px] mix-blend-screen"
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "10%", "-20%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "10%" }}
      />

      {/* Deep Purple / Sakura Space aura drifting slowly */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] rounded-full bg-indigo-900/20 blur-[160px] mix-blend-screen"
        animate={{
          x: ["10%", "-30%", "10%"],
          y: ["10%", "-10%", "10%"],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "30%", right: "0%" }}
      />

      {/* Subdued Cyan / Blue core to balance the reds */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full bg-blue-900/15 blur-[120px] mix-blend-screen"
        animate={{
          x: ["-30%", "20%", "-30%"],
          y: ["30%", "-20%", "30%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "-10%", left: "20%" }}
      />
      
      {/* Intense red accent tracing the bottom right corner (like a slayed demon blood moon) */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-red-600/10 blur-[130px] mix-blend-screen"
        animate={{
          x: ["0%", "-20%", "0%"],
          y: ["0%", "-10%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "-10%", right: "-10%" }}
      />
    </div>
  );
}
