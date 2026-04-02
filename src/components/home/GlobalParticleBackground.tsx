"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

// Dynamically import heavy 3D models to improve Initial Load
const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
});

export default function GlobalParticleBackground() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleBackground />
      </Canvas>
    </div>
  );
}
