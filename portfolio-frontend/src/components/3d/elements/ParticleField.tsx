// src/components/3d/elements/ParticleField.tsx
'use client';

import dynamic from 'next/dynamic';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const ParticleFieldImpl = dynamic(() => import('./ParticleFieldImpl').then(mod => mod.ParticleFieldImpl), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

export function ParticleField() {
  return <ParticleFieldImpl />;
}