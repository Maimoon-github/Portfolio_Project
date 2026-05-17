'use client';

import { SWRConfig } from 'swr';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
      {children}
    </SWRConfig>
  );
}