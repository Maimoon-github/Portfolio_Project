// src/components/3d/elements/ParticleField.tsx
'use client';

import dynamic from 'next/dynamic';

const ParticleFieldImpl = dynamic(() => import('./ParticleFieldImpl').then(mod => mod.ParticleFieldImpl), {
  ssr: false,
  loading: () => null, // No HTML elements inside R3F canvas
});

export function ParticleField() {
  return <ParticleFieldImpl />;
}