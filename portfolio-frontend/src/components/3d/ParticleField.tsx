// src/components/3d/ParticleField.tsx
import dynamic from 'next/dynamic';

export const ParticleField = dynamic(() => import('./ParticleFieldImpl'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-surface" />,
});