"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PETAL_COUNT = 30;

export default function GlobalSakura() {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    // Generate petals only on client to avoid hydration mismatch
    const newPetals = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: Math.random() * 12 + 8, // 8px to 20px
      height: Math.random() * 16 + 10, // 10px to 26px
      duration: Math.random() * 15 + 10, // 10s to 25s
      delay: Math.random() * 10, // 0s to 10s
      xMovement: Math.random() * 150 - 75,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      {/* Global Falling Petals placed in background (z-0) behind content */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute bg-gradient-to-br from-red-500/80 to-pink-400/80 border border-pink-300/20"
            style={{
              left: petal.left,
              top: -50,
              width: petal.width,
              height: petal.height,
              borderRadius: "50% 0 50% 0", // Classic petal shape
              boxShadow: "0 0 10px rgba(255, 50, 50, 0.4)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, petal.xMovement * 0.5, petal.xMovement],
              rotateX: [0, 360 * (petal.id % 2 === 0 ? 1 : -1)],
              rotateY: [0, 360 * (petal.id % 3 === 0 ? 1 : -1)],
              rotateZ: [0, 360 * (petal.id % 4 === 0 ? 1 : -1)],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </>
  );
}
