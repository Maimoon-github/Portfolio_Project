// src/components/3d/elements/AgenticGraph.tsx
'use client';

import dynamic from 'next/dynamic';
import type { AgenticGraphImplProps } from './AgenticGraphImpl';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const AgenticGraphImpl = dynamic(
  () => import('./AgenticGraphImpl').then((mod) => mod.AgenticGraphImpl),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

export function AgenticGraph(props: AgenticGraphImplProps) {
  return <AgenticGraphImpl {...props} />;
}