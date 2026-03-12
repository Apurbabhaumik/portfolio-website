"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Terminal, Send, ArrowRight } from "lucide-react";

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

  // Global key listener for the "help" easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside an input
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

    switch (cmd) {
      case "help":
        newLogs.push("Available commands: about, skills, contact, matrix, clear, exit");
        break;
      case "about":
        newLogs.push("Apurba Bhaumik - Full Stack Developer. Passionate about DSA and AI systems.");
        break;
      case "skills":
        newLogs.push("React.js, Node.js, Express, MongoDB, Java, C++, TypeScript");
        break;
      case "contact":
        newLogs.push("Email: apurbabhaumik007@gmail.com | LinkedIn: /in/apurbabhaumik77");
        break;
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

  const copyEmail = () => {
    navigator.clipboard.writeText("apurbabhaumik007@gmail.com");
    alert("Email copied to clipboard!");
  };

  return (
    <>
      <AnimatePresence>
        {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
      </AnimatePresence>
      
      <section id="contact" className="relative w-full py-32 bg-background overflow-hidden flex flex-col items-center">
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row justify-between gap-16">
          
          {/* Left Side: Contact Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Let's <span className="text-secondary italic font-light">Connect.</span>
              </h2>
              <p className="text-secondary text-lg mb-12 max-w-md">
                Whether it's a new project, a job opportunity, or just talking about tech — I'm always open to connecting.
              </p>

              <div className="space-y-6">
                <button 
                  onClick={copyEmail}
                  className="group flex items-center space-x-4 text-2xl font-medium interactive hover:text-accent transition-colors"
                >
                  <span>apurbabhaumik007@gmail.com</span>
                  <Copy className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </button>
                
                <div className="flex space-x-8 pt-8 border-t border-border">
                  <a href="https://github.com/Apurbabhaumik" target="_blank" className="text-secondary hover:text-white interactive transition-colors uppercase font-mono tracking-widest text-sm">GitHub</a>
                  <a href="https://www.linkedin.com/in/apurbabhaumik77" target="_blank" className="text-secondary hover:text-white interactive transition-colors uppercase font-mono tracking-widest text-sm">LinkedIn</a>
                </div>
              </div>

              <div className="mt-16 flex items-center space-x-3 text-sm text-secondary font-mono">
                <Terminal size={16} />
                <span>Psst... type "help" anywhere on the site.</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="flex-1 max-w-lg w-full">
            <motion.form 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 bg-card/10 backdrop-blur-xl border border-border/50 p-8 rounded-3xl"
              onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out!"); }}
            >
              <div className="group">
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-accent transition-colors interactive placeholder-zinc-500"
                />
              </div>
              <div className="group">
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-accent transition-colors interactive placeholder-zinc-500"
                />
              </div>
              <div className="group pt-4">
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-accent transition-colors interactive resize-none placeholder-zinc-500"
                ></textarea>
              </div>
              <button 
                className="w-full group relative flex items-center justify-between px-6 py-4 bg-white text-black font-semibold rounded-xl interactive hover:bg-zinc-200 transition-colors mt-8"
                type="submit"
              >
                <span>Send Message</span>
                <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          </div>
        </div>

        {/* Easter Egg Terminal Modal */}
        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setTerminalOpen(false)}
            >
              <div 
                className="w-full max-w-2xl bg-[#0c0c0c] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-mono text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-2 px-4 py-3 bg-[#111] border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500 interactive cursor-pointer" onClick={() => setTerminalOpen(false)}></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs text-secondary">apurbabhaumik@portfolio:~</span>
                </div>
                
                <div className="p-4 h-80 overflow-y-auto flex flex-col bg-black/50">
                  <div className="space-y-2 mb-4">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className={log.startsWith(">") ? "text-accent" : "text-zinc-300"}>
                        {log}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleCommand} className="flex mt-auto">
                    <span className="text-accent mr-2">{"$"}</span>
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-zinc-100 interactive"
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
