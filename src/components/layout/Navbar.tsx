"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X, Download, FileText, Image as ImageIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "About", href: "#about-me" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Profiles", href: "#profiles" },
  { name: "Certifications", href: "#certificates" },
  { name: "Playground", href: "#playground" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:text-accent transition-colors">
          AB<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest font-mono text-secondary hover:text-white transition-colors interactive"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="https://github.com/Apurbabhaumik" target="_blank" className="text-secondary hover:text-accent transition-colors interactive">
            <Github size={18} />
          </Link>
          <Link href="https://www.linkedin.com/in/apurbabhaumik77" target="_blank" className="text-secondary hover:text-accent transition-colors interactive">
            <Linkedin size={18} />
          </Link>
          <ThemeToggle />
          <div className="relative" onMouseLeave={() => setIsResumeOpen(false)}>
            <button
              onClick={() => setIsResumeOpen(!isResumeOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full text-xs font-medium transition-all interactive"
            >
              <Download size={14} />
              Resume
              <ChevronDown size={12} className={`transition-transform duration-300 ${isResumeOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isResumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 right-0 w-48 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl z-50"
                >
                  <div className="flex flex-col gap-1 text-black dark:text-white">
                    <a href="/resume.pdf" download className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/10 rounded-lg transition-colors">
                      <FileText size={14} className="text-red-400" />
                      PDF Document
                    </a>
                    <a href="/resume.docx" download className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/10 rounded-lg transition-colors">
                      <FileText size={14} className="text-blue-400" />
                      Word Document
                    </a>
                    <a href="/resume.png" download className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/10 rounded-lg transition-colors">
                      <ImageIcon size={14} className="text-emerald-400" />
                      Image (PNG)
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground interactive"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="flex flex-col items-center py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-mono tracking-widest uppercase text-secondary hover:text-white transition-colors interactive"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-6 pt-4 border-t border-border w-1/2 justify-center">
                <Link href="https://github.com/Apurbabhaumik" target="_blank" className="text-secondary hover:text-accent transition-colors interactive">
                  <Github size={20} />
                </Link>
                <Link href="https://www.linkedin.com/in/apurbabhaumik77" target="_blank" className="text-secondary hover:text-accent transition-colors interactive">
                  <Linkedin size={20} />
                </Link>
                <ThemeToggle />
                <div className="flex flex-col items-center gap-2 w-full">
                  <span className="text-xs text-secondary font-mono uppercase tracking-widest mb-1">Download Resume</span>
                  <div className="flex gap-2">
                    <a href="/resume.pdf" download className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium transition-all interactive hover:bg-white/20">
                      <FileText size={12} className="text-red-400" /> PDF
                    </a>
                    <a href="/resume.docx" download className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium transition-all interactive hover:bg-white/20">
                      <FileText size={12} className="text-blue-400" /> Word
                    </a>
                    <a href="/resume.png" download className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium transition-all interactive hover:bg-white/20">
                      <ImageIcon size={12} className="text-emerald-400" /> Image
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
