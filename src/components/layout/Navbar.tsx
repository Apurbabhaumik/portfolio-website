"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";
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
          <a
            href="/resume.png"
            download
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full text-xs font-medium transition-all interactive"
          >
            <Download size={14} />
            Resume
          </a>
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
                <a
                  href="/resume.png"
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-medium transition-all interactive"
                >
                  <Download size={16} />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
