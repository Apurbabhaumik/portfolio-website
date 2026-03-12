"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/5 border border-white/10 text-secondary hover:text-accent transition-colors interactive flex items-center justify-center overflow-hidden relative"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute transition-all duration-500 ${
            theme === "dark" ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
          size={18}
        />
        <Moon
          className={`absolute transition-all duration-500 ${
            theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
          }`}
          size={18}
        />
      </div>
    </button>
  );
}
