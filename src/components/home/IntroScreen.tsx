"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootCommands = [
  "> INITIALIZING NEURAL FRAMEWORK...",
  "> COMPILING ARCHITECTURAL PROTOTYPES...",
  "> BYPASSING STANDARD PROTOCOLS...",
  "> ACCESS GRANTED."
];

export default function IntroScreen() {
  const [showIntro, setShowIntro] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Only run the intro animation if it hasn't run in this session yet.
    // If it's server-side rendered, sessionStorage is undefined until hydration.
    if (typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
      if (!hasSeenIntro) {
        setShowIntro(true);
        sessionStorage.setItem("hasSeenIntro", "true");
      }
    }
  }, []);

  useEffect(() => {
    if (showIntro) {
      if (currentCommandIndex < bootCommands.length) {
        setIsTyping(true);
        const timeout = setTimeout(() => {
          setCurrentCommandIndex((prev) => prev + 1);
          setIsTyping(false);
        }, 500); // 500ms delay per command line
        return () => clearTimeout(timeout);
      } else {
        // Once all commands have printed, hold for a moment then fade out
        const timeout = setTimeout(() => {
          setShowIntro(false);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentCommandIndex, showIntro]);

  // Lock body scroll while intro is visible
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col justify-center items-start p-8 md:p-24 bg-black text-green-500 font-mono text-sm md:text-xl selection:bg-green-500/30"
        >
          <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto">
            {bootCommands.slice(0, currentCommandIndex).map((cmd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="font-semibold tracking-wide"
              >
                {cmd}
              </motion.div>
            ))}
            
            {/* Blinking cursor that appears at the bottom acting as the "typing" head */}
            {currentCommandIndex < bootCommands.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
                className="w-3 h-5 md:w-4 md:h-6 bg-green-500 mt-1"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
