'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.1,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
