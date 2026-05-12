// src/components/3d/elements/NeuralNetwork.tsx
'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import * as THREE from 'three';

interface NeuralNetworkProps {
  nodeCount?: number;
  radius?: number;
  connectionDistance?: number;
  nodeSize?: number;
}

export function NeuralNetwork({
  nodeCount = 40,
  radius = 3,
  connectionDistance = 2.2,
  nodeSize = 0.12,
}: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReduced = useReducedMotion();

  // Generate random node positions within a sphere
  const [positions] = useState(() => {
    const pos = new Array(nodeCount).fill(0).map(() => {
      // Uniform distribution in sphere using cubic root method
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.8; // flatten slightly
      const z = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    });
    return pos;
  });

  // Build edges (line segments) between nodes within distance
  const edges = useMemo(() => {
    const edgePairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < connectionDistance) {
          edgePairs.push([positions[i], positions[j]]);
        }
      }
    }
    return edgePairs;
  }, [positions, connectionDistance]);

  // Line geometry for each edge (separate LineSegments would be more efficient, but simple for demo)
  const lineGeometries = useMemo(() => {
    return edges.map(([start, end]) => {
      const points = [start, end];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    });
  }, [edges]);

  // Rotate entire network if reduced motion not requested
  useFrame((_, delta) => {
    if (prefersReduced) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  // TLS colours
  const primaryColor = '#5f2da6';     // --color-primary
  const lightColor = '#d6baff';       // --color-primary-light

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {lineGeometries.map((geom, idx) => (
        <line key={`edge-${idx}`}>
          <bufferGeometry attach="geometry" {...geom} />
          <lineBasicMaterial attach="material" color={primaryColor} transparent opacity={0.3} />
        </line>
      ))}

      {/* Nodes (spheres) */}
      {positions.map((pos, idx) => (
        <group key={`node-${idx}`} position={[pos.x, pos.y, pos.z]}>
          {/* Glow aura (optional) */}
          <Sphere args={[nodeSize * 1.8, 16, 16]}>
            <meshBasicMaterial color={lightColor} transparent opacity={0.15} />
          </Sphere>
          {/* Core node */}
          <Sphere args={[nodeSize, 24, 24]}>
            <meshStandardMaterial
              color={primaryColor}
              emissive={primaryColor}
              emissiveIntensity={0.6}
              roughness={0.3}
              metalness={0.8}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
}