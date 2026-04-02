"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function KatanaScrollbar() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed left-4 top-0 bottom-0 z-50 w-12 flex flex-col items-center justify-start pointer-events-none py-10 opacity-90 transition-opacity duration-300 hover:opacity-100">
      
      {/* Katana Handle (Tsuka) positioned at the top */}
      <div className="relative w-4 h-32 bg-zinc-900 border-2 border-zinc-700 rounded-t-sm z-10 flex flex-col items-center justify-evenly py-1 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
        {/* Diamond wraps */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full h-4 relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-red-700 rotate-45 border border-red-900 shadow-inner" />
          </div>
        ))}
        {/* Pommel (Kashira) */}
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 rounded-t-sm" />
      </div>

      {/* Katana Guard (Tsuba) */}
      <div className="w-8 h-2 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 rounded-sm shadow-[0_0_10px_rgba(255,215,0,0.4)] z-10" />

      {/* Katana Blade Container (The Sheath / Track) */}
      <div className="relative w-[3px] flex-grow mt-[0px] bg-black/40 rounded-b-full overflow-hidden shadow-inner">
        
        {/* The Blade Fill (Revealed on Scroll) */}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-white via-zinc-300 to-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.9)] origin-top rounded-b-full"
          style={{ scaleY }}
        >
          {/* Hamon (Blade Edge Pattern Highlight) */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white opacity-90" />
        </motion.div>
      </div>
      
    </div>
  );
}
