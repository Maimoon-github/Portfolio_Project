// src/components/3d/core/CanvasWrapper.tsx
'use client';

import { Canvas, Props as CanvasProps } from '@react-three/fiber';
import { ReactNode, Suspense } from 'react';
import { canvasPerformanceSettings } from '@/lib/three';

interface CanvasWrapperProps extends Partial<CanvasProps> {
  children: ReactNode;
  fallback?: ReactNode;
}

export function CanvasWrapper({
  children,
  fallback = null,
  ...canvasProps
}: CanvasWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <Canvas
        shadows={canvasPerformanceSettings.shadows}
        dpr={canvasPerformanceSettings.dpr}
        gl={canvasPerformanceSettings.gl}
        {...canvasProps}
      >
        {children}
      </Canvas>
    </Suspense>
  );
}