"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

function Particles({ imageUrl }: { imageUrl: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const [particleData, setParticleData] = useState<{ positions: Float32Array; colors: Float32Array; originalPositions: Float32Array } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Adjust particle density based on desired quality (100 = 10,000 points)
      const gridX = 120;
      const aspect = img.height / img.width;
      const gridY = Math.floor(gridX * aspect);

      canvas.width = gridX;
      canvas.height = gridY;

      // Draw image to internal canvas to read pixels
      ctx.drawImage(img, 0, 0, gridX, gridY);
      const imgData = ctx.getImageData(0, 0, gridX, gridY).data;

      const positions = new Float32Array(gridX * gridY * 3);
      const originalPositions = new Float32Array(gridX * gridY * 3);
      const colors = new Float32Array(gridX * gridY * 3);

      let i = 0;

      for (let y = 0; y < gridY; y++) {
        for (let x = 0; x < gridX; x++) {
          const px = (x * 4) + y * (gridX * 4);
          
          // Grayscale the image for the cyberpunk aesthetic
          const brightness = (imgData[px] * 0.299 + imgData[px + 1] * 0.587 + imgData[px + 2] * 0.114) / 255;
          const r = brightness;
          const g = brightness;
          const b = brightness;

          // Spatial mapping
          const size = 0.05; // Gap between points
          const posX = (x - gridX / 2) * size;
          const posY = -(y - gridY / 2) * size; // Invert Y
          const posZ = 0;

          positions[i] = posX;
          positions[i + 1] = posY;
          positions[i + 2] = posZ;

          originalPositions[i] = posX;
          originalPositions[i + 1] = posY;
          originalPositions[i + 2] = posZ;

          // Tinting slightly blue/accent
          colors[i] = r * 0.6;
          colors[i + 1] = g * 0.8;
          colors[i + 2] = b * 1.0;

          i += 3;
        }
      }

      setParticleData({ positions, colors, originalPositions });
    };
  }, [imageUrl]);

  useFrame(() => {
    if (!pointsRef.current || !particleData) return;
    
    // Mouse coords to scene coords conversion
    const mwX = (mouse.x * viewport.width) / 2;
    const mwY = (mouse.y * viewport.height) / 2;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const original = particleData.originalPositions;
    
    for (let i = 0; i < positions.length; i += 3) {
      const origX = original[i];
      const origY = original[i+1];
      const origZ = original[i+2];

      const dx = mwX - positions[i];
      const dy = mwY - positions[i+1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 1.0; 

      if (dist < maxDist) {
        // Scatter / Push effect
        const force = (maxDist - dist) / maxDist;
        positions[i] -= (dx / dist) * force * 0.15;
        positions[i+1] -= (dy / dist) * force * 0.15;
        positions[i+2] += (Math.random() - 0.5) * force * 0.5; // push outward
      } else {
        // Elastic snap back to original position
        positions[i] += (origX - positions[i]) * 0.1;
        positions[i+1] += (origY - positions[i+1]) * 0.1;
        positions[i+2] += (origZ - positions[i+2]) * 0.1;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!particleData) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={0xffffff}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function ParticlePhoto() {
  return (
    <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] rounded-md overflow-hidden border border-white/10 group bg-background/50">
      
       <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="z-10">
          <ambientLight intensity={0.5} />
          <Particles imageUrl="/profile.jpeg" />
       </Canvas>
       
       <div className="absolute top-4 left-4 font-mono text-xs text-secondary opacity-20 group-hover:opacity-100 transition-opacity z-20 pointer-events-none uppercase tracking-widest">
          SYSTEM_PARTICLE_RENDER
       </div>
       
       {/* Accents */}
       <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary opacity-50 z-20 group-hover:opacity-100 transition-opacity" />
       <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary opacity-50 z-20 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
