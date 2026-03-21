"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "circleshare",
    title: "CircleShare",
    category: "Peer-to-Peer Rental Platform",
    description: "Built a full-stack peer-to-peer rental platform that enables users to rent everyday items instead of buying them for one-time use, directly addressing real-world problems like unnecessary spending and resource waste. Designed a scalable client-server architecture using React, Node.js, and Express, with RESTful APIs.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    github: "https://github.com/Apurbabhaumik",
    link: "#",
    color: "#00ffcc",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "procastimate",
    title: "procastiMate",
    category: "Productivity Chrome Extension",
    description: "Developed a Chrome extension to reduce procrastination by tracking time spent on distracting websites. Applied timers that monitored user activity on apps like YouTube and Instagram, triggering alerts when usage crossed a defined threshold. Included customizable limits and a minimal, non-intrusive UI.",
    tech: ["JavaScript", "Chrome Extension APIs", "HTML/CSS"],
    github: "https://github.com/Apurbabhaumik",
    link: "#",
    color: "#ff00cc",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "dsa-visualizer",
    title: "DSA Visualizer",
    category: "Algorithm Educational Tool",
    description: "An interactive web application demonstrating complex algorithms including sorting, searching, recursion, and graph traversal (BFS/DFS) to help students easily visualize underlying computational steps.",
    tech: ["React.js", "Framer Motion", "Algorithms"],
    github: "https://github.com/Apurbabhaumik",
    link: "#",
    color: "#ccff00",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=80",
  }
];

export default function ProjectsGallery() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const activeData = projects.find((p) => p.id === activeProject);

  return (
    <section id="projects" className="relative w-full min-h-screen py-32 bg-background dark:bg-[#030303]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-primary dark:text-white">
            Selected Work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              layoutId={`project-container-${project.id}`}
              key={project.id}
              className="group relative cursor-pointer block h-[400px] rounded-2xl overflow-hidden bg-card border border-border interactive"
              onClick={() => setActiveProject(project.id)}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                layoutId={`project-image-${project.id}`}
                className={cn(
                  "absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out",
                  hoveredProject === project.id ? "scale-110" : "scale-100"
                )}
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="absolute inset-0 bg-white/80 dark:bg-black/60 group-hover:bg-white/60 dark:group-hover:bg-black/40 transition-colors duration-500" />
              </motion.div>

              <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end h-full bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-black/90 dark:via-black/50">
                <motion.span 
                  layoutId={`project-category-${project.id}`}
                  className="text-xs font-mono mb-3 block"
                  style={{ color: project.color }}
                >
                  {project.category}
                </motion.span>
                <motion.h3 
                  layoutId={`project-title-${project.id}`}
                  className="text-2xl font-bold text-black dark:text-white mb-2"
                >
                  {project.title}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredProject === project.id ? 1 : 0,
                    height: hoveredProject === project.id ? "auto" : 0 
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-zinc-700 dark:text-zinc-200 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Project Modal */}
      <AnimatePresence>
        {activeProject && activeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-white/60 dark:bg-black/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              layoutId={`project-container-${activeData.id}`}
              className="w-full max-w-5xl h-[80vh] md:h-auto bg-background dark:bg-[#0a0a0a] rounded-3xl overflow-hidden border border-border dark:border-border/50 flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <motion.div 
                layoutId={`project-image-${activeData.id}`}
                className="w-full md:w-1/2 h-64 md:h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${activeData.image})` }}
              />

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <motion.span 
                        layoutId={`project-category-${activeData.id}`}
                        className="text-sm font-mono mb-2 block"
                        style={{ color: activeData.color }}
                      >
                        {activeData.category}
                      </motion.span>
                      <motion.h3 
                        layoutId={`project-title-${activeData.id}`}
                        className="text-3xl md:text-5xl font-bold text-primary dark:text-white"
                      >
                        {activeData.title}
                      </motion.h3>
                    </div>
                    <button 
                      onClick={() => setActiveProject(null)}
                      className="p-2 rounded-full bg-card hover:bg-card-hover dark:bg-white/5 dark:hover:bg-white/10 transition-colors interactive text-primary dark:text-white"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <p className="text-secondary dark:text-zinc-400 leading-relaxed mb-8">
                    {activeData.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm text-primary dark:text-white mb-4 uppercase tracking-widest font-mono">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeData.tech.map((t) => (
                        <span key={t} className="px-3 py-1 bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-full text-xs text-secondary dark:text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <a 
                    href={activeData.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-white text-background dark:text-black rounded-full text-sm font-medium hover:bg-primary/80 dark:hover:bg-zinc-200 transition-colors interactive shadow-md"
                  >
                    <Github size={18} />
                    View Source
                  </a>
                  {activeData.link !== "#" && (
                    <a 
                      href={activeData.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border border-border dark:border-zinc-700 text-primary dark:text-white rounded-full text-sm font-medium hover:bg-card-hover dark:hover:bg-zinc-800 transition-colors interactive"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
