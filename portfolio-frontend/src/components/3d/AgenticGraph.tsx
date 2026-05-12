'use client';

import dynamic from 'next/dynamic';

export const AgenticGraph = dynamic(() => import('./AgenticGraphImpl'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-surface" />,
});