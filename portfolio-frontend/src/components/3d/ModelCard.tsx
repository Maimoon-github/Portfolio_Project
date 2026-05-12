// src/components/3d/ModelCard.tsx
import dynamic from 'next/dynamic';

export const ModelCard = dynamic(() => import('./ModelCardImpl'), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse glass-card" />,
});