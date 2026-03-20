"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Award, ShieldCheck, Code2 } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  type: string;
  link: string;
  color: string;
  icon: React.ReactNode;
  image?: string;
}

// The user's actual certificates
const certificates: Certificate[] = [
  // Coursera
  {
    title: "Digital Systems: From Logic Gates to Processors",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/4d9d90f4838260a38706e577a26dfd66",
    color: "from-blue-600 to-blue-400",
    icon: <Award className="w-8 h-8 text-blue-400" />,
    image: "/certificates/media__1774001355570.png"
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/5b439e1b67199ea4d481793356a37a97",
    color: "from-blue-500 to-cyan-400",
    icon: <Award className="w-8 h-8 text-cyan-400" />,
    image: "/certificates/media__1774001392572.png"
  },
  {
    title: "Packet Switching Networks and Algorithms",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/6RGSNGIVTZG7", // A generic link as placeholder
    color: "from-indigo-600 to-blue-500",
    icon: <Award className="w-8 h-8 text-indigo-400" />,
    image: "/certificates/media__1774001486210.png"
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/4e55a91a3a175add8acbd120497a3534",
    color: "from-blue-700 to-indigo-500",
    icon: <Award className="w-8 h-8 text-blue-500" />,
    image: "/certificates/media__1774001553152.png"
  },
  {
    title: "Peer-to-Peer Protocols and Local Area Networks",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/F0P880YN8SBY", // A generic link as placeholder
    color: "from-cyan-600 to-blue-600",
    icon: <Award className="w-8 h-8 text-cyan-500" />,
    image: "/certificates/media__1774001614061.png"
  },
  {
    title: "Fundamentals of Network Communication",
    issuer: "Coursera",
    type: "Course Certificate",
    link: "https://coursera.org/share/7be13994f2ee220fc62631ab834ae517",
    color: "from-cyan-500 to-blue-400",
    icon: <Award className="w-8 h-8 text-cyan-400" />,
    image: "/certificates/media__1774001756012.png"
  },
  // Forage / Job Simulations
  {
    title: "Software Eng. Job Simulation",
    issuer: "Commonwealth Bank",
    type: "Virtual Experience",
    link: "https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/xv8eSGu7nksKNiCQj_2sNmYuurxgpFYawco_68f06f298e645218888d4d15_1769486594845_completion_certificate.pdf",
    color: "from-yellow-600 to-orange-500",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
    image: "/certificates/media__1774002088249.png"
  },
  {
    title: "Controllers Job Simulation",
    issuer: "Goldman Sachs",
    type: "Virtual Experience",
    link: "https://www.theforage.com/completion-certificates/MBA4MnZTNFEoJZGnk/vjFao7z4tXKe2EwvK_MBA4MnZTNFEoJZGnk_68f06f298e645218888d4d15_1769485967314_completion_certificate.pdf",
    color: "from-blue-800 to-slate-400",
    icon: <ShieldCheck className="w-8 h-8 text-slate-300" />,
    image: "/certificates/media__1774002221324.png"
  },
  {
    title: "ESG Job Simulation",
    issuer: "TCS",
    type: "Virtual Experience",
    link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/N8Muuhk6XsXgMTeu2_ifobHAoMjQs9s6bKS_68f06f298e645218888d4d15_1762444776911_completion_certificate.pdf",
    color: "from-purple-600 to-pink-500",
    icon: <ShieldCheck className="w-8 h-8 text-pink-400" />,
    image: "/certificates/media__1774002241561.png"
  },
  // HackerRank
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/3793eb59491f",
    color: "from-green-600 to-emerald-400",
    icon: <Code2 className="w-8 h-8 text-green-400" />,
    image: "/certificates/media__1774002354951.png"
  },
  {
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/b0f76c5d3569",
    color: "from-emerald-600 to-teal-400",
    icon: <Code2 className="w-8 h-8 text-emerald-400" />,
    image: "/certificates/media__1774002727300.png"
  },
  {
    title: "Java (Basic)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/2167703277ee",
    color: "from-green-700 to-green-500",
    icon: <Code2 className="w-8 h-8 text-green-500" />,
    image: "/certificates/media__1774002684919.png"
  },
  {
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/2f4400f642ca",
    color: "from-teal-600 to-green-400",
    icon: <Code2 className="w-8 h-8 text-teal-400" />,
    image: "/certificates/media__1774002743942.png"
  },
  {
    title: "SQL (Basic)",
    issuer: "HackerRank",
    type: "Assessment",
    link: "https://www.hackerrank.com/certificates/94e132733768",
    color: "from-green-500 to-teal-500",
    icon: <Code2 className="w-8 h-8 text-green-300" />,
    image: "/certificates/media__1774002704205.png"
  }
];

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
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
      className="group relative flex flex-col justify-between p-6 h-[280px] bg-card border border-border rounded-2xl interactive shadow-lg dark:shadow-2xl dark:bg-gradient-to-br dark:from-[#111] dark:to-[#050505] dark:border-white/10"
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
        className="absolute inset-1.5 border-[1px] border-border dark:border-white/10 rounded-xl bg-background/50 dark:bg-black/40 backdrop-blur-md overflow-hidden z-0"
        style={{ transform: "translateZ(10px)" }}
      >
        {cert.image ? (
          <>
            <img src={cert.image} alt={cert.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 dark:bg-white/5 blur-2xl rounded-full" />
            <div className={`absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-gradient-to-br ${cert.color} opacity-10 dark:opacity-20 blur-2xl rounded-full group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-700`} />
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none" style={{ transform: "translateZ(30px)" }}>
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${cert.color}`}></span>
            <span className="text-[10px] font-mono text-secondary dark:text-zinc-400 uppercase tracking-widest">{cert.type}</span>
          </div>
          <ExternalLink size={16} className="text-secondary group-hover:text-primary dark:text-zinc-600 dark:group-hover:text-white transition-colors" />
        </div>

        {/* Content */}
        {!cert.image && (
          <div className="flex flex-col items-center justify-center text-center my-auto px-1 pt-2">
            <div className="mb-3 transform group-hover:scale-110 transition-transform duration-500">
              {cert.icon}
            </div>
            <h4 className="text-lg font-bold text-primary dark:text-white dark:group-hover:text-transparent dark:group-hover:bg-clip-text transition-colors leading-snug" style={{ backgroundImage: "var(--theme-gradient, linear-gradient(to right, #ffffff, #a1a1aa))" }}>
              {cert.title}
            </h4>
          </div>
        )}

        {/* Footer */}
        <div className={`w-full flex items-end justify-between border-t border-border dark:border-white/10 pt-3 ${cert.image ? 'mt-auto' : 'mt-2'}`}>
          <div className="flex flex-col items-start max-w-[80%]">
            <span className="text-[10px] text-secondary dark:text-zinc-300 font-semibold mb-1 line-clamp-2 leading-tight">
              {cert.image ? cert.title : "AUTHORIZED PROVIDER"}
            </span>
            <span className="text-xs font-mono font-bold text-primary dark:text-zinc-400">{cert.issuer}</span>
          </div>
          {/* Mock seal / verification badge */}
          <div className="w-8 h-8 rounded-full border border-dashed border-border dark:border-white/20 flex items-center justify-center bg-card dark:bg-white/5 group-hover:rotate-180 transition-transform duration-1000 shrink-0">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${cert.color} opacity-80 backdrop-blur-md`}></div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function Certificates() {
  return (
    <section id="certificates" className="relative w-full py-32 bg-background overflow-hidden border-t border-border">
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
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
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
