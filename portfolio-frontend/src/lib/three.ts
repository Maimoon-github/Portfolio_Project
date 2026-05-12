// src/lib/three.ts
import { Camera, Scene, WebGLRenderer } from 'three';

/**
 * Default camera settings for immersive 3D scenes.
 * Matches portfolio aesthetic (perspective, slight tilt).
 */
export const cameraDefaults = {
  fov: 45,
  near: 0.1,
  far: 1000,
  position: { x: 0, y: 2, z: 8 },
  target: { x: 0, y: 0, z: 0 },
} as const;

/**
 * Performance options for R3F canvas.
 * Disables shadows if unnecessary, enables anti‑aliasing.
 */
export const canvasPerformanceSettings = {
  shadows: false, // Improve performance; enable selectively per scene
  dpr: [1, 2] as [number, number], // Limit pixel ratio on high‑DPI screens
  gl: { antialias: true, alpha: false },
} as const;

/**
 * Utility to resize renderer and camera on window resize.
 * @param renderer - WebGLRenderer instance
 * @param camera - PerspectiveCamera instance
 * @param container - Optional container element (defaults to window)
 */
export function handleResize(
  renderer: WebGLRenderer,
  camera: Camera,
  container?: HTMLElement
): void {
  const width = container ? container.clientWidth : window.innerWidth;
  const height = container ? container.clientHeight : window.innerHeight;

  if ('aspect' in camera && camera.isPerspectiveCamera) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  renderer.setSize(width, height);
}

/**
 * Ambient and point light setup for a balanced, futuristic look.
 * Light colors use TLS primary/accent hints.
 * @returns Array of light configurations (for R3F or vanilla Three.js)
 */
export const defaultLights = [
  {
    type: 'ambient',
    intensity: 0.5,
    color: '#ffffff',
  },
  {
    type: 'point',
    intensity: 1.2,
    position: [5, 5, 5] as [number, number, number],
    color: '#5f2da6', // --color-primary
  },
  {
    type: 'point',
    intensity: 0.8,
    position: [-3, 2, 4] as [number, number, number],
    color: '#2dd4bf', // --color-accent
  },
] as const;

/**
 * Simple helper to generate random particle positions for ParticleField.
 * @param count - Number of particles
 * @param radius - Spread radius (default 5)
 * @returns Float32Array of positions (x,y,z interleaved)
 */
export function generateParticlePositions(count: number, radius = 5): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * radius * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * radius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 1.5;
  }
  return positions;
}