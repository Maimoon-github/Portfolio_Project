// src/hooks/use-3d-interaction.ts
'use client';

import { useState, useEffect, useCallback, RefObject, useMemo } from 'react';
import { useMousePosition } from './use-mouse-position';

interface NormalizedMouse {
  x: number; // -1 to 1 (left to right)
  y: number; // -1 to 1 (bottom to top, inverted)
}

/**
 * Provides normalized mouse coordinates for 3D scenes.
 * Useful for camera rotation or object interaction.
 * @returns object with x and y in range [-1, 1]
 */
export function use3DMouseInteraction(): NormalizedMouse {
  const { x, y } = useMousePosition();
  const [normalized, setNormalized] = useState<NormalizedMouse>({ x: 0, y: 0 });

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const normX = (x - centerX) / centerX;
    const normY = (centerY - y) / centerY; // invert Y for 3D space
    setNormalized({ x: normX, y: normY });
  }, [x, y]);

  return normalized;
}

/**
 * Hook for raycasting and object selection in a 3D scene.
 * @param raycaster - Three.js Raycaster instance (optional, can be created inside)
 * @param objects - Array of Meshes to intersect
 * @returns current hovered object index and a handler for mouse move
 */
import { Raycaster, Vector2, Object3D, Camera } from 'three';

export function useRaycaster<T extends Object3D>(
  objects: T[],
  camera: RefObject<Camera | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>
): {
  hoveredIndex: number | null;
  onMouseMove: (event: MouseEvent) => void;
} {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const raycaster = useMemo(() => new Raycaster(), []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current || !camera.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const mouse = new Vector2(mouseX, mouseY);

      raycaster.setFromCamera(mouse, camera.current);
      const intersects = raycaster.intersectObjects(objects);

      if (intersects.length > 0) {
        const hit = intersects[0];
        const index = objects.indexOf(hit.object as T);
        setHoveredIndex(index);
      } else {
        setHoveredIndex(null);
      }
    },
    [objects, camera, canvasRef, raycaster]
  );

  return { hoveredIndex, onMouseMove };
}