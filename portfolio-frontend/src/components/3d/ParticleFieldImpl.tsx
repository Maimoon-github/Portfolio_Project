// src/components/3d/ParticleFieldImpl.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

function DataStream() {
  const ref = useRef<THREE.Points>(null!);
  const count = 2000;

  // Memoized positions – never recalculated
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12;               // x
      pos[i + 1] = (Math.random() - 0.5) * 12;           // y
      pos[i + 2] = (Math.random() - 0.5) * 12;           // z
    }
    return [pos];
  }, []);

  // Low‑cost continuous rotation
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2dd4bf"                // Neo-Mint (accent) → neon cyan-glow
        size={0.025}
        sizeAttenuation
        depthWrite={false}             // no depth buffer – improves performance
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticleFieldImpl() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      dpr={[1, 2]}                     // capped pixel ratio
      gl={{ antialias: false, alpha: true }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <ambientLight intensity={0.4} />
      <DataStream />
    </Canvas>
  );
}