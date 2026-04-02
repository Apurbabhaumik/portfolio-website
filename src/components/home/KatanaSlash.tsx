"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function KatanaSlash({ start }: { start: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (start) {
      setIsPlaying(true);
      // Remove it from the DOM after the animation completes to clear resources
      const timeout = setTimeout(() => setIsPlaying(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [start]);

  if (!isPlaying) return null;

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* The Slash Line */}
      <motion.div
        className="absolute w-[150%] h-[3px] bg-white shadow-[0_0_30px_10px_rgba(255,255,255,1),_0_0_10px_rgba(100,200,255,0.8)]"
        style={{ originX: 0.5, originY: 0.5 }}
        initial={{
          rotate: -20,
          scaleX: 0,
          opacity: 0,
          x: "-50%",
          y: "-50%"
        }}
        animate={{
          scaleX: [0, 1.2, 0],
          opacity: [0, 1, 0],
          x: ["-50%", "0%", "50%"],
          y: ["-50%", "0%", "50%"]
        }}
        transition={{
          duration: 0.4,
          ease: "circOut",
          times: [0, 0.4, 1],
        }}
      />
      
      {/* White Flash Effect mimicking lighting from the cut */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      />
    </div>
  );
}
