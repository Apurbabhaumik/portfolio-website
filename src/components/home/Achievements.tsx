"use client";

import { motion } from "framer-motion";
import { Copy, Trophy, Crown, Medal } from "lucide-react";

const achievements = [
  {
    title: "State 1st Runner Up",
    org: "SOF ICSO",
    year: "2019",
    description: "Secured the 2nd position in the state at the Science Olympiad Foundation International Computer Science Olympiad.",
    icon: <Trophy className="text-yellow-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />,
  },
  {
    title: "Hackathon Winner",
    org: "College Webathon",
    year: "2024",
    description: "Led the 1st place team in a rigorous 24-hour web development competition, building a full-stack solution from scratch.",
    icon: <Crown className="text-accent w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />,
  },
  {
    title: "State Winner",
    org: "Painting Competition",
    year: "2020",
    description: "Awarded 1st place in a state-level fine arts competition, blending creativity with precision.",
    icon: <Medal className="text-purple-400 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />,
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative w-full py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Milestones.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-lg"
          >
            A collection of moments where hard work meets recognition, spanning from technical excellence to creative arts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
              className="group relative bg-[#0a0a0a] rounded-3xl p-10 border border-white/5 hover:border-white/20 transition-all duration-300 interactive shadow-2xl hover:shadow-[0_20px_40px_rgba(0,255,204,0.05)]"
            >
              {item.icon}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono tracking-widest uppercase text-accent">{item.org}</span>
                <span className="text-xs font-mono text-zinc-500">{item.year}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-colors pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
