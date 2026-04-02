"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SlashEvent {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export default function InteractiveKatana() {
  const [slashes, setSlashes] = useState<SlashEvent[]>([]);

  useEffect(() => {
    // Add event listener to the whole document
    const handleClick = (e: MouseEvent) => {
      // Create a random angle between -60 and 60 degrees from vertical
      const angle = Math.random() * 120 - 60 + (Math.random() > 0.5 ? 90 : 0);
      
      const newSlash: SlashEvent = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        angle: angle,
      };

      setSlashes((prev) => [...prev, newSlash]);

      // Remove the slash after animation completes
      setTimeout(() => {
        setSlashes((prev) => prev.filter((s) => s.id !== newSlash.id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {slashes.map((slash) => (
          <motion.div
            key={slash.id}
            initial={{ opacity: 1, scaleX: 0 }}
            animate={{ opacity: [1, 1, 0], scaleX: [0, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", times: [0, 0.3, 1] }}
            className="absolute rounded-full"
            style={{
              left: slash.x,
              top: slash.y,
              width: "150px", // Length of the katana cut
              height: "2px", // Thickness of cut
              backgroundColor: "#ff3333", // Redish glow matching sakura vibe
              boxShadow: "0 0 15px 4px rgba(255,50,50,0.8), 0 0 5px 2px rgba(255,255,255,1)",
              transformOrigin: "center center",
              rotate: `${slash.angle}deg`,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* White core inside the red cut */}
            <div className="w-full h-[1px] bg-white opacity-90 mx-auto mt-[0.5px]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
