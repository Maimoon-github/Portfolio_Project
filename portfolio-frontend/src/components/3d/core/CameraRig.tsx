// src/components/3d/core/CameraRig.tsx
'use client';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';
import { cameraDefaults } from '@/lib/three';

interface CameraRigProps {
  enableOrbit?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  maxPolarAngle?: number;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
}

export function CameraRig({
  enableOrbit = true,
  autoRotate = false,
  autoRotateSpeed = 1.5,
  enableZoom = true,
  enablePan = true,
  maxPolarAngle = Math.PI / 2,
  cameraPosition = [cameraDefaults.position.x, cameraDefaults.position.y, cameraDefaults.position.z],
  cameraTarget = [cameraDefaults.target.x, cameraDefaults.target.y, cameraDefaults.target.z],
}: CameraRigProps) {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef}>
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={cameraDefaults.fov}
        near={cameraDefaults.near}
        far={cameraDefaults.far}
      />
      {enableOrbit && (
        <OrbitControls
          enableZoom={enableZoom}
          enablePan={enablePan}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          maxPolarAngle={maxPolarAngle}
          target={cameraTarget}
          enableDamping
          dampingFactor={0.05}
        />
      )}
    </group>
  );
}