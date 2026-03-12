"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Award, ShieldCheck, Code2 } from "lucide-react";

// The user's actual certificates
const certificates = [
  // Coursera
  {
    title: "Digital Systems: From Logic Gates to Processors",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/4d9d90f4838260a38706e577a26dfd66",
    color: "from-blue-600 to-blue-400",
    icon: <Award className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/5b439e1b67199ea4d481793356a37a97",
    color: "from-blue-500 to-cyan-400",
    icon: <Award className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/4e55a91a3a175add8acbd120497a3534",
    color: "from-indigo-600 to-blue-500",
    icon: <Award className="w-8 h-8 text-indigo-400" />
  },
  {
    title: "Peer-to-Peer Protocols and Local Area Networks",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/203f3ed1bc85977961e72b33147ab71b",
    color: "from-blue-700 to-indigo-500",
    icon: <Award className="w-8 h-8 text-blue-500" />
  },
  {
    title: "Fundamentals of Network Communication",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/7be13994f2ee220fc62631ab834ae517",
    color: "from-cyan-600 to-blue-600",
    icon: <Award className="w-8 h-8 text-cyan-500" />
  },
  // Forage / Job Simulations
  {
    title: "Software Eng. Job Simulation",
    issuer: "Commonwealth Bank",
    type: "Virtual Experience",
    link: "https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/xv8eSGu7nksKNiCQj_2sNmYuurxgpFYawco_68f06f298e645218888d4d15_1769486594845_completion_certificate.pdf",
    color: "from-yellow-600 to-orange-500",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Controllers Job Simulation",
    issuer: "Goldman Sachs",
    type: "Virtual Experience",
    link: "https://www.theforage.com/completion-certificates/MBA4MnZTNFEoJZGnk/vjFao7z4tXKe2EwvK_MBA4MnZTNFEoJZGnk_68f06f298e645218888d4d15_1769485967314_completion_certificate.pdf",
    color: "from-blue-800 to-slate-400",
    icon: <ShieldCheck className="w-8 h-8 text-slate-300" />
  },
  {
    title: "ESG Job Simulation",
    issuer: "TCS",
    type: "Virtual Experience",
    link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/N8Muuhk6XsXgMTeu2_ifobHAoMjQs9s6bKS_68f06f298e645218888d4d15_1762444776911_completion_certificate.pdf",
    color: "from-purple-600 to-pink-500",
    icon: <ShieldCheck className="w-8 h-8 text-pink-400" />
  },
  // HackerRank
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/3793eb59491f",
    color: "from-green-600 to-emerald-400",
    icon: <Code2 className="w-8 h-8 text-green-400" />
  },
  {
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/b0f76c5d3569",
    color: "from-emerald-600 to-teal-400",
    icon: <Code2 className="w-8 h-8 text-emerald-400" />
  },
  {
    title: "Java (Basic)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/2167703277ee",
    color: "from-green-700 to-green-500",
    icon: <Code2 className="w-8 h-8 text-green-500" />
  },
  {
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/2f4400f642ca",
    color: "from-teal-600 to-green-400",
    icon: <Code2 className="w-8 h-8 text-teal-400" />
  }
];

const CertificateCard = ({ cert, index }: { cert: typeof certificates[0]; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Softer dampening for smooth luxury feel
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 });
  const scale = useSpring(isHovered ? 1.05 : 1, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const cliX = e.clientX - rect.left;
    const cliY = e.clientY - rect.top;
    mouseX.set(cliX / width - 0.5);
    mouseY.set(cliY / height - 0.5);
  };

  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col justify-between p-6 h-[280px] bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-2xl interactive shadow-xl"
    >
      {/* Dynamic Glare Overlay */}
      <motion.div
        className="absolute inset-0 z-20 rounded-xl pointer-events-none opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => {
              const xPos = (x as number + 0.5) * 100;
              const yPos = (y as number + 0.5) * 100;
              return `radial-gradient(circle at ${xPos}% ${yPos}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
            }
          ),
        }}
      />

      {/* Internal layout simulating a physical certificate border */}
      <div 
        className="absolute inset-1.5 border-[1px] border-white/10 rounded-xl bg-black/40 backdrop-blur-md overflow-hidden z-0"
        style={{ transform: "translateZ(10px)" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full" />
        <div className={`absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-gradient-to-br ${cert.color} opacity-20 blur-2xl rounded-full group-hover:opacity-40 transition-opacity duration-700`} />
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none" style={{ transform: "translateZ(30px)" }}>
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${cert.color}`}></span>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{cert.type}</span>
          </div>
          <ExternalLink size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center my-auto px-1 pt-2">
          <div className="mb-3 transform group-hover:scale-110 transition-transform duration-500">
            {cert.icon}
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text transition-colors leading-snug" style={{ backgroundImage: "linear-gradient(to right, #ffffff, #a1a1aa)" }}>
            {cert.title}
          </h4>
        </div>

        {/* Footer */}
        <div className="w-full flex items-end justify-between border-t border-white/10 pt-3 mt-2">
          <div className="flex flex-col items-start">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Authorized Provider</span>
            <span className="text-xs font-mono font-bold text-zinc-300">{cert.issuer}</span>
          </div>
          {/* Mock seal / verification badge */}
          <div className="w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center bg-white/5 group-hover:rotate-180 transition-transform duration-1000">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${cert.color} opacity-80 backdrop-blur-md`}></div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function Certificates() {
  return (
    <section id="certificates" className="relative w-full py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4 text-accent">
              <Award size={24} />
              <h2 className="text-sm font-mono tracking-widest uppercase">Continuous Learning</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Certifications & Awards.
            </h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary max-w-sm text-right"
          >
            Verified industry credentials designed to look and feel like holographic physical achievements on the web.
          </motion.p>
        </div>

        {/* Adjusting grid to make cards feel balanced depending on screen width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" style={{ perspective: "1000px" }}>
          {certificates.map((cert, i) => (
            <CertificateCard key={cert.title + i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
