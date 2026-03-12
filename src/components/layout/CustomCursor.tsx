"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorSize = isHovered ? 48 : 16;
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotSize = 4;
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const dotXSpring = useSpring(dotX, { damping: 40, stiffness: 1000, mass: 0.1 });
  const dotYSpring = useSpring(dotY, { damping: 40, stiffness: 1000, mass: 0.1 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - cursorSize / 2);
      cursorY.set(e.clientY - cursorSize / 2);
      dotX.set(e.clientX - dotSize / 2);
      dotY.set(e.clientY - dotSize / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorSize, cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer Glow / Magnetic Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/50 pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: cursorSize,
          height: cursorSize,
          backgroundColor: isHovered ? "rgba(0, 255, 204, 0.2)" : "transparent",
        }}
      />
      
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 bg-accent rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          width: dotSize,
          height: dotSize,
        }}
      />
    </>
  );
}
