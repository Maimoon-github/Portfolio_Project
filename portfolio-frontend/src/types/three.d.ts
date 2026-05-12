// src/types/three.d.ts
import { Object3D, Material, BufferGeometry } from 'three';

// Extend Three.js core types if needed for custom shader materials or global properties
declare module 'three' {
  interface ShaderMaterialParameters {
    uniforms?: Record<string, any>;
    vertexShader?: string;
    fragmentShader?: string;
  }

  // Example: Add custom property to Object3D for interactive elements
  interface Object3D {
    userData: {
      interactive?: boolean;
      originalScale?: number;
      [key: string]: unknown;
    };
  }
}

// Declare module for shader file imports (if using .glsl or .vert/.frag)
declare module '*.glsl' {
  const value: string;
  export default value;
}

declare module '*.vert' {
  const value: string;
  export default value;
}

declare module '*.frag' {
  const value: string;
  export default value;
}

// Extend @react-three/fiber's ThreeElements for custom components
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      // Add custom elements if needed, e.g., for shader materials
      shaderMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        uniforms?: Record<string, any>;
        vertexShader?: string;
        fragmentShader?: string;
      };
    }
  }
}

// Ensure this file is treated as a module
export {};