"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Scroll window to top on reload to prevent awkward layout snaps
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
