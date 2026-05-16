// import { ProjectDetail } from '@/app/pages/ProjectDetail';

// // generateMetadata provides per-project SEO titles
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   return {
//     title: slug
//       .split('-')
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//       .join(' '),
//   };
// }

// export default async function ProjectDetailPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   // params must be awaited in Next.js 15
//   const { slug } = await params;
//   return <ProjectDetail slug={slug} />;
// }


























// 'use client';

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   ArrowUpRight,
//   Github,
//   Calendar,
//   User,
//   Clock,
//   CheckCircle2,
//   ExternalLink,
//   Tag,
// } from "lucide-react";
// import { ProjectCard } from "../components/ProjectCard";
// import { getProject, getProjects } from "../services/api";
// import { ProjectDetail as Project } from "../types/api";

// // ─── Page styles ───────────────────────────────────────────────────────────────
// const DETAIL_STYLES = `
//   @keyframes detailFade {
//     from { opacity: 0; transform: translateY(14px); }
//     to   { opacity: 1; transform: translateY(0);    }
//   }
//   .detail-fade {
//     animation: detailFade 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
//     opacity: 0;
//   }

//   /* Subtle diagonal texture on page background */
//   .detail-page-bg::before {
//     content: '';
//     position: fixed;
//     inset: 0;
//     pointer-events: none;
//     background-image: repeating-linear-gradient(
//       45deg,
//       rgba(164,251,204,0.015) 0px,
//       rgba(164,251,204,0.015) 1px,
//       transparent 1px,
//       transparent 9px
//     );
//     z-index: 0;
//   }
//   .detail-page-bg > * { position: relative; z-index: 1; }

//   /* Glowing left border on section headings */
//   .section-heading {
//     border-left: 3px solid #A4FBCC;
//     padding-left: 12px;
//     color: #F2F2F2;
//     font-size: 1.05rem;
//     font-weight: 600;
//   }

//   /* Sticky sidebar on lg+ */
//   @media (min-width: 1024px) {
//     .detail-sidebar {
//       position: sticky;
//       top: 96px;
//       max-height: calc(100vh - 112px);
//       overflow-y: auto;
//       scrollbar-width: none;
//     }
//     .detail-sidebar::-webkit-scrollbar { display: none; }
//   }
// `;

// // ─── Loading state ─────────────────────────────────────────────────────────────
// function LoadingState() {
//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center gap-5"
//       style={{ background: "#081A04" }}
//     >
//       <div
//         className="w-14 h-14 rounded-full border-4 border-[#1B3022] animate-spin"
//         style={{ borderTopColor: "#A4FBCC" }}
//       />
//       <p style={{ color: "#9199A5", fontSize: "0.85rem", fontFamily: "'Space Mono', monospace" }}>
//         Loading project…
//       </p>
//     </div>
//   );
// }

// // ─── Not found state ───────────────────────────────────────────────────────────
// function NotFoundState() {
//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center gap-4"
//       style={{ background: "#081A04" }}
//     >
//       <span style={{ color: "#9199A5", fontSize: "0.9rem" }}>Project not found.</span>
//       <Link
//         href="/projects"
//         className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
//         style={{
//           color: "#A4FBCC",
//           textDecoration: "none",
//           border: "1px solid rgba(164,251,204,0.25)",
//           transition: "background 0.2s ease",
//         }}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.background = "rgba(164,251,204,0.06)")
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.background = "transparent")
//         }
//       >
//         <ArrowLeft size={13} /> Back to Projects
//       </Link>
//     </div>
//   );
// }

// // ─── Sidebar card ──────────────────────────────────────────────────────────────
// interface SidebarProps {
//   project: Project;
// }

// function ProjectSidebar({ project }: SidebarProps) {
//   const meta = [
//     { icon: <User size={13} />, label: "Role", value: project.role },
//     { icon: <Clock size={13} />, label: "Timeline", value: project.timeline },
//     { icon: <Calendar size={13} />, label: "Year", value: String(project.year) },
//   ].filter((m) => m.value);

//   return (
//     <aside className="detail-sidebar flex flex-col gap-4">
//       {/* Metadata card */}
//       <div
//         className="rounded-xl p-5 flex flex-col gap-4"
//         style={{
//           background: "#1B3022",
//           border: "1px solid rgba(164,251,204,0.12)",
//         }}
//       >
//         <h3
//           className="text-xs uppercase tracking-widest"
//           style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
//         >
//           Project Info
//         </h3>
//         {meta.map((m) => (
//           <div key={m.label} className="flex items-start gap-3">
//             <span style={{ color: "#A4FBCC", marginTop: "1px", flexShrink: 0 }}>
//               {m.icon}
//             </span>
//             <div className="flex flex-col gap-0.5">
//               <span
//                 className="text-xs"
//                 style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
//               >
//                 {m.label}
//               </span>
//               <span className="text-sm" style={{ color: "#F2F2F2", fontWeight: 500 }}>
//                 {m.value}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Tech stack card */}
//       {project.tags && project.tags.length > 0 && (
//         <div
//           className="rounded-xl p-5 flex flex-col gap-3"
//           style={{
//             background: "#1B3022",
//             border: "1px solid rgba(164,251,204,0.12)",
//           }}
//         >
//           <h3
//             className="text-xs uppercase tracking-widest flex items-center gap-2"
//             style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
//           >
//             <Tag size={11} /> Tech Stack
//           </h3>
//           <div className="flex flex-wrap gap-1.5">
//             {project.tags.map((tag: string) => (
//               <span key={tag} className="tech-tag" style={{ fontSize: "0.7rem" }}>
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* CTA card */}
//       {(project.demo || project.github) && (
//         <div
//           className="rounded-xl p-5 flex flex-col gap-3"
//           style={{
//             background: "#1B3022",
//             border: "1px solid rgba(164,251,204,0.12)",
//           }}
//         >
//           <h3
//             className="text-xs uppercase tracking-widest"
//             style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
//           >
//             Links
//           </h3>
//           {project.demo && (
//             <a
//               href={project.demo}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
//               style={{
//                 background: "#A4FBCC",
//                 color: "#081A04",
//                 textDecoration: "none",
//               }}
//             >
//               View Live Demo <ExternalLink size={13} />
//             </a>
//           )}
//           {project.github && (
//             <a
//               href={project.github}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm transition-all duration-200"
//               style={{
//                 border: "1px solid rgba(164,251,204,0.3)",
//                 color: "#A4FBCC",
//                 textDecoration: "none",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.background = "rgba(164,251,204,0.07)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.background = "transparent")
//               }
//             >
//               <Github size={13} /> Source Code
//             </a>
//           )}
//         </div>
//       )}
//     </aside>
//   );
// }

// // ─── Main component ────────────────────────────────────────────────────────────
// export function ProjectDetail({ slug }: { slug: string }) {
//   const [project, setProject] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [allProjects, setAllProjects] = useState<Project[]>([]);

//   useEffect(() => {
//     if (!slug) return;
//     setLoading(true);
//     getProject(slug)
//       .then(setProject)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [slug]);

//   useEffect(() => {
//     getProjects()
//       .then((data) => setAllProjects(data.results as unknown as Project[]))
//       .catch(console.error);
//   }, []);

//   if (loading) return <LoadingState />;
//   if (!project) return <NotFoundState />;

//   const related = allProjects
//     .filter(
//       (p) =>
//         p.id !== project.id &&
//         (p.category === project.category ||
//           p.tags.some((t: string) => project.tags.includes(t)))
//     )
//     .slice(0, 3);

//   const contentSections = [
//     { heading: "Overview", content: project.overview },
//     { heading: "The Challenge", content: project.challenge },
//     { heading: "Solution & Architecture", content: project.solution },
//   ].filter((s) => s.content);

//   return (
//     <>
//       <style>{DETAIL_STYLES}</style>

//       <div className="detail-page-bg min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
//         <div className="max-w-5xl mx-auto px-6">

//           {/* Back nav */}
//           <Link
//             href="/projects"
//             className="inline-flex items-center gap-2 text-sm mb-10 detail-fade"
//             style={{
//               color: "#9199A5",
//               textDecoration: "none",
//               animationDelay: "0ms",
//               transition: "color 0.2s ease",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#A4FBCC")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "#9199A5")}
//           >
//             <ArrowLeft size={13} /> Back to Projects
//           </Link>

//           {/* Title block */}
//           <div
//             className="mb-8 detail-fade"
//             style={{ animationDelay: "60ms" }}
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <span
//                 className="text-xs px-2 py-1 rounded-md"
//                 style={{
//                   background: "rgba(164,251,204,0.08)",
//                   color: "#A4FBCC",
//                   border: "1px solid rgba(164,251,204,0.22)",
//                   fontFamily: "'Space Mono', monospace",
//                 }}
//               >
//                 {project.category}
//               </span>
//               <span
//                 className="text-xs"
//                 style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
//               >
//                 {project.year}
//               </span>
//             </div>

//             <h1
//               className="mb-3 leading-tight"
//               style={{
//                 color: "#F2F2F2",
//                 fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
//                 fontWeight: 700,
//                 lineHeight: 1.18,
//               }}
//             >
//               {project.title}
//             </h1>

//             <p
//               className="text-lg leading-relaxed max-w-2xl"
//               style={{
//                 color: "#9199A5",
//                 borderLeft: "3px solid rgba(164,251,204,0.3)",
//                 paddingLeft: "14px",
//               }}
//             >
//               {project.tagline}
//             </p>
//           </div>

//           {/* Hero image */}
//           <div
//             className="rounded-2xl overflow-hidden mb-10 group detail-fade"
//             style={{ height: "360px", animationDelay: "120ms" }}
//           >
//             <img
//               src={project.image}
//               alt={`${project.title} screenshot`}
//               className="w-full h-full object-cover"
//               style={{
//                 filter: "brightness(0.78) saturate(0.85)",
//                 transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
//                 (e.currentTarget as HTMLImageElement).style.filter =
//                   "brightness(0.88) saturate(1)";
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
//                 (e.currentTarget as HTMLImageElement).style.filter =
//                   "brightness(0.78) saturate(0.85)";
//               }}
//             />
//           </div>

//           {/* Two-column layout */}
//           <div className="flex flex-col lg:flex-row gap-8 detail-fade" style={{ animationDelay: "180ms" }}>

//             {/* Main content */}
//             <main className="flex-1 min-w-0 flex flex-col gap-8">

//               {/* Prose sections */}
//               {contentSections.map((section) => (
//                 <section key={section.heading}>
//                   <h2 className="section-heading mb-3">{section.heading}</h2>
//                   <p className="text-sm leading-relaxed" style={{ color: "#9199A5" }}>
//                     {section.content}
//                   </p>
//                 </section>
//               ))}

//               {/* Results section removed – not present in backend */}

//               {/* Mobile action buttons */}
//               {(project.demo || project.github) && (
//                 <div
//                   className="flex flex-wrap gap-3 pt-6 lg:hidden"
//                   style={{ borderTop: "1px solid rgba(164,251,204,0.08)" }}
//                 >
//                   {project.demo && (
//                     <a
//                       href={project.demo}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
//                       style={{
//                         background: "#A4FBCC",
//                         color: "#081A04",
//                         textDecoration: "none",
//                       }}
//                     >
//                       Live Demo <ArrowUpRight size={13} />
//                     </a>
//                   )}
//                   {project.github && (
//                     <a
//                       href={project.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
//                       style={{
//                         border: "1px solid rgba(164,251,204,0.3)",
//                         color: "#A4FBCC",
//                         textDecoration: "none",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.background = "rgba(164,251,204,0.07)")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.background = "transparent")
//                       }
//                     >
//                       <Github size={13} /> Source Code
//                     </a>
//                   )}
//                 </div>
//               )}
//             </main>

//             {/* Sidebar */}
//             <div className="hidden lg:block w-64 flex-shrink-0">
//               <ProjectSidebar project={project} />
//             </div>
//           </div>

//           {/* Related projects */}
//           {related.length > 0 && (
//             <div
//               className="mt-16 pt-10 detail-fade"
//               style={{
//                 borderTop: "1px solid rgba(164,251,204,0.08)",
//                 animationDelay: "260ms",
//               }}
//             >
//               <h2
//                 className="mb-6"
//                 style={{ color: "#F2F2F2", fontSize: "1.15rem", fontWeight: 700 }}
//               >
//                 You might also like
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {related.map((p) => (
//                   <ProjectCard key={p.id} project={p} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }








































// --------------------------------------------------------------------
// ====================================================================
// --------------------------------------------------------------------




































import { getProject, getProjects } from '@/services/api';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Tag, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { PROFILE } from '@/app/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return {
      title: project.title,
      description: project.tagline,
    };
  } catch {
    return { title: 'Project Not Found' };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let project;
  let related: any[] = [];

  try {
    project = await getProject(slug);
    const allProjects = await getProjects();
    related = allProjects.results
      ?.filter((p: any) => p.slug !== slug && (p.category === project.category || p.tags?.some((t: string) => project.tags?.includes(t))))
      .slice(0, 3) || [];
  } catch {
    notFound();
  }

  const metaItems = [
    { icon: <User size={14} />, label: 'Role', value: project.role },
    { icon: <Clock size={14} />, label: 'Timeline', value: project.timeline },
    { icon: <Calendar size={14} />, label: 'Year', value: project.year },
  ].filter(m => m.value);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back link */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm mb-10 text-[#B0C4B0] hover:text-[#A4FBCC] transition">
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        {/* Title block */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs px-2 py-1 rounded-md bg-[rgba(164,251,204,0.08)] text-[#A4FBCC] border border-[rgba(164,251,204,0.22)] font-mono">
              {project.category}
            </span>
            <span className="text-xs text-[#B0C4B0] font-mono">{project.year}</span>
          </div>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white leading-tight mb-3">
            {project.title}
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl text-[#B0C4B0] border-l-3 border-[rgba(164,251,204,0.3)] pl-4">
            {project.tagline}
          </p>
        </div>

        {/* Hero image */}
        {project.image && (
          <div className="rounded-2xl overflow-hidden mb-10 h-80">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover brightness-75 transition-transform duration-700 hover:scale-105" />
          </div>
        )}

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <main className="flex-1 min-w-0 flex flex-col gap-8">
            {project.overview && (
              <section>
                <h2 className="text-lg font-semibold text-white border-l-3 border-[#A4FBCC] pl-3 mb-3">Overview</h2>
                <p className="text-sm text-[#B0C4B0] leading-relaxed">{project.overview}</p>
              </section>
            )}
            {project.challenge && (
              <section>
                <h2 className="text-lg font-semibold text-white border-l-3 border-[#A4FBCC] pl-3 mb-3">The Challenge</h2>
                <p className="text-sm text-[#B0C4B0] leading-relaxed">{project.challenge}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="text-lg font-semibold text-white border-l-3 border-[#A4FBCC] pl-3 mb-3">Solution & Architecture</h2>
                <p className="text-sm text-[#B0C4B0] leading-relaxed">{project.solution}</p>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 space-y-4">
            <div className="rounded-xl p-5 bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
              <h3 className="text-xs uppercase tracking-widest text-[#B0C4B0] font-mono mb-4">Project Info</h3>
              <div className="space-y-3">
                {metaItems.map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-[#A4FBCC] mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-xs text-[#B0C4B0] font-mono">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="rounded-xl p-5 bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
                <h3 className="text-xs uppercase tracking-widest text-[#B0C4B0] font-mono flex items-center gap-2 mb-3">
                  <Tag size={12} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[rgba(164,251,204,0.08)] text-[#A4FBCC]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(project.demo || project.github) && (
              <div className="rounded-xl p-5 bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
                <h3 className="text-xs uppercase tracking-widest text-[#B0C4B0] font-mono mb-3">Links</h3>
                <div className="space-y-2">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold bg-[#A4FBCC] text-[#0A2E1A] hover:opacity-85 transition">
                      Live Demo <ExternalLink size={13} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm border border-[rgba(164,251,204,0.3)] text-[#A4FBCC] hover:bg-[rgba(164,251,204,0.07)] transition">
                      <Github size={13} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[rgba(164,251,204,0.08)]">
            <h2 className="text-xl font-bold text-white mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p: any) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}