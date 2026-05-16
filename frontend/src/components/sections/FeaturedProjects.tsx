// 'use client';

// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';
// import { ProjectCard } from './ProjectCard';
// import type { Project } from '@/app/types/api';

// interface FeaturedProjectsProps {
//   projects: Project[];
// }

// export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
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
//     <section className="py-24 bg-black" ref={ref}>
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <span className="w-6 h-px bg-[var(--color-accent)] opacity-60" />
//               <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
//                 Work
//               </span>
//             </div>
//             <h2 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-[var(--color-on-background)]">
//               Featured Work
//             </h2>
//           </div>
//           <Link
//             href="/projects"
//             className="hidden sm:flex items-center gap-1 text-sm text-[var(--color-outline)] hover:text-[var(--color-accent)] transition-colors"
//           >
//             All Projects <ArrowRight size={14} />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {projects.map((project, i) => (
//             <div
//               key={project.id}
//               style={{
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? 'translateY(0)' : 'translateY(24px)',
//                 transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
//               }}
//             >
//               <ProjectCard project={project} featured />
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 text-center sm:hidden">
//           <Link href="/projects" className="text-sm text-[var(--color-accent)]">
//             View all projects →
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }





















// ---------------------------------------------------------------------------
// ===========================================================================
// ---------------------------------------------------------------------------





















'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/app/components/shared/ProjectCard';
import type { Project } from '@/app/types/api';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-24 bg-black">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="eyebrow-label mb-2">Work</div>
            <h2 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-on-background">Featured Work</h2>
          </div>
          <Link href="/projects" className="hidden sm:flex items-center gap-1 text-sm text-outline hover:text-accent transition-colors">
            All Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/projects" className="text-sm text-accent">View all projects →</Link>
        </div>
      </div>
    </section>
  );
}