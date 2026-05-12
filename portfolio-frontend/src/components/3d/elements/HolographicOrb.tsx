// src/components/3d/elements/HolographicOrb.tsx
'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import * as THREE from 'three';

interface HolographicOrbProps {
  radius?: number;
  ringRadius?: number;
  ringThickness?: number;
  particleCount?: number;
}

export function HolographicOrb({
  radius = 1.2,
  ringRadius = 1.4,
  ringThickness = 0.05,
  particleCount = 800,
}: HolographicOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringXRef = useRef<THREE.Mesh>(null);
  const ringYRef = useRef<THREE.Mesh>(null);
  const ringZRef = useRef<THREE.Mesh>(null);
  const prefersReduced = useReducedMotion();
  const [time, setTime] = useState(0);

  // Generate particle positions around the sphere
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution with some randomness in radius
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 0.3;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [particleCount, radius]);

  // TLS colours
  const primaryColor = '#5f2da6';
  const accentColor = '#2dd4bf';
  const lightColor = '#d6baff';

  useFrame((_, delta) => {
    if (prefersReduced) return;
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

    // Pulse sphere scale and emissive
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
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={lightColor} wireframe transparent opacity={0.3} />
      </mesh>

      {/* Rings */}
      <mesh ref={ringXRef}>
        <torusGeometry args={[ringRadius, ringThickness, 64, 200]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ringYRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ringRadius, ringThickness, 64, 200]} />
        <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ringZRef} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[ringRadius, ringThickness, 64, 200]} />
        <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={0.4} />
      </mesh>

      {/* Floating particles */}
      <Points positions={particlePositions}>
        <PointMaterial color={accentColor} size={0.04} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}