// src/components/3d/elements/AgenticGraph.tsx (wrapper)
'use client';

import dynamic from 'next/dynamic';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const AgenticGraphImpl = dynamic(() => import('./AgenticGraphImpl').then(mod => mod.AgenticGraphImpl), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

export function AgenticGraph(props: any) {
  return <AgenticGraphImpl {...props} />;
}