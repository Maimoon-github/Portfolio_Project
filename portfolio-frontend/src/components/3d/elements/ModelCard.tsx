// src/components/3d/elements/ModelCard.tsx
'use client';

import dynamic from 'next/dynamic';
import type { ModelCardImplProps } from './ModelCardImpl';

const ModelCardImpl = dynamic(
  () => import('./ModelCardImpl').then((mod) => mod.ModelCardImpl),
  {
    ssr: false,
    loading: () => null, // Return null to avoid rendering a <div> inside the R3F canvas
  }
);

export function ModelCard(props: ModelCardImplProps) {
  return <ModelCardImpl {...props} />;
}