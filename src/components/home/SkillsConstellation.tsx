"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "C++", x: 10, y: 20 },
  { name: "JAVA", x: 30, y: 50 },
  { name: "JavaScript", x: 60, y: 30 },
  { name: "Python", x: 80, y: 60 },
  { name: "React", x: 20, y: 80 },
  { name: "Node.js", x: 50, y: 70 },
  { name: "MongoDB", x: 75, y: 85 },
  { name: "Docker", x: 90, y: 20 },
  { name: "Algorithms", x: 40, y: 10 },
  { name: "System Design", x: 15, y: 50 },
];

export default function SkillsConstellation() {
  return (
    <section id="skills" className="relative w-full min-h-screen py-32 bg-background overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Tech Stack.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-secondary"
        >
          Interact with the constellation.
        </motion.p>
      </div>

      <div className="relative w-full max-w-5xl h-[60vh] border border-border/20 rounded-[3rem] bg-card/20 backdrop-blur-3xl overflow-hidden mx-6">
        {/* Draw subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

        {/* SVG connections (static mock for visualization) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="10%" y1="20%" x2="40%" y2="10%" stroke="#00ffcc" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="30%" y1="50%" x2="20%" y2="80%" stroke="#00ffcc" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="60%" y1="30%" x2="50%" y2="70%" stroke="#00ffcc" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="50%" y1="70%" x2="75%" y2="85%" stroke="#00ffcc" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="60%" y1="30%" x2="80%" y2="60%" stroke="#00ffcc" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Draggable Nodes */}
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            drag
            dragConstraints={{ left: 20, right: 800, top: 20, bottom: 400 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            whileDrag={{ scale: 1.2, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: index * 0.1,
              opacity: { duration: 0.4 }
            }}
            viewport={{ once: true }}
            className="absolute flex items-center justify-center px-6 py-3 bg-black border border-white/20 rounded-full cursor-grab interactive text-sm font-medium hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-colors"
            style={{ left: `${skill.x}%`, top: `${skill.y}%`, x: "-50%", y: "-50%" }}
          >
            {skill.name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
