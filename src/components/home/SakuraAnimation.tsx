"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PETAL_COUNT = 35;

export default function SakuraAnimation() {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    // Generate petals only on the client side to prevent hydration mismatches
    const newPetals = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: Math.random() * 8 + 10, // 10px to 18px
      height: Math.random() * 12 + 14, // 14px to 26px
      duration: Math.random() * 12 + 10, // 10s to 22s
      delay: Math.random() * 10, // 0s to 10s
      xMovement: Math.random() * 100 - 50,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute bg-pink-300/40 border border-pink-200/20"
          style={{
            left: petal.left,
            top: -50,
            width: petal.width,
            height: petal.height,
            // Custom shape for a petal: pointed at top-left and bottom-right
            borderRadius: "50% 0 50% 0",
            boxShadow: "0 0 10px rgba(255, 182, 193, 0.2)",
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
  );
}
