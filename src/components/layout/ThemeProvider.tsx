"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (e: React.MouseEvent) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = (localStorage.getItem("vite-ui-theme") as Theme) || defaultTheme;
    setTheme(initialTheme);
    
    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);
  }, [defaultTheme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("vite-ui-theme", theme);
      setTheme(theme);
      
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    },
    toggleTheme: (e: React.MouseEvent) => {
      const isDark = theme === "dark";
      const newTheme = isDark ? "light" : "dark";
      
      // Feature detecting the view transition API
      if (!document.startViewTransition) {
        localStorage.setItem("vite-ui-theme", newTheme);
        setTheme(newTheme);
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
        return;
      }

      // Calculate the expanding circle radius
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        localStorage.setItem("vite-ui-theme", newTheme);
        setTheme(newTheme);
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        
        document.documentElement.animate(
          {
            clipPath: isDark ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            pseudoElement: isDark
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          }
        );
      });
    }
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
