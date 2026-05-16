// 'use client';

// import { SWRConfig } from 'swr';

// /**
//  * Client-side providers wrapper.
//  * Any context that requires the browser (SWR, auth, theme) lives here
//  * so the root layout can remain a Server Component.
//  */
// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <SWRConfig
//       value={{
//         revalidateOnFocus: false,
//         shouldRetryOnError: false,
//       }}
//     >
//       {children}
//     </SWRConfig>
//   );
// }


































// ---------------------------------------------------------------------------------------------
// =============================================================================================
// ---------------------------------------------------------------------------------------------












'use client';

import { SWRConfig } from 'swr';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
      {children}
    </SWRConfig>
  );
}