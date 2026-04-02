"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlitchPhoto from "./GlitchPhoto";

const subtitles = [
  "I engineer ecosystems that feel alive.",
  "I architect platforms that scale mathematically.",
  "I build interfaces that intuitively connect.",
  "I craft logic that drives real-world impact.",
  "I design systems that refuse to break.",
];

export default function AboutMe() {
  const [subtitle, setSubtitle] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSubtitle(subtitles[Math.floor(Math.random() * subtitles.length)]);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={containerRef} id="about-me" className="relative w-full py-40 bg-transparent overflow-hidden flex items-center justify-center">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-accent-dark/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <motion.div style={{ opacity, y }} className="space-y-16">
          
          <h2 className="text-sm font-mono tracking-[0.3em] text-accent uppercase flex items-center gap-4">
            <span className="w-8 h-[1px] bg-accent"></span> 
            01 / Identity
          </h2>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mb-8 mt-12">
            <div className="relative max-w-4xl lg:w-2/3">
              <p className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-primary mb-8">
                I don't just write code.<br />
                <span className="text-secondary font-light italic mt-2 block">
                  {subtitle || "\u00A0"}
                </span>
              </p>
            </div>
            
            <div className="lg:w-1/3 flex justify-center lg:justify-end w-full">
               <GlitchPhoto />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-border">
            {/* Column 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">The Architect Mindset.</h3>
              <p className="text-secondary text-base md:text-lg leading-relaxed">
                I don't believe in writing code just for the sake of it. My journey began with a deep fascination for how structural algorithms solve real-world bottlenecks. Today, I translate that raw computational logic into fluid, high-performance web applications that don't just function—they captivate.
              </p>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Bridging the Gap.</h3>
              <p className="text-secondary text-base md:text-lg leading-relaxed">
                There is a massive disconnect between theoretical computer science and intuitive human-centered design. I operate in that exact intersection. From wiring up <strong className="text-primary font-semibold font-mono">real-time P2P protocols</strong> to designing award-winning, physics-based user interfaces, I refuse to compromise on either side.
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Relentless Execution.</h3>
              <p className="text-secondary text-base md:text-lg leading-relaxed">
                Ideas are cheap. Execution is everything. Whether it's leading a team in a 24-hour hackathon, optimizing data structures to shave milliseconds off load times, or architecting scalable backend systems, my philosophy remains constant: <strong className="text-primary font-semibold">ship fast, scale mathematically, and obsess over the final millimeter of polish.</strong>
              </p>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Decorative large text */}
      <motion.div 
        className="absolute left-[-5%] top-[20%] text-[15rem] lg:text-[20rem] font-black text-foreground/[0.02] pointer-events-none whitespace-nowrap select-none"
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, 400]) }}
      >
        ENGINEER
      </motion.div>
    </section>
  );
}
