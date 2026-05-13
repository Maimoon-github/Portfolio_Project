// src/components/3d/elements/AgenticGraph.tsx (wrapper)
'use client';

import dynamic from 'next/dynamic';
import type { AgenticGraphImplProps } from './AgenticGraphImpl';

const AgenticGraphImpl = dynamic(() => import('./AgenticGraphImpl').then(mod => mod.AgenticGraphImpl), {
  ssr: false,
  loading: () => null, // No HTML elements inside R3F canvas
});

export function AgenticGraph(props: AgenticGraphImplProps) {
  return <AgenticGraphImpl {...props} />;
}