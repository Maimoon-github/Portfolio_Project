// src/components/3d/elements/ModelCardImpl.tsx
'use client';

import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { ReactNode } from 'react';

// @theme tokens referenced as hex literals (documented)
const TLS = {
  primary: '#5f2da6',    // --color-primary
  accent: '#2dd4bf',     // --color-accent
  primaryLight: '#d6baff', // --color-primary-light
  background: '#151219', // --color-background
  surface: '#221e26',    // --color-surface-container
} as const;

export interface ModelCardImplProps {
  framework: 'langgraph' | 'autogen' | 'crewai';
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}

// src/components/3d/elements/ModelCardImpl.tsx (updated framework configurations)
export const FRAMEWORK_CONFIG = {
  langgraph: {
    baseColor: '#5f2da6',          // --color-primary
    emissiveColor: '#d6baff',      // --color-primary-light
    borderColor: '#8b65bf',        // Mystical Black Lotus Stop 3
    themeHex: '#5F2DA6',
    // LangGraph-specific: Durable execution + HITL + Memory + Production
    floatingOrbitConfig: { count: 8, radius: 1.15, size: 0.055 }
  },
  autogen: {
    baseColor: '#4e3473',          // --color-secondary equivalent
    emissiveColor: '#cdadff',      // --color-on-primary-container
    borderColor: '#7343bb',        // --color-inverse-primary
    themeHex: '#4E3473',
    // AutoGen-specific: Multi-party conversational + event‑driven
    floatingRingsConfig: { radius: 1.25, tube: 0.022 }
  },
  crewai: {
    baseColor: '#583e7e',          // --color-tertiary
    emissiveColor: '#ccaef6',      // --color-on-tertiary-container
    borderColor: '#8b65bf',        // Mystical Black Lotus Stop 3
    themeHex: '#583E7E',
    // CrewAI-specific: Role‑playing teams + enterprise observability
    orbitingNodesConfig: { count: 4, radius: 1.2, size: 0.07 }
  }
} as const;

/**
 * Renders an individual 3D Model Card panel for an AI Agent Framework.
 */
export function ModelCardImpl({
  framework = 'langgraph',
  title,
  description,
  features,
  icon,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 2.2,
  height = 2.8,
  depth = 0.2,
}: ModelCardImplProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hoverRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  // Assign visual theme per framework
  const themeMap = {
    langgraph: {
      baseColor: TLS.primary,
      accentColor: TLS.accent,
      glowColor: TLS.primaryLight,
      glowIntensity: 0.6,
    },
    autogen: {
      baseColor: '#4e3473', // Mid Violet approximation
      accentColor: '#f5a623', // Amber / orange tone
      glowColor: '#a07ad2',
      glowIntensity: 0.5,
    },
    crewai: {
      baseColor: '#2dd4bf', // Accent mint
      accentColor: '#6b21a5',
      glowColor: '#8b65bf',
      glowIntensity: 0.5,
    },
  } as const;

  const theme = themeMap[framework];

  // dynamic floating hover (small z‑axis shift) + glow intensity modulation
  useFrame((_, delta) => {
    if (prefersReduced) return;
    if (meshRef.current) {
      const targetZ = hovered ? position[2] + 0.08 : position[2];
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.12;
    }
    if (hoverRef.current && meshRef.current) {
      const glowMat = hoverRef.current.material as THREE.MeshStandardMaterial;
      if (glowMat) {
        glowMat.emissiveIntensity += (theme.glowIntensity * (hovered ? 0.25 : 0.1) - glowMat.emissiveIntensity) * 0.1;
      }
    }
  });

  // card panel geometry (glass-morphism + glowing border/edge)
  return (
    <group position={position} rotation={rotation}>
      {/* Main card body */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={theme.baseColor}
          emissive={theme.glowColor}
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Glowing edge highlight (thin box outline) */}
      <mesh ref={hoverRef} scale={[1.02, 1.02, 1.02]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={theme.accentColor}
          emissive={theme.accentColor}
          emissiveIntensity={theme.glowIntensity}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Floating decorative elements based on framework */}
      {framework === 'langgraph' && (
        <group>
          {[...Array(8)].map((_, idx) => {
            const angle = (idx / 8) * Math.PI * 2;
            const rad = 1.1;
            return (
              <mesh key={idx} position={[Math.cos(angle) * rad, Math.sin(angle) * rad, depth + 0.05]}>
                <sphereGeometry args={[0.055, 12, 12]} />
                <meshStandardMaterial color={TLS.accent} emissive={TLS.accent} emissiveIntensity={0.3} />
              </mesh>
            );
          })}
          {/* floating abstract lines */}
          <mesh position={[0, 0, depth + 0.1]}>
            <torusGeometry args={[0.9, 0.012, 32, 100]} />
            <meshStandardMaterial color={TLS.primaryLight} emissive={TLS.primaryLight} emissiveIntensity={0.2} />
          </mesh>
        </group>
      )}

      {framework === 'autogen' && (
        <group>
          <mesh position={[0.4, 0.6, depth + 0.08]}>
            <sphereGeometry args={[0.09, 24, 24]} />
            <meshStandardMaterial color={theme.accentColor} emissive={theme.accentColor} emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[-0.5, -0.4, depth + 0.08]}>
            <boxGeometry args={[0.14, 0.14, 0.05]} />
            <meshStandardMaterial color={theme.accentColor} emissive={theme.accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
      )}

      {framework === 'crewai' && (
        <group>
          {[...Array(6)].map((_, idx) => {
            const angle = (idx / 6) * Math.PI * 2;
            const rad = 1.0;
            return (
              <mesh key={idx} position={[Math.cos(angle) * rad, Math.sin(angle) * rad, depth + 0.07]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshStandardMaterial color={TLS.primary} emissive={TLS.primary} emissiveIntensity={0.15} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* HTML Overlay – information panel */}
      <Html
        position={[0, 0, depth + 0.11]}
        center
        transform
        style={{
          pointerEvents: 'none',
          width: `${width * 0.92 * 100}px`,
          maxWidth: '260px',
          background: 'rgba(21, 18, 25, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(139, 101, 191, 0.3)',
          borderRadius: '12px',
          padding: '12px 14px',
          color: 'var(--color-on-background)',
          fontFamily: 'var(--font-sans)',
          transition: 'opacity 0.2s ease',
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[var(--text-h3)] font-semibold tracking-tight" style={{ fontSize: '1.4rem' }}>
              {title}
            </h3>
            <span className="text-[var(--color-primary-light)] text-sm font-mono uppercase tracking-wide">
              {framework}
            </span>
          </div>
          <p className="text-[var(--text-body-md)] leading-relaxed text-[var(--color-on-background)]/80">
            {description}
          </p>
          <ul className="mt-1 space-y-1">
            {features.map((feat, idx) => (
              <li key={idx} className="text-xs flex items-start gap-1.5 font-mono text-[var(--color-on-background)]/70">
                <span className="text-[var(--color-accent)] select-none">▹</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-end">
            <span className="text-[var(--color-accent-muted)] text-[10px] tracking-wider font-mono">
              AGENT FRAMEWORK
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}