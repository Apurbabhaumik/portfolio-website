"use client";

import { motion } from "framer-motion";
import { ExternalLink, TerminalSquare } from "lucide-react";

const profiles = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/apurbabhaumik007/",
    stats: "500+ Problems Solved",
    color: "#FFA116",
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/profile/apurbabhahs8i?tab=activity",
    stats: "Data Structures & Algorithms",
    color: "#2F8D46",
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/profile/apurba108",
    stats: "Competitive Programming",
    color: "#1F8ACB",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/profile/apurbabhaumik007",
    stats: "Problem Solving",
    color: "#00EA64",
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/leap_reef_92",
    stats: "Contests & Challenges",
    color: "#5B4638",
  },
];

export default function CodingProfiles() {
  return (
    <section id="profiles" className="relative w-full py-32 bg-transparent overflow-hidden border-t border-border">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4 text-accent">
              <TerminalSquare size={24} />
              <h2 className="text-sm font-mono tracking-widest uppercase">Metrics & Platforms</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              The Code Matrix.
            </h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary max-w-sm text-right"
          >
            Translating logic into impact across global competitive programming platforms.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, i) => (
              <motion.a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              key={profile.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -5, borderColor: profile.color }}
              className="group relative flex flex-col justify-between h-48 p-8 bg-white/5 dark:bg-black/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden interactive transition-all duration-300 hover:shadow-2xl"
              style={{ boxShadow: `0 0 0 0 ${profile.color}00` }}
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${profile.color} 0%, transparent 70%)` }}
              />

              <div className="flex justify-between items-start z-10">
                <h4 className="text-xl font-bold text-primary transition-colors">
                  {profile.name}
                </h4>
                <ExternalLink size={20} className="text-secondary group-hover:text-primary transition-colors" />
              </div>
              
              <div className="z-10 mt-auto">
                <p className="text-sm font-mono tracking-wide text-secondary">
                  {profile.stats}
                </p>
                <div className="w-full h-1 mt-4 bg-border rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: profile.color }}
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
