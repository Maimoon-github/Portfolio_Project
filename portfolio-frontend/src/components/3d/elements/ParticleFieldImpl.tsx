// src/components/3d/elements/ParticleFieldImpl.tsx
'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import * as THREE from 'three';

interface ParticleFieldImplProps {
  count?: number;
  radius?: number;
  size?: number;
}

export function ParticleFieldImpl({ count = 1800, radius = 6, size = 0.06 }: ParticleFieldImplProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const prefersReduced = useReducedMotion();

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Uniform distribution in a sphere with flattened Y axis for atmospheric spread
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  });

  const primaryColor = '#5f2da6';   // --color-primary

  useFrame((_, delta) => {
    if (prefersReduced) return;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      pointsRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial
        transparent
        color={primaryColor}
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default ParticleFieldImpl;