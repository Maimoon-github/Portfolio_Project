// src/components/3d/AgenticGraphImpl.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Html } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

interface NodeData {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
}

const nodes: NodeData[] = [
  { id: 'orchestrator', position: [0, 1.8, 0], label: 'Agent Orchestrator', color: '#5f2da6' },
  { id: 'planner', position: [-1.8, 0, 1.2], label: 'Planner', color: '#2dd4bf' },
  { id: 'memory', position: [1.8, 0, -1.2], label: 'Vector Memory', color: '#5a358c' },
  { id: 'tool1', position: [-2.5, -1.5, -1], label: 'Web Search', color: '#7343bb' },
  { id: 'tool2', position: [2.5, -1.5, 1], label: 'Code Executor', color: '#583e7e' },
];

const edges: [string, string][] = [
  ['orchestrator', 'planner'],
  ['orchestrator', 'memory'],
  ['planner', 'tool1'],
  ['planner', 'tool2'],
  ['memory', 'tool1'],
];

function Graph() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  const edgeGeometry = useMemo(() => {
    return edges.map(([a, b]) => {
      const nodeA = nodes.find((n) => n.id === a)!;
      const nodeB = nodes.find((n) => n.id === b)!;
      return [
        new THREE.Vector3(...nodeA.position),
        new THREE.Vector3(...nodeB.position),
      ] as [THREE.Vector3, THREE.Vector3];
    });
  }, []);

  return (
    <group ref={groupRef}>
      {edgeGeometry.map((points, i) => (
        <Line key={i} points={points} color="#ffffff15" lineWidth={1} />
      ))}
      {nodes.map((node) => (
        <group key={node.id} position={node.position}>
          <Sphere
            args={[0.22, 32, 32]}
            onPointerOver={() => setHovered(node.id)}
            onPointerOut={() => setHovered(null)}
          >
            <meshStandardMaterial
              color={hovered === node.id ? '#ffffff' : node.color}
              emissive={node.color}
              emissiveIntensity={hovered === node.id ? 1 : 0.5}
              roughness={0.3}
              metalness={0.2}
            />
          </Sphere>
          <Html distanceFactor={3.5} center style={{ pointerEvents: 'none' }}>
            <span className="text-[10px] font-mono text-white bg-black/60 px-2 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
              {node.label}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function AgenticGraphImpl() {
  return (
    <Canvas camera={{ position: [0, 0.5, 6], fov: 55 }} dpr={[1, 2]} gl={{ antialias: false }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.6} />
      <Graph />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}