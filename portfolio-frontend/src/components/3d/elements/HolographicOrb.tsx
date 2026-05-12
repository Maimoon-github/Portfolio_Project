// src/components/3d/elements/HolographicOrb.tsx
'use client';

import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import * as THREE from 'three';

interface HolographicOrbProps {
  radius?: number;
  ringRadius?: number;
  ringThickness?: number;
}

export function HolographicOrb({
  radius = 1.2,
  ringRadius = 1.4,
  ringThickness = 0.05,
}: HolographicOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringXRef = useRef<THREE.Mesh>(null);
  const ringYRef = useRef<THREE.Mesh>(null);
  const ringZRef = useRef<THREE.Mesh>(null);
  const prefersReduced = useReducedMotion();

  const [time, setTime] = useState(0);

  // TLS colours
  const primaryColor = '#5f2da6';     // --color-primary
  const accentColor = '#2dd4bf';       // --color-accent
  const lightColor = '#d6baff';        // --color-primary-light

  useFrame((_, delta) => {
    if (prefersReduced) return;
    // Update time for pulsations
    setTime((prev) => prev + delta);

    // Rotate rings
    if (ringXRef.current) {
      ringXRef.current.rotation.x += delta * 0.5;
      ringXRef.current.rotation.z += delta * 0.3;
    }
    if (ringYRef.current) {
      ringYRef.current.rotation.y += delta * 0.6;
      ringYRef.current.rotation.x += delta * 0.2;
    }
    if (ringZRef.current) {
      ringZRef.current.rotation.z += delta * 0.4;
      ringZRef.current.rotation.y += delta * 0.3;
    }

    // Pulsing sphere scale and emissive intensity
    if (sphereRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.03;
      sphereRef.current.scale.set(scale, scale, scale);
      const material = sphereRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.4 + Math.sin(time * 4) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.85}
          wireframe={false}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Wireframe overlay sphere for extra holographic effect */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={lightColor} wireframe transparent opacity={0.3} />
      </mesh>

      {/* Rings (torus) */}
      {/* Ring on X‑Y plane (tilted) */}
      <mesh ref={ringXRef}>
        <torusGeometry args={[ringRadius, ringThickness, 64, 200]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>

      {/* Ring on X‑Z plane */}
      <mesh ref={ringYRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ringRadius, ringThickness, 64, 200]} />
        <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.5} />
      </mesh>

      {/* Ring on Y‑Z plane */}
      <mesh ref={ringZRef} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[ringRadius, ringThickness, 64, 200]} />
        <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={0.4} />
      </mesh>

      {/* Floating particles (optional) */}
      <Points>
        <PointMaterial color={accentColor} size={0.03} transparent opacity={0.6} />
        {Array.from({ length: 200 }).map((_, i) => {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = radius * 1.2;
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.sin(phi) * Math.sin(theta);
          const z = r * Math.cos(phi);
          return <mesh key={i} position={[x, y, z]} />;
        })}
      </Points>
    </group>
  );
}