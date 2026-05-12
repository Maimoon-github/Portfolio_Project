// src/components/3d/elements/AgenticGraphImpl.tsx
'use client';

import R3fForceGraph from 'r3f-forcegraph';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Color } from 'three';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface AgenticGraphImplProps {
  nodeCount?: number;
  linkCount?: number;
}

export function AgenticGraphImpl({ nodeCount = 6, linkCount = 12 }: AgenticGraphImplProps) {
  const fgRef = useRef<any>();
  const prefersReduced = useReducedMotion();

  // --- Data Generation ---
  const nodes = [
    { id: "User", group: 0, val: 10 },
    { id: "Orchestrator", group: 1, val: 15 },
    { id: "Coder", group: 2, val: 8 },
    { id: "Reviewer", group: 2, val: 8 },
    { id: "Docs", group: 3, val: 6 },
    { id: "Researcher", group: 2, val: 9 },
  ];

  const links = [
    { source: "User", target: "Orchestrator" },
    { source: "Orchestrator", target: "Coder" },
    { source: "Orchestrator", target: "Reviewer" },
    { source: "Orchestrator", target: "Researcher" },
    { source: "Coder", target: "Orchestrator" },
    { source: "Reviewer", target: "Coder" },
    { source: "Reviewer", target: "Docs" },
    { source: "Researcher", target: "Orchestrator" },
    { source: "Docs", target: "Orchestrator" },
  ];

  const graphData = { nodes, links };

  // --- TLS Colour Palette ---
  const colors = {
    background: 0x151219,
    primary: 0x5f2da6,
    'primary-light': 0xd6baff,
    accent: 0x2dd4bf,
  };

  // --- Interaction Handlers ---
  const handleNodeClick = (node: any) => {
    // highlight connected links
    if (fgRef.current) {
      const nodeId = node.id;
      const highlightedLinks = links.map(link => {
        const isConnected = link.source.id === nodeId || link.target.id === nodeId;
        return {
          ...link,
          __highlighted: isConnected,
        };
      });
      fgRef.current.refresh({ links: highlightedLinks });
    }
  };

  // --- Frame update for physics (if needed) ---
  useFrame(() => {
    if (prefersReduced) return;
    if (fgRef.current) {
      fgRef.current.tickFrame();
    }
  });

  return (
    <R3fForceGraph
      ref={fgRef}
      graphData={graphData}
      // --- Node Styling (sphere geometry) ---
      nodeThreeObject={(node: any) => {
        const geometry = new THREE.SphereGeometry(Math.sqrt(node.val) * 0.4, 24, 24);
        const material = new THREE.MeshStandardMaterial({
          color: node.group === 1 ? colors.primary : colors.accent,
          emissive: node.group === 1 ? colors.primary : colors.accent,
          emissiveIntensity: 0.3,
          metalness: 0.7,
          roughness: 0.2,
        });
        return new THREE.Mesh(geometry, material);
      }}
      // --- Edge Styling (curved lines) ---
      linkThreeObjectExtend={true}
      linkThreeObject={(link: any) => {
        const { source, target } = link;
        const start = new THREE.Vector3(source.x, source.y, source.z);
        const end = new THREE.Vector3(target.x, target.y, target.z);
        const middle = start.clone().lerp(end, 0.5);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const right = new THREE.Vector3().crossVectors(direction, up).normalize();
        const offset = right.multiplyScalar(0.5);
        middle.add(offset);
        const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
        const geometry = new THREE.TubeGeometry(curve, 20, 0.05, 6, false);
        const material = new THREE.MeshStandardMaterial({ color: colors['primary-light'] });
        return new THREE.Mesh(geometry, material);
      }}
      // --- Layout & Interaction ---
      dagMode="lr"
      dagLevelDistance={100}
      onNodeClick={handleNodeClick}
      warmupTicks={100}
      cooldownTicks={prefersReduced ? 0 : 50}
      // --- Camera & Environment ---
      backgroundColor={new Color(colors.background)}
      showNavInfo={false}
    />
  );
}