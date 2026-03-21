"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Mail, Github, Linkedin, Sparkles, Phone } from "lucide-react";

// Easter Egg Component
const MatrixRain = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black cursor-none"
      onClick={onClose}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="px-6 py-3 bg-black/50 border border-green-500/50 text-green-500 font-mono animate-pulse rounded-lg backdrop-blur-sm">
          Wake up, Neo... [Click Anywhere to Exit]
        </div>
      </div>
    </motion.div>
  );
};

export default function TerminalContact() {
  const [typedKeys, setTypedKeys] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["Welcome to Apurba's terminal. Type 'help' to see available commands."]);
  const [showMatrix, setShowMatrix] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);

  // Global key listener for the "help" easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      
      const newKeys = (typedKeys + e.key).slice(-4).toLowerCase();
      setTypedKeys(newKeys);
      
      if (newKeys === "help") {
        setTerminalOpen(true);
        setTypedKeys("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedKeys]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `> ${cmd}`];

    // Helper to scroll to section
    const scrollToSection = (id: string, logMsg: string) => {
      newLogs.push(logMsg);
      setTerminalLogs(newLogs);
      setCommandInput("");
      setTimeout(() => {
        setTerminalOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    };

    switch (cmd) {
      case "help":
        newLogs.push("Available commands: about, skills, projects, education, certificates, achievements, playground, profiles, contact, matrix, clear, exit");
        break;
      case "about":
        scrollToSection("about-me", "Navigating to About section...");
        return;
      case "skills":
        scrollToSection("skills", "Navigating to Skills section...");
        return;
      case "projects":
        scrollToSection("projects", "Navigating to Projects section...");
        return;
      case "education":
        scrollToSection("education", "Navigating to Education section...");
        return;
      case "certificates":
        scrollToSection("certificates", "Navigating to Certificates section...");
        return;
      case "achievements":
        scrollToSection("achievements", "Navigating to Achievements section...");
        return;
      case "playground":
        scrollToSection("playground", "Navigating to Playground section...");
        return;
      case "profiles":
        scrollToSection("profiles", "Navigating to Coding Profiles section...");
        return;
      case "contact":
        scrollToSection("contact", "Navigating to Contact section...");
        return;
      case "matrix":
        newLogs.push("Initializing Protocol 0xM...");
        setShowMatrix(true);
        setTerminalOpen(false);
        break;
      case "clear":
        setTerminalLogs([]);
        setCommandInput("");
        return;
      case "exit":
        setTerminalOpen(false);
        setCommandInput("");
        return;
      default:
        newLogs.push(`Command not found: '${cmd}'. Type 'help' for available commands.`);
    }

    setTerminalLogs(newLogs);
    setCommandInput("");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Directly open Gmail compose window
    const subject = encodeURIComponent(`New Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:apurbabhaumik007@gmail.com?subject=${subject}&body=${body}`;
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Apurbabhaumik", icon: <Github size={20} /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/apurbabhaumik77", icon: <Linkedin size={20} /> },
  ];

  return (
    <>
      <AnimatePresence>
        {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
      </AnimatePresence>
      
      <section 
        id="contact" 
        className="relative w-full py-32 bg-background overflow-hidden flex flex-col items-center border-t border-border dark:border-white/5"
        onMouseEnter={() => setIsHoveringGrid(true)}
        onMouseLeave={() => setIsHoveringGrid(false)}
      >
        {/* Animated Background Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] transition-opacity duration-1000"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            opacity: isHoveringGrid ? 0.08 : 0.03
          }}
        />
        
        {/* Glowing Orbs Background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
          
          {/* Left Side: Contact Info & Interactive Elements */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-mono mb-8"
              >
                <Sparkles size={16} className="animate-pulse" />
                <span>Available for opportunities</span>
              </motion.div>
              
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-primary dark:text-white leading-[1.1]">
                Let's build <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary/60 dark:from-white dark:via-zinc-400 dark:to-zinc-600 block mt-2 pb-2">
                  something.
                </span>
              </h2>
              
              <p className="text-secondary dark:text-zinc-400 text-lg md:text-xl mb-12 max-w-lg font-light leading-relaxed">
                Whether it's a cutting-edge web application, an AI integration, or just tech banter — my inbox is always open.
              </p>

              <div className="space-y-8 relative">
                {/* Direct Mail Link - Interactive */}
                <motion.a 
                  href="mailto:apurbabhaumik007@gmail.com"
                  initial="initial"
                  whileHover="hover"
                  className="group relative flex items-center space-x-5 w-fit interactive p-2 pr-6 rounded-full bg-transparent hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  <motion.div 
                    variants={{
                      initial: { scale: 1, rotate: 0 },
                      hover: { scale: 1.1, rotate: -10, backgroundColor: "var(--color-primary)" }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-full bg-card dark:bg-white/10 border border-border dark:border-white/20 flex items-center justify-center transition-colors"
                  >
                    <Mail className="text-primary dark:text-white group-hover:text-background dark:group-hover:text-black transition-colors" size={24} />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xs text-secondary dark:text-zinc-500 font-mono mb-1 uppercase tracking-wider group-hover:text-accent transition-colors">Direct Email</span>
                    <span className="text-xl md:text-2xl font-medium text-primary dark:text-zinc-300 group-hover:text-background dark:group-hover:text-white transition-colors">
                      apurbabhaumik007@gmail.com
                    </span>
                  </div>
                </motion.a>

                {/* Direct Phone Link - Interactive */}
                <motion.a 
                  href="tel:+917005451814"
                  initial="initial"
                  whileHover="hover"
                  className="group relative flex items-center space-x-5 w-fit interactive p-2 pr-6 rounded-full bg-transparent hover:bg-card-hover dark:hover:bg-white/5 transition-colors border border-transparent hover:border-border dark:hover:border-white/10"
                >
                  <motion.div 
                    variants={{
                      initial: { scale: 1, rotate: 0 },
                      hover: { scale: 1.1, rotate: 10, backgroundColor: "var(--color-primary)" }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-full bg-card dark:bg-white/10 border border-border dark:border-white/20 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Phone className="text-primary dark:text-white group-hover:text-background dark:group-hover:text-black transition-colors" size={24} />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xs text-secondary dark:text-zinc-500 font-mono mb-1 uppercase tracking-wider group-hover:text-accent transition-colors">Direct Phone</span>
                    <span className="text-xl md:text-2xl font-medium text-primary dark:text-zinc-300 group-hover:text-background dark:group-hover:text-white transition-colors">
                      +91 7005451814
                    </span>
                  </div>
                </motion.a>
                
                {/* Social Links with Hover Physics */}
                <div className="flex space-x-4 pt-8 border-t border-white/10 w-full max-w-md">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05, backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-card dark:bg-white/5 border border-border dark:border-white/10 hover:text-background dark:hover:text-black transition-all duration-300 interactive group"
                    >
                      <span className="text-secondary dark:text-zinc-400 group-hover:text-background dark:group-hover:text-black transition-colors">{social.icon}</span>
                      <span className="font-mono text-sm tracking-wide font-medium text-primary dark:text-zinc-300 group-hover:text-background dark:group-hover:text-black transition-colors">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-16 flex items-center space-x-3 text-xs md:text-sm text-zinc-600 font-mono hover:text-white transition-colors interactive w-fit cursor-text select-text"
              >
                <Terminal size={14} className="animate-pulse text-accent" />
                <span>Psst... type "help" anywhere on the site.</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Interactive Sexy Contact Form */}
          <div className="flex-1 max-w-xl w-full">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent overflow-hidden group/form"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-blue-500/20 opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <form 
                className="relative bg-background/95 dark:bg-[#0a0a0a]/90 backdrop-blur-xl p-8 md:p-10 rounded-[31px] space-y-6 flex flex-col z-10 shadow-2xl"
                onSubmit={handleEmailSubmit}
              >
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-card dark:bg-white/[0.03] border border-border dark:border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-accent focus:bg-card-hover dark:focus:bg-white/[0.08] transition-all duration-300 interactive text-primary dark:text-white peer pt-7"
                    />
                    <label htmlFor="name" className={`absolute left-6 transition-all duration-300 pointer-events-none ${formData.name ? 'top-2.5 text-[10px] text-accent font-bold uppercase tracking-wider' : 'top-5.5 text-secondary dark:text-zinc-500 text-sm'} peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-accent font-mono`}>
                      Your Name
                    </label>
                  </div>
                  
                  {/* Email Input */}
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-card dark:bg-white/[0.03] border border-border dark:border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-accent focus:bg-card-hover dark:focus:bg-white/[0.08] transition-all duration-300 interactive text-primary dark:text-white peer pt-7"
                    />
                    <label htmlFor="email" className={`absolute left-6 transition-all duration-300 pointer-events-none ${formData.email ? 'top-2.5 text-[10px] text-accent font-bold uppercase tracking-wider' : 'top-5.5 text-secondary dark:text-zinc-500 text-sm'} peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-accent font-mono`}>
                      Your Email
                    </label>
                  </div>
                  
                  {/* Message Textarea */}
                  <div className="relative group">
                    <textarea 
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-card dark:bg-white/[0.03] border border-border dark:border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-accent focus:bg-card-hover dark:focus:bg-white/[0.08] transition-all duration-300 interactive text-primary dark:text-white resize-none peer pt-8 custom-scrollbar"
                    ></textarea>
                    <label htmlFor="message" className={`absolute left-6 transition-all duration-300 pointer-events-none ${formData.message ? 'top-3 text-[10px] text-accent font-bold uppercase tracking-wider' : 'top-6 text-secondary dark:text-zinc-500 text-sm'} peer-focus:top-3 peer-focus:text-[10px] peer-focus:text-accent font-mono`}>
                      Tell me about your project...
                    </label>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden rounded-2xl bg-primary dark:bg-white text-background dark:text-black font-semibold interactive flex items-center justify-center py-5 mt-4 border border-transparent shadow-lg hover:shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-300"
                  type="submit"
                >
                  <span className="relative z-10 flex items-center space-x-2 text-lg">
                    <span>Send via Gmail</span>
                    <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Easter Egg Terminal Modal */}
        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40"
              onClick={() => setTerminalOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] font-mono text-sm ring-1 ring-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-2 px-4 py-3 bg-[#111]/80 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 interactive cursor-pointer transition-colors shadow-[0_0_10px_rgba(239,68,68,0.5)]" onClick={() => setTerminalOpen(false)}></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  <span className="ml-4 text-xs text-zinc-500 flex-1 text-center pr-12">apurbabhaumik@portfolio:~</span>
                </div>
                
                <div className="p-6 h-[400px] overflow-y-auto flex flex-col bg-transparent custom-scrollbar">
                  <div className="space-y-3 mb-4">
                    {terminalLogs.map((log, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={log.startsWith(">") ? "text-accent font-semibold" : "text-zinc-300"}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                  <form onSubmit={handleCommand} className="flex mt-auto pt-4 relative border-t border-white/5">
                    <span className="text-accent font-bold mr-3">{"$"}</span>
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-white interactive placeholder-zinc-700 font-mono tracking-wider"
                      autoFocus
                      placeholder="Type a command..."
                    />
                    <div className="absolute left-[20px] top-[18px] bottom-0 w-2 h-4 bg-white/40 animate-pulse pointer-events-none" style={{ opacity: commandInput ? 0 : 1 }} />
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
