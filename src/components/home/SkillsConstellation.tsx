"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type SkillCategory = "Languages" | "Frontend" | "Backend" | "Databases" | "Tools";

interface Skill {
  name: string;
  category: SkillCategory;
  x: number;
  y: number;
}

const skills: Skill[] = [
  // Languages
  { name: "C++", category: "Languages", x: 15, y: 15 },
  { name: "Java", category: "Languages", x: 30, y: 10 },
  { name: "JavaScript", category: "Languages", x: 45, y: 15 },
  { name: "TypeScript", category: "Languages", x: 60, y: 10 },
  { name: "Python", category: "Languages", x: 75, y: 15 },
  { name: "C", category: "Languages", x: 10, y: 30 },
  { name: "PHP", category: "Languages", x: 25, y: 25 },
  { name: "Kotlin", category: "Languages", x: 40, y: 28 },
  { name: "C#", category: "Languages", x: 55, y: 25 },
  
  // Frontend
  { name: "React.js", category: "Frontend", x: 10, y: 50 },
  { name: "Next.js", category: "Frontend", x: 25, y: 45 },
  { name: "HTML", category: "Frontend", x: 40, y: 50 },
  { name: "CSS", category: "Frontend", x: 55, y: 45 },
  { name: "Tailwind CSS", category: "Frontend", x: 70, y: 50 },
  { name: "Bootstrap", category: "Frontend", x: 85, y: 45 },
  
  // Backend
  { name: "Node.js", category: "Backend", x: 15, y: 70 },
  { name: "Express.js", category: "Backend", x: 30, y: 65 },
  { name: "SpringBoot", category: "Backend", x: 45, y: 70 },
  { name: "ASP.Net", category: "Backend", x: 60, y: 65 },
  { name: "REST APIs", category: "Backend", x: 75, y: 70 },
  
  // Databases
  { name: "MongoDB", category: "Databases", x: 15, y: 88 },
  { name: "PostgreSQL", category: "Databases", x: 35, y: 85 },
  { name: "MySQL", category: "Databases", x: 55, y: 88 },
  { name: "Redis", category: "Databases", x: 75, y: 85 },
  
  // Tools/Other
  { name: "Docker", category: "Tools", x: 88, y: 15 },
  { name: "Git", category: "Tools", x: 85, y: 30 },
  { name: "GitHub", category: "Tools", x: 88, y: 65 },
  { name: "Postman", category: "Tools", x: 85, y: 80 },
  { name: "AWS", category: "Tools", x: 92, y: 45 },
];

const categoryColors: Record<SkillCategory, string> = {
  Languages: "#00ffcc",  // Neon cyan/accent
  Frontend: "#a855f7",   // Purple
  Backend: "#3b82f6",    // Blue
  Databases: "#22c55e",  // Green
  Tools: "#f59e0b"       // Amber
};

export default function SkillsConstellation() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");

  const filterSkills = activeCategory === "All" ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative w-full min-h-screen py-32 bg-transparent overflow-hidden flex flex-col items-center justify-center border-t border-border dark:border-white/5">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-primary dark:text-white"
        >
          Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Ecosystem.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-secondary dark:text-zinc-400 text-lg max-w-2xl mx-auto font-light"
        >
          A constellation of the languages, frameworks, and tools I use to build digital experiences.
        </motion.p>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
        >
          <button 
            onClick={() => setActiveCategory("All")}
            className={`px-5 py-2 rounded-full text-sm font-mono transition-all duration-300 interactive border ${activeCategory === "All" ? "bg-primary dark:bg-white text-background dark:text-black border-primary dark:border-white shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "bg-card dark:bg-white/5 text-secondary dark:text-zinc-400 border-border dark:border-white/10 hover:bg-card-hover dark:hover:bg-white/10 hover:text-primary dark:hover:text-white"}`}
          >
            All Tech
          </button>
          
          {(Object.keys(categoryColors) as SkillCategory[]).map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-mono transition-all duration-300 interactive border flex items-center space-x-2 text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-white`}
              style={{ 
                backgroundColor: activeCategory === category ? `${categoryColors[category]}20` : "transparent",
                borderColor: activeCategory === category ? categoryColors[category] : "var(--border)",
                color: activeCategory === category ? categoryColors[category] : undefined,

                boxShadow: activeCategory === category ? `0 0 15px ${categoryColors[category]}40` : "none"
              }}
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: categoryColors[category], opacity: activeCategory === "All" || activeCategory === category ? 1 : 0.4 }} 
              />
              <span className="group-hover:text-white transition-colors">{category}</span>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="relative w-full max-w-6xl h-[70vh] rounded-[3rem] bg-black/20 backdrop-blur-2xl overflow-hidden mx-6 border border-border dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_0_80px_rgba(255,255,255,0.05)] transition-shadow duration-700 group/canvas">
        {/* Draw subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)] transition-opacity duration-700 opacity-50 group-hover/canvas:opacity-100"></div>

        {/* SVG connections logic (visuals only) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 group-hover/canvas:opacity-40 transition-opacity duration-700">
           {/* Abstract lines representing connections */}
           <path d="M 15% 15% Q 30% 10% 45% 15% T 75% 15%" fill="none" stroke="url(#lang-grad)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" style={{ opacity: activeCategory === "All" || activeCategory === "Languages" ? 1 : 0 }} />
           <path d="M 10% 50% Q 40% 55% 85% 45%" fill="none" stroke="url(#front-grad)" strokeWidth="1" strokeDasharray="4 4" style={{ opacity: activeCategory === "All" || activeCategory === "Frontend" ? 1 : 0 }} />
           <path d="M 15% 70% Q 45% 65% 75% 70%" fill="none" stroke="url(#back-grad)" strokeWidth="1" strokeDasharray="4 4" style={{ opacity: activeCategory === "All" || activeCategory === "Backend" ? 1 : 0 }} />
           
           <defs>
             <linearGradient id="lang-grad" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.2" />
               <stop offset="50%" stopColor="#00ffcc" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.2" />
             </linearGradient>
             <linearGradient id="front-grad" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
               <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
             </linearGradient>
             <linearGradient id="back-grad" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
               <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
             </linearGradient>
           </defs>
        </svg>

        {/* Draggable Nodes */}
        {skills.map((skill, index) => {
          const isVisible = activeCategory === "All" || activeCategory === skill.category;
          const color = categoryColors[skill.category];
          
          return (
            <motion.div
              key={skill.name}
              drag
              dragConstraints={{ left: 20, right: 1000, top: 20, bottom: 500 }}
              dragElastic={0.2}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              whileDrag={{ scale: 1.2, cursor: "grabbing" }}
              animate={{ 
                opacity: isVisible ? 1 : 0.1,
                scale: isVisible ? 1 : 0.8,
                filter: isVisible ? "blur(0px)" : "blur(4px)",
                pointerEvents: isVisible ? "auto" : "none"
              }}
              initial={{ opacity: 0, scale: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                opacity: { duration: 0.4 }
              }}
              className="absolute flex items-center justify-center px-5 flex-col py-3 bg-white/5 dark:bg-black/50 backdrop-blur-md border rounded-full cursor-grab interactive text-sm font-medium transition-colors shadow-xl hover:shadow-2xl hover:bg-white/10 dark:hover:bg-black/70 group/node text-primary dark:text-white"
              style={{ 
                left: `${skill.x}%`, 
                top: `${skill.y}%`, 
                x: "-50%", 
                y: "-50%",
                borderColor: isVisible ? `${color}40` : 'transparent',
                color: isVisible ? undefined : 'var(--secondary)',
              }}
            >
              <span className="relative z-10">{skill.name}</span>
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover/node:opacity-20 transition-opacity duration-300 blur-md pointer-events-none"
                style={{ backgroundColor: color }}
              />
               <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover/node:opacity-20 transition-opacity duration-300 border-2 pointer-events-none"
                style={{ borderColor: color }}
              />
            </motion.div>
          );
        })}

        <div className="absolute bottom-6 right-8 text-xs font-mono text-zinc-600 flex items-center space-x-2 pointer-events-none opacity-50">
          <span className="w-2 h-2 rounded-full border border-zinc-500 animate-ping"></span>
          <span>Click and drag nodes to explore</span>
        </div>
      </div>
    </section>
  );
}
