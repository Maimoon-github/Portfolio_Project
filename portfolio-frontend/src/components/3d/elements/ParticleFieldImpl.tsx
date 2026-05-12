// src/components/3d/elements/ParticleFieldImpl.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import * as THREE from 'three';

interface ParticleFieldImplProps {
  count?: number;
  radius?: number;
  size?: number;
}

export function ParticleFieldImpl({
  count = 2000,
  radius = 5,
  size = 0.08,
}: ParticleFieldImplProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const prefersReduced = useReducedMotion();

  // Generate random positions inside a sphere
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Uniform distribution in sphere (reject method would be more uniform, but this is fine)
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random()); // cubic root for uniform volume
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flatten a bit
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [count, radius]);

  // TLS colours – primary (#5f2da6) and primary-light (#d6baff)
  const primaryColor = '#5f2da6';   // --color-primary
  const lightColor = '#d6baff';     // --color-primary-light

  // Optional random colour per particle (mix of both)
  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const mixFactor = Math.random();
      const r = mixFactor * 0.37 + (1 - mixFactor) * 0.84; // approximate RGB mixing (loose)
      const g = mixFactor * 0.18 + (1 - mixFactor) * 0.73;
      const b = mixFactor * 0.65 + (1 - mixFactor) * 1.0;
      cols[i * 3] = r;
      cols[i * 3 + 1] = g;
      cols[i * 3 + 2] = b;
    }
    return cols;
  }, [count]);

  // Rotate group on each frame (unless reduced motion)
  useFrame((_, delta) => {
    if (prefersReduced) return;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.2;
      pointsRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}