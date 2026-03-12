"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ParticleBackground() {
  const ref = useRef<THREE.Points>(null);

  const count = 5000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 5 + Math.pow(Math.random(), 3) * 10;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  const { pointer, clock } = useThree();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.05;
      ref.current.rotation.z = clock.elapsedTime * 0.02;

      const targetX = pointer.x * 2;
      const targetY = pointer.y * 2;
      
      ref.current.position.x += (targetX - ref.current.position.x) * delta;
      ref.current.position.y += (targetY - ref.current.position.y) * delta;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffcc"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
