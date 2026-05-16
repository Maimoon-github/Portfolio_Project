// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';
// import { PROFILE } from '@/app/data';
// import { TypingText } from './TypingText';
// import { TerminalPanel } from '../shared/TerminalPanel';

// export function HeroSection() {
//   const [heroMounted, setHeroMounted] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setHeroMounted(true), 60);
//     return () => clearTimeout(t);
//   }, []);

//   const heroFade = (delay = 0): React.CSSProperties => ({
//     opacity: heroMounted ? 1 : 0,
//     transform: heroMounted ? 'translateY(0)' : 'translateY(20px)',
//     transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
//   });

//   return (
//     <section
//       className="relative min-h-screen flex flex-col justify-center overflow-hidden"
//       style={{
//         background: '#0A110C',
//         backgroundImage: `
//           linear-gradient(rgba(164,251,204,0.03) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(164,251,204,0.03) 1px, transparent 1px)
//         `,
//         backgroundSize: '40px 40px',
//         animation: 'gridPan 18s linear infinite',
//       }}
//     >
//       {/* Orbs with mint/forest glow */}
//       <div
//         className="absolute pointer-events-none"
//         style={{
//           top: '38%', left: '32%', width: '720px', height: '720px',
//           borderRadius: '50%',
//           background: 'radial-gradient(circle, rgba(164,251,204,0.08) 0%, transparent 65%)',
//           filter: 'blur(52px)',
//           animation: 'orb1Drift 11s ease-in-out infinite',
//           transform: 'translate(-50%,-50%)',
//         }}
//       />
//       <div
//         className="absolute pointer-events-none"
//         style={{
//           top: '62%', right: '-6%', width: '460px', height: '460px',
//           borderRadius: '50%',
//           background: 'radial-gradient(circle, rgba(164,251,204,0.05) 0%, transparent 70%)',
//           filter: 'blur(64px)',
//           animation: 'orb2Drift 14s ease-in-out infinite',
//         }}
//       />

//       <div className="relative max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         {/* Left column */}
//         <div>
//           {/* Status badge */}
//           <div style={heroFade(0.05)} className="mb-8">
//             <div
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
//               style={{
//                 background: 'rgba(164,251,204,0.08)',
//                 border: '1px solid rgba(164,251,204,0.35)',
//               }}
//             >
//               <span className="relative w-2 h-2">
//                 <span className="absolute inset-0 rounded-full bg-[#A4FBCC] opacity-40 animate-ping" />
//                 <span className="relative block w-2 h-2 rounded-full bg-[#A4FBCC] shadow-[0_0_7px_#A4FBCC]" />
//               </span>
//               <span className="text-[0.7rem] font-mono tracking-wide text-[#A4FBCC]">
//                 Available for new projects — Q2 2025
//               </span>
//             </div>
//           </div>

//           <h1
//             style={heroFade(0.14)}
//             className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight text-white max-w-[560px]"
//           >
//             {PROFILE.name}
//             <br />
//             <TypingText
//               texts={[
//                 'AI Agent Architect',
//                 'MLOps Engineer',
//                 'Data Scientist',
//                 'Agentic Workflow Designer',
//               ]}
//             />
//           </h1>

//           <p
//             style={heroFade(0.25)}
//             className="text-[clamp(0.93rem,1.35vw,1.05rem)] leading-relaxed text-[#B0C4B0] max-w-[470px] mt-6 mb-10"
//           >
//             {PROFILE.tagline} Specializing in multi-agent systems, production
//             MLOps pipelines, and end-to-end AI workflow automation — from
//             research to scale.
//           </p>

//           <div style={heroFade(0.35)} className="flex flex-wrap gap-3 mb-10">
//             <Link
//               href="/projects"
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm bg-[#A4FBCC] text-[#0A2E1A] hover:opacity-85 transition-transform hover:-translate-y-0.5"
//             >
//               View Projects <ArrowRight size={16} />
//             </Link>
//             <Link
//               href="/blog"
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm text-[#A4FBCC] border border-[rgba(164,251,204,0.3)] hover:bg-[rgba(164,251,204,0.08)] transition-all hover:-translate-y-0.5"
//             >
//               Read the Blog
//             </Link>
//           </div>

//           <div style={heroFade(0.42)} className="w-9 h-px bg-[rgba(164,251,204,0.25)] mb-6" />

//           <div style={heroFade(0.48)} className="flex items-center gap-4">
//             <span className="text-xs font-mono text-[#8CAF8C]">Find me on</span>
//             {[
//               { href: PROFILE.github, icon: Github, label: 'GitHub' },
//               { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
//               { href: PROFILE.twitter, icon: Twitter, label: 'Twitter' },
//             ].map((social) => (
//               <a
//                 key={social.label}
//                 href={social.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#8CAF8C] hover:text-[#A4FBCC] transition-all hover:-translate-y-0.5"
//                 aria-label={social.label}
//               >
//                 <social.icon size={16} />
//               </a>
//             ))}
//           </div>

//           {/* Stats strip */}
//           <div
//             style={heroFade(0.55)}
//             className="flex gap-7 items-center mt-12 pt-8 border-t border-[rgba(164,251,204,0.12)]"
//           >
//             {[
//               { value: '15+', label: 'AI Systems' },
//               { value: '40+', label: 'Models Deployed' },
//               { value: '5+', label: 'Years Production AI' },
//             ].map((stat, i) => (
//               <div key={i} className="flex flex-col gap-0.5">
//                 <span className="text-[clamp(1.3rem,2vw,1.6rem)] font-bold text-[#A4FBCC] leading-none">
//                   {stat.value}
//                 </span>
//                 <span className="text-[0.67rem] font-mono text-[#8CAF8C]">
//                   {stat.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right column – TerminalPanel */}
//         <div style={heroFade(0.3)} className="relative">
//           <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-[rgba(164,251,204,0.25)] rounded-tr-lg pointer-events-none" />
//           <div className="absolute -bottom-7 -left-4 w-16 h-16 border-b border-l border-[rgba(164,251,204,0.25)] rounded-bl-lg pointer-events-none" />
//           <TerminalPanel />
//           <div className="flex justify-end gap-2 mt-3">
//             {[
//               { dot: '#A4FBCC', label: 'Production Ready' },
//               { dot: '#8CAF8C', label: 'Open to Collab' },
//             ].map((p) => (
//               <div
//                 key={p.label}
//                 className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(27,48,34,0.6)] border border-[rgba(164,251,204,0.15)]"
//               >
//                 <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.dot }} />
//                 <span className="text-[0.6rem] font-mono text-[#B0C4B0]">
//                   {p.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <div
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
//         style={{ opacity: heroMounted ? 0.55 : 0, transition: 'opacity 1.1s ease 1.2s' }}
//       >
//         <span className="text-xs font-mono tracking-[0.1em] text-[#8CAF8C]">scroll</span>
//         <ChevronDown size={14} className="text-[#8CAF8C] animate-bounce" />
//       </div>

//       <style jsx global>{`
//         @keyframes orb1Drift {
//           0%,100% { transform: translate(-50%,-50%) scale(1); }
//           55% { transform: translate(-47%,-53%) scale(1.09); }
//         }
//         @keyframes orb2Drift {
//           0%,100% { transform: translate(0,0) scale(1); }
//           60% { transform: translate(16px,-22px) scale(1.13); }
//         }
//         @keyframes gridPan {
//           0% { background-position: 0 0; }
//           100% { background-position: 40px 40px; }
//         }
//       `}</style>
//     </section>
//   );
// }
































































'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { PROFILE } from '@/app/data';
import { TypingText } from '@/app/components/shared/TypingText';
import { TerminalPanel } from '@/app/components/shared/TerminalPanel';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-accent opacity-40 animate-ping" />
                <span className="relative block w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-[0.7rem] font-mono tracking-wide text-accent">Available for new projects — Q2 2025</span>
            </div>
          </div>

          <h1 className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight text-on-background max-w-[560px]">
            {PROFILE.name}<br />
            <TypingText texts={['AI Agent Architect', 'MLOps Engineer', 'Data Scientist', 'Agentic Workflow Designer']} />
          </h1>

          <p className="text-[clamp(0.93rem,1.35vw,1.05rem)] leading-relaxed text-outline max-w-[470px] mt-6 mb-10">
            {PROFILE.tagline} Specializing in multi-agent systems, production MLOps pipelines, and end-to-end AI workflow automation — from research to scale.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/projects" className="glass-btn bg-accent text-on-accent font-bold inline-flex items-center gap-2 px-6 py-3 rounded-lg">
              View Projects <ArrowRight size={16} />
            </Link>
            <Link href="/blog" className="glass-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg text-accent border border-glass-border hover:bg-accent/10">
              Read the Blog
            </Link>
          </div>

          <div className="w-9 h-px bg-accent/25 mb-6" />

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-outline">Find me on</span>
            {[
              { href: PROFILE.github, icon: Github, label: 'GitHub' },
              { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: PROFILE.twitter, icon: Twitter, label: 'Twitter' },
            ].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-accent transition-all hover:-translate-y-0.5">
                <social.icon size={16} />
              </a>
            ))}
          </div>

          <div className="flex gap-7 items-center mt-12 pt-8 border-t border-accent/10">
            {[
              { value: '15+', label: 'AI Systems' },
              { value: '40+', label: 'Models Deployed' },
              { value: '5+', label: 'Years Production AI' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[clamp(1.3rem,2vw,1.6rem)] font-bold text-accent leading-none">{stat.value}</span>
                <span className="text-[0.67rem] font-mono text-outline">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-accent/25 rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-7 -left-4 w-16 h-16 border-b border-l border-accent/25 rounded-bl-lg pointer-events-none" />
          <TerminalPanel />
          <div className="flex justify-end gap-2 mt-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-[0.6rem] font-mono text-outline">Production Ready</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
              <span className="w-1.5 h-1.5 rounded-full bg-outline" />
              <span className="text-[0.6rem] font-mono text-outline">Open to Collab</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-xs font-mono tracking-[0.1em] text-outline">scroll</span>
        <ChevronDown size={14} className="text-outline animate-bounce" />
      </div>
    </section>
  );
}