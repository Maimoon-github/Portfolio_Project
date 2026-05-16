// import Link from "next/link";
// import { Github, Linkedin, Twitter, Terminal, ArrowUpRight, ChevronUp } from "lucide-react";
// import { PROFILE } from "../data";

// export function Footer() {
//   const year = new Date().getFullYear();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <style>{`
//         .footer-social-icon {
//           transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
//         }
//         .footer-social-icon:hover {
//           color: #A4FBCC !important;
//           border-color: rgba(164,251,204,0.45) !important;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 16px rgba(164,251,204,0.12);
//         }
//         .footer-link {
//           transition: color 0.2s ease, padding-left 0.2s ease;
//         }
//         .footer-link:hover {
//           color: #F2F2F2 !important;
//           padding-left: 4px;
//         }
//         .footer-scroll-top {
//           transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
//         }
//         .footer-scroll-top:hover {
//           background: rgba(164,251,204,0.12) !important;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 16px rgba(164,251,204,0.15);
//         }
//       `}</style>

//       <footer
//         className="mt-auto relative overflow-hidden"
//         style={{
//           background: "#000000",
//           borderTop: "1px solid rgba(164, 251, 204, 0.08)",
//         }}
//       >
//         {/* Subtle grid background */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(164,251,204,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(164,251,204,0.02) 1px, transparent 1px)",
//             backgroundSize: "64px 64px",
//           }}
//         />

//         <div className="relative max-w-6xl mx-auto px-6 py-14">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
//             {/* Brand */}
//             <div className="md:col-span-2">
//               <div className="flex items-center gap-2.5 mb-4">
//                 <div
//                   className="w-7 h-7 rounded-lg flex items-center justify-center"
//                   style={{
//                     background: "rgba(164, 251, 204, 0.1)",
//                     border: "1px solid rgba(164, 251, 204, 0.2)",
//                   }}
//                 >
//                   <Terminal size={14} style={{ color: "#A4FBCC" }} />
//                 </div>
//                 <span
//                   className="text-sm"
//                   style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
//                 >
//                   {PROFILE.name}
//                 </span>
//               </div>
//               <p
//                 className="text-sm leading-relaxed mb-5 max-w-sm"
//                 style={{ color: "#9199A5" }}
//               >
//                 {PROFILE.tagline}
//               </p>
//               <div className="flex items-center gap-3">
//                 {[
//                   { href: PROFILE.github, icon: <Github size={16} />, label: "GitHub" },
//                   { href: PROFILE.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
//                   { href: PROFILE.twitter, icon: <Twitter size={16} />, label: "Twitter" },
//                 ].map((social) => (
//                   <a
//                     key={social.label}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.label}
//                     className="footer-social-icon w-9 h-9 rounded-lg flex items-center justify-center"
//                     style={{
//                       border: "1px solid rgba(164, 251, 204, 0.15)",
//                       color: "#9199A5",
//                     }}
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation */}
//             <div>
//               <h4
//                 className="text-xs uppercase tracking-widest mb-5"
//                 style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
//               >
//                 Navigate
//               </h4>
//               <ul className="flex flex-col gap-2.5">
//                 {[
//                   { label: "Projects", path: "/projects" },
//                   { label: "Courses", path: "/courses" },
//                   { label: "Blog", path: "/blog" },
//                   { label: "Knowledge Base", path: "/knowledge" },
//                   { label: "Contact", path: "/contact" },
//                 ].map((link) => (
//                   <li key={link.path}>
//                     <Link
//                       href={link.path}
//                       className="footer-link text-sm"
//                       style={{ color: "#9199A5", textDecoration: "none" }}
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Contact */}
//             <div>
//               <h4
//                 className="text-xs uppercase tracking-widest mb-5"
//                 style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
//               >
//                 Get in Touch
//               </h4>
//               <a
//                 href={`mailto:${PROFILE.email}`}
//                 className="text-sm flex items-center gap-1 mb-5"
//                 style={{
//                   color: "#9199A5",
//                   textDecoration: "none",
//                   transition: "color 0.2s ease",
//                 }}
//                 onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
//                 onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//               >
//                 {PROFILE.email}
//                 <ArrowUpRight size={12} />
//               </a>
//               <Link
//                 href="/contact"
//                 className="text-xs px-4 py-2.5 rounded-lg inline-block"
//                 style={{
//                   border: "1px solid rgba(164, 251, 204, 0.3)",
//                   color: "#A4FBCC",
//                   textDecoration: "none",
//                   transition: "background 0.2s ease, box-shadow 0.2s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   (e.currentTarget as HTMLElement).style.background = "rgba(164,251,204,0.08)";
//                   (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(164,251,204,0.08)";
//                 }}
//                 onMouseLeave={(e) => {
//                   (e.currentTarget as HTMLElement).style.background = "transparent";
//                   (e.currentTarget as HTMLElement).style.boxShadow = "none";
//                 }}
//               >
//                 Send a Message →
//               </Link>
//             </div>
//           </div>

//           {/* Bottom bar */}
//           <div
//             className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7"
//             style={{ borderTop: "1px solid rgba(164, 251, 204, 0.06)" }}
//           >
//             <p
//               className="text-xs"
//               style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
//             >
//               © {year} {PROFILE.name}. Built with React + TypeScript.
//             </p>

//             <div className="flex items-center gap-4">
//               <a
//                 href={PROFILE.resumeUrl}
//                 className="text-xs flex items-center gap-1 transition-colors duration-200"
//                 style={{ color: "#9199A5", textDecoration: "none" }}
//                 onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
//                 onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//               >
//                 Download Resume PDF
//                 <ArrowUpRight size={11} />
//               </a>

//               {/* Scroll to top */}
//               <button
//                 onClick={scrollToTop}
//                 className="footer-scroll-top w-8 h-8 rounded-lg flex items-center justify-center"
//                 style={{
//                   background: "rgba(164,251,204,0.06)",
//                   border: "1px solid rgba(164,251,204,0.15)",
//                   color: "#9199A5",
//                   cursor: "pointer",
//                 }}
//                 aria-label="Scroll to top"
//               >
//                 <ChevronUp size={14} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }












































// ---------------------------------------------------------------------------------------------
// =============================================================================================
// ---------------------------------------------------------------------------------------------

























import Link from "next/link";
import { Github, Linkedin, Twitter, Terminal, ArrowUpRight, ChevronUp } from "lucide-react";
import { PROFILE } from "@/app/data";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style jsx>{`
        .footer-social-icon {
          transition: all 0.2s ease;
        }
        .footer-social-icon:hover {
          color: var(--color-accent) !important;
          border-color: rgba(45,212,191,0.45) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(45,212,191,0.12);
        }
        .footer-link {
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .footer-link:hover {
          color: var(--color-on-background) !important;
          padding-left: 4px;
        }
        .footer-scroll-top {
          transition: all 0.2s ease;
        }
        .footer-scroll-top:hover {
          background: rgba(45,212,191,0.12) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(45,212,191,0.15);
        }
      `}</style>

      <footer className="mt-auto relative overflow-hidden bg-black border-t border-glass-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(45,212,191,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(45,212,191,0.1)] border border-[rgba(45,212,191,0.2)]">
                  <Terminal size={14} className="text-accent" />
                </div>
                <span className="text-sm font-mono text-accent">{PROFILE.name}</span>
              </div>
              <p className="text-sm leading-relaxed mb-5 max-w-sm text-outline">{PROFILE.tagline}</p>
              <div className="flex items-center gap-3">
                {[
                  { href: PROFILE.github, icon: <Github size={16} />, label: "GitHub" },
                  { href: PROFILE.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
                  { href: PROFILE.twitter, icon: <Twitter size={16} />, label: "Twitter" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="footer-social-icon w-9 h-9 rounded-lg flex items-center justify-center border border-[rgba(45,212,191,0.15)] text-outline"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-5 text-accent font-mono">Navigate</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "Projects", path: "/projects" },
                  { label: "Courses", path: "/courses" },
                  { label: "Blog", path: "/blog" },
                  { label: "Knowledge Base", path: "/knowledge" },
                  { label: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="footer-link text-sm text-outline no-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-5 text-accent font-mono">Get in Touch</h4>
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-sm flex items-center gap-1 mb-5 text-outline no-underline hover:text-accent transition-colors"
              >
                {PROFILE.email}
                <ArrowUpRight size={12} />
              </a>
              <Link
                href="/contact"
                className="text-xs px-4 py-2.5 rounded-lg inline-block border border-[rgba(45,212,191,0.3)] text-accent no-underline hover:bg-[rgba(45,212,191,0.08)] hover:shadow-[0_0_16px_rgba(45,212,191,0.08)] transition-all"
              >
                Send a Message →
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7 border-t border-glass-border">
            <p className="text-xs text-outline font-mono">
              © {year} {PROFILE.name}. Built with React + TypeScript.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="footer-scroll-top w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(45,212,191,0.06)] border border-[rgba(45,212,191,0.15)] text-outline cursor-pointer"
                aria-label="Scroll to top"
              >
                <ChevronUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}