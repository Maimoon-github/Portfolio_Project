// src/components/3d/ModelCardImpl.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';

function LotusGem() {
  return (
    <RoundedBox args={[2, 2.4, 0.2]} radius={0.15} smoothness={4}>
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        roughness={0.2}
        transmission={0.95}
        ior={1.2}
        chromaticAberration={0.03}
        anisotropy={0.1}
        color="#5f2da6"
      />
    </RoundedBox>
  );
}

export default function ModelCardImpl() {
  return (
    <div className="h-64 w-full rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <spotLight position={[2, 2, 5]} angle={0.3} penumbra={1} intensity={0.8} />
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <LotusGem />
        </Float>
      </Canvas>
    </div>
  );
}