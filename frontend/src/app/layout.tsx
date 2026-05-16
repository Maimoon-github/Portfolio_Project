// import type { Metadata } from 'next';
// import '../styles/index.css';
// import { Navbar } from '@/app/components/Navbar';
// import { Footer } from '@/app/components/Footer';
// import { Providers } from '@/components/layout/providers';

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Maimoon Amin',
//     default: 'Maimoon Amin — AI Architect & MLOps Engineer',
//   },
//   description:
//     'Portfolio of Maimoon Amin — AI Agent Architect, MLOps Engineer, and Data Scientist specializing in multi-agent systems and production ML pipelines.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body style={{ background: '#081A04' }}>
//         <Providers>
//           <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <main className="flex-1 pt-24 pb-20">{children}</main>
//             <Footer />
//           </div>
//         </Providers>
//       </body>
//     </html>
//   );
// }

























// ------------------------------------------------------------------------
// ========================================================================
// ------------------------------------------------------------------------





















import type { Metadata } from 'next';
import '../styles/globals.css';        // ← changed from index.css
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/layout/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | Maimoon Amin',
    default: 'Maimoon Amin — AI Architect & MLOps Engineer',
  },
  description:
    'Portfolio of Maimoon Amin — AI Agent Architect, MLOps Engineer, and Data Scientist specializing in multi-agent systems and production ML pipelines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: '#081A04' }}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}