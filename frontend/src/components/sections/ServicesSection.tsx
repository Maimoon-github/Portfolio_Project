// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { SERVICES } from '@/app/data';
// import { Brain, GitBranch, BarChart2, Server } from 'lucide-react';

// // Map service icon strings to Lucide components
// const iconMap: Record<string, React.ReactNode> = {
//   Brain: <Brain size={20} className="text-[#A4FBCC]" />,
//   GitBranch: <GitBranch size={20} className="text-[#A4FBCC]" />,
//   BarChart2: <BarChart2 size={20} className="text-[#A4FBCC]" />,
//   Server: <Server size={20} className="text-[#A4FBCC]" />,
// };

// export function ServicesSection() {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setVisible(true);
//       },
//       { threshold: 0.15 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="py-24 bg-[#0A110C]" ref={ref}>
//       <div className="max-w-6xl mx-auto px-6">
//         {/* Section header */}
//         <div
//           className="mb-12"
//           style={{
//             opacity: visible ? 1 : 0,
//             transform: visible ? 'translateY(0)' : 'translateY(24px)',
//             transition: 'opacity 0.7s ease, transform 0.7s ease',
//           }}
//         >
//           <div className="flex items-center gap-2 mb-2">
//             <span className="w-6 h-px bg-[#A4FBCC] opacity-60" />
//             <span className="text-xs font-mono uppercase tracking-widest text-[#A4FBCC]">
//               Services
//             </span>
//           </div>
//           <h2 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-white">
//             What I Do
//           </h2>
//         </div>

//         {/* Services grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {SERVICES.map((service, i) => (
//             <div
//               key={service.id}
//               className="group relative rounded-xl p-6 flex flex-col gap-4 overflow-hidden bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)] hover:border-[rgba(164,251,204,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
//               style={{
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? 'translateY(0)' : 'translateY(20px)',
//                 transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
//               }}
//             >
//               {/* Spotlight effect on hover */}
//               <div
//                 className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 style={{
//                   background: 'radial-gradient(circle at 50% 0%, rgba(164,251,204,0.08), transparent 70%)',
//                 }}
//               />

//               {/* Icon container */}
//               <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(164,251,204,0.08)] border border-[rgba(164,251,204,0.18)]">
//                 {iconMap[service.icon] || <Brain size={20} className="text-[#A4FBCC]" />}
//               </div>

//               {/* Title */}
//               <h3 className="text-[0.95rem] font-semibold text-white leading-tight">
//                 {service.title}
//               </h3>

//               {/* Description */}
//               <p className="text-sm leading-relaxed text-[#B0C4B0]">
//                 {service.description}
//               </p>

//               {/* Bottom accent line (on hover) */}
//               <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A4FBCC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


























































'use client';

import { SERVICES } from '@/app/data';
import { Brain, GitBranch, BarChart2, Server } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={20} className="text-accent" />,
  GitBranch: <GitBranch size={20} className="text-accent" />,
  BarChart2: <BarChart2 size={20} className="text-accent" />,
  Server: <Server size={20} className="text-accent" />,
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="mb-12">
          <div className="eyebrow-label mb-2">Services</div>
          <h2 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-on-background">What I Do</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="glass-card group relative rounded-xl p-6 flex flex-col gap-4 overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center glass">
                {iconMap[service.icon] || <Brain size={20} className="text-accent" />}
              </div>
              <h3 className="text-[0.95rem] font-semibold text-on-background leading-tight">{service.title}</h3>
              <p className="text-sm leading-relaxed text-outline">{service.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}