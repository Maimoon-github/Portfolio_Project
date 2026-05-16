// // 'use client';

// // import { useState, useRef } from "react";
// // import Link from "next/link";
// // import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
// // import { Project } from "../types/api";

// // interface ProjectCardProps {
// //   project: Project;
// //   featured?: boolean;
// //   onClick?: () => void;
// // }

// // export function ProjectCard({ project, featured = false, onClick }: ProjectCardProps) {
// //   const [hovered, setHovered] = useState(false);
// //   const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
// //   const cardRef = useRef<HTMLDivElement>(null);
// //   const imageHeight = featured ? "220px" : "180px";

// //   const handleMouseMove = (e: React.MouseEvent) => {
// //     if (!cardRef.current) return;
// //     const rect = cardRef.current.getBoundingClientRect();
// //     setMousePos({
// //       x: ((e.clientX - rect.left) / rect.width) * 100,
// //       y: ((e.clientY - rect.top) / rect.height) * 100,
// //     });
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes projectCardReveal {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>

// //       <div
// //         ref={cardRef}
// //         onMouseEnter={() => setHovered(true)}
// //         onMouseLeave={() => setHovered(false)}
// //         onMouseMove={handleMouseMove}
// //         className="group relative rounded-xl overflow-hidden flex flex-col"
// //         style={{
// //           background: "#1B3022",
// //           border: `1px solid ${hovered ? "rgba(164,251,204,0.40)" : "rgba(164,251,204,0.12)"}`,
// //           transition:
// //             "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease",
// //           transform: hovered ? "translateY(-6px)" : "translateY(0)",
// //           boxShadow: hovered
// //             ? "0 24px 56px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(164,251,204,0.10)"
// //             : "0 2px 8px rgba(0,0,0,0.2)",
// //           animation: "projectCardReveal 0.55s ease forwards",
// //         }}
// //       >
// //         {/* Spotlight glow */}
// //         <div
// //           className="absolute inset-0 z-10 pointer-events-none"
// //           style={{
// //             opacity: hovered ? 1 : 0,
// //             transition: "opacity 0.3s ease",
// //             background: `radial-gradient(260px circle at ${mousePos.x}% ${mousePos.y}%, rgba(164,251,204,0.08) 0%, transparent 70%)`,
// //           }}
// //         />

// //         {/* ── Image ── */}
// //         <div className="relative overflow-hidden flex-shrink-0" style={{ height: imageHeight }}>
// //           <img
// //             src={project.image}
// //             alt={`${project.title} screenshot`}
// //             className="w-full h-full object-cover"
// //             style={{
// //               filter: hovered ? "brightness(0.82) saturate(1)" : "brightness(0.70) saturate(0.85)",
// //               transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
// //               transform: hovered ? "scale(1.06)" : "scale(1)",
// //             }}
// //           />

// //           {/* Bottom gradient fade */}
// //           <div
// //             className="absolute inset-x-0 bottom-0 h-20"
// //             style={{
// //               background: "linear-gradient(to top, #1B3022 0%, transparent 100%)",
// //             }}
// //           />

// //           {/* Year badge */}
// //           <div
// //             className="absolute top-3 right-3 text-xs z-10"
// //             style={{
// //               color: "#9199A5",
// //               fontFamily: "'Space Mono', monospace",
// //               background: "rgba(8,26,4,0.75)",
// //               backdropFilter: "blur(4px)",
// //               padding: "3px 8px",
// //               borderRadius: "6px",
// //               border: "1px solid rgba(164,251,204,0.12)",
// //             }}
// //           >
// //             {project.year}
// //           </div>
// //         </div>

// //         {/* ── Content ── */}
// //         <div className="relative flex flex-col gap-3 p-5 flex-1">
// //           {/* Title */}
// //           {onClick ? (
// //             <h3
// //               className="leading-snug cursor-pointer"
// //               style={{
// //                 color: hovered ? "#A4FBCC" : "#F2F2F2",
// //                 fontSize: "1rem",
// //                 fontWeight: 600,
// //                 transition: "color 0.2s ease",
// //               }}
// //               onClick={onClick}
// //             >
// //               {project.title}
// //             </h3>
// //           ) : (
// //             <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
// //               <h3
// //                 className="leading-snug cursor-pointer"
// //                 style={{
// //                   color: hovered ? "#A4FBCC" : "#F2F2F2",
// //                   fontSize: "1rem",
// //                   fontWeight: 600,
// //                   transition: "color 0.2s ease",
// //                 }}
// //               >
// //                 {project.title}
// //               </h3>
// //             </Link>
// //           )}

// //           {/* Tagline */}
// //           <p className="text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
// //             {project.tagline}
// //           </p>

// //           {/* Tags */}
// //           <div className="flex flex-wrap gap-1.5">
// //             {project.tags.slice(0, 4).map((tag: string) => (
// //               <span key={tag} className="tech-tag" style={{ fontSize: "0.7rem" }}>
// //                 {tag}
// //               </span>
// //             ))}
// //             {project.tags.length > 4 && (
// //               <span
// //                 className="text-xs self-center"
// //                 style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
// //               >
// //                 +{project.tags.length - 4}
// //               </span>
// //             )}
// //           </div>

// //           {/* ── Actions ── */}
// //           <div
// //             className="flex items-center justify-between pt-3"
// //             style={{ borderTop: "1px solid rgba(164, 251, 204, 0.08)" }}
// //           >
// //             {onClick ? (
// //               <button
// //                 className="text-sm flex items-center gap-1.5"
// //                 style={{
// //                   color: "#A4FBCC",
// //                   background: "transparent",
// //                   border: "none",
// //                   padding: 0,
// //                   cursor: "pointer",
// //                   transition: "gap 0.2s ease",
// //                   gap: hovered ? "8px" : "6px",
// //                 }}
// //                 onClick={onClick}
// //               >
// //                 Case Study
// //                 <ArrowUpRight
// //                   size={13}
// //                   style={{
// //                     transition: "transform 0.2s ease",
// //                     transform: hovered ? "translate(2px, -2px)" : "translate(0, 0)",
// //                   }}
// //                 />
// //               </button>
// //             ) : (
// //               <Link
// //                 href={`/projects/${project.slug}`}
// //                 className="text-sm flex items-center gap-1.5"
// //                 style={{
// //                   color: "#A4FBCC",
// //                   textDecoration: "none",
// //                   transition: "gap 0.2s ease",
// //                 }}
// //               >
// //                 Case Study
// //                 <ArrowUpRight
// //                   size={13}
// //                   style={{
// //                     transition: "transform 0.2s ease",
// //                     transform: hovered ? "translate(2px, -2px)" : "translate(0, 0)",
// //                   }}
// //                 />
// //               </Link>
// //             )}

// //             {/* Icon links */}
// //             <div className="flex items-center gap-3">
// //               {project.github && (
// //                 <a
// //                   href={project.github}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label="Source code on GitHub"
// //                   className="transition-colors duration-200"
// //                   style={{ color: "#9199A5" }}
// //                   onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
// //                   onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
// //                 >
// //                   <Github size={15} />
// //                 </a>
// //               )}
// //               {project.demo && (
// //                 <a
// //                   href={project.demo}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label="Live demo"
// //                   className="transition-colors duration-200"
// //                   style={{ color: "#9199A5" }}
// //                   onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
// //                   onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
// //                 >
// //                   <ExternalLink size={15} />
// //                 </a>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }










































// // ------------------------------------------------------------------------------
// // ============================================================================
// // ------------------------------------------------------------------------------























'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Project } from "@/app/types/api";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onClick?: () => void;
}

export function ProjectCard({ project, featured = false, onClick }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageHeight = featured ? "h-[220px]" : "h-[180px]";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card group relative rounded-xl overflow-hidden flex flex-col transition-all duration-350 hover:-translate-y-1"
    >
      <div className={`relative overflow-hidden flex-shrink-0 ${imageHeight}`}>
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-all duration-700 brightness-75 group-hover:brightness-90 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-container-low to-transparent" />
        <div className="absolute top-3 right-3 text-xs z-10 font-mono glass px-2 py-0.5 rounded-md text-outline">
          {project.year}
        </div>
      </div>

      <div className="relative flex flex-col gap-3 p-5 flex-1">
        {onClick ? (
          <h3 className="leading-snug cursor-pointer text-base font-semibold transition-colors duration-200 text-on-background group-hover:text-accent" onClick={onClick}>
            {project.title}
          </h3>
        ) : (
          <Link href={`/projects/${project.slug}`} className="no-underline">
            <h3 className="leading-snug cursor-pointer text-base font-semibold transition-colors duration-200 text-on-background group-hover:text-accent">
              {project.title}
            </h3>
          </Link>
        )}

        <p className="text-sm leading-relaxed flex-1 text-outline">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">{tag}</span>
          ))}
          {project.tags.length > 4 && <span className="text-xs self-center text-outline font-mono">+{project.tags.length - 4}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-glass-border">
          {onClick ? (
            <button className="text-sm flex items-center gap-1.5 text-accent bg-transparent border-none p-0 cursor-pointer transition-all group-hover:gap-2" onClick={onClick}>
              Case Study <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ) : (
            <Link href={`/projects/${project.slug}`} className="text-sm flex items-center gap-1.5 text-accent no-underline transition-all group-hover:gap-2">
              Case Study <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}

          <div className="flex items-center gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-on-background transition-colors">
                <Github size={15} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-on-background transition-colors">
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}