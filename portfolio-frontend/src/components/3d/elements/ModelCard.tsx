// src/components/3d/elements/ModelCard.tsx
'use client';

import dynamic from 'next/dynamic';
import type { ModelCardImplProps } from './ModelCardImpl';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const ModelCardImpl = dynamic(
  () => import('./ModelCardImpl').then((mod) => mod.ModelCardImpl),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

export function ModelCard(props: ModelCardImplProps) {
  return <ModelCardImpl {...props} />;
}