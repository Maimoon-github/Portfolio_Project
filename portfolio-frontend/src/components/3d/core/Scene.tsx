// src/components/3d/core/Scene.tsx
'use client';

import { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, PointLight } from 'three';

interface SceneProps {
  children: ReactNode;
  ambientIntensity?: number;
  primaryLightIntensity?: number;
  accentLightIntensity?: number;
}

export function Scene({
  children,
  ambientIntensity = 0.5,
  primaryLightIntensity = 1.2,
  accentLightIntensity = 0.8,
}: SceneProps) {
  const primaryLightRef = useRef<PointLight>(null);
  const accentLightRef = useRef<PointLight>(null);

  // Optional subtle rotation of lights for dynamic effect (can be removed)
  useFrame(({ clock }) => {
    if (primaryLightRef.current) {
      const t = clock.getElapsedTime() * 0.2;
      primaryLightRef.current.position.x = Math.sin(t) * 2;
      primaryLightRef.current.position.z = Math.cos(t) * 3;
    }
  });

  // TLS colour values (hex) – derived from globals.css
  const primaryColor = '#5f2da6'; // --color-primary
  const accentColor = '#2dd4bf';  // --color-accent

  return (
    <>
      {/* Ambient light – soft illumination */}
      <ambientLight intensity={ambientIntensity} />

      {/* Key light (primary colour) – positioned dynamically */}
      <pointLight
        ref={primaryLightRef}
        color={primaryColor}
        intensity={primaryLightIntensity}
        distance={15}
        decay={2}
        position={[3, 4, 5]}
      />

      {/* Fill light (accent colour) – static for contrast */}
      <pointLight
        ref={accentLightRef}
        color={accentColor}
        intensity={accentLightIntensity}
        distance={12}
        decay={2}
        position={[-3, 2, 4]}
      />

      {/* Optional helper: a subtle back rim light */}
      <pointLight
        color="#ffffff"
        intensity={0.4}
        distance={10}
        position={[0, 2, -5]}
      />

      {children}
    </>
  );
}