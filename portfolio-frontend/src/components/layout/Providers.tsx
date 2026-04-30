// src/components/layout/Providers.tsx
// Client boundary that wraps global context providers.
// Extend here as the app grows (e.g. ThemeProvider, QueryClientProvider).

'use client';

import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // ─── Add providers here as the project scales ─────────────────────────────
  // e.g.  <ThemeProvider> <QueryClientProvider> {children} </QueryClientProvider> </ThemeProvider>
  return <>{children}</>;
}