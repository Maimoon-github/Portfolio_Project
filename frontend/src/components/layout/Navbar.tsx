// 'use client';

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Menu, X, Terminal, LogIn, LogOut } from "lucide-react";
// import { PROFILE } from "../data";
// import { getTokens, logout } from "../services/api";

// const NAV_LINKS = [
//   { label: "Projects", path: "/projects" },
//   { label: "Blog", path: "/blog" },
//   { label: "Courses", path: "/courses" },
//   { label: "Knowledge", path: "/knowledge" },
//   { label: "Contact", path: "/contact" },
// ];

// export function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setMenuOpen(false);
//   }, [pathname]);

//   // Lock body scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   const isActive = (path: string) =>
//     pathname === path || pathname.startsWith(path + "/");

//   const router = useRouter();
//   const authenticated = !!getTokens();

//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes navLogoGlow {
//           0%, 100% { box-shadow: 0 0 8px rgba(164,251,204,0.15); }
//           50%      { box-shadow: 0 0 16px rgba(164,251,204,0.30); }
//         }
//         @keyframes mobileMenuSlide {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .nav-link-active::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background: #A4FBCC;
//           border-radius: 1px;
//           box-shadow: 0 0 8px rgba(164,251,204,0.4);
//         }
//         .nav-resume-btn {
//           transition: background 0.2s ease, box-shadow 0.2s ease;
//         }
//         .nav-resume-btn:hover {
//           background: rgba(164,251,204,0.10) !important;
//           box-shadow: 0 0 16px rgba(164,251,204,0.12);
//         }
//       `}</style>

//       <header
//         className="fixed top-0 left-0 right-0 z-50"
//         style={{
//           background: scrolled ? "rgba(8, 26, 4, 0.92)" : "transparent",
//           borderBottom: scrolled ? "1px solid rgba(164, 251, 204, 0.08)" : "1px solid transparent",
//           backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
//           transition: "background 0.35s ease, border-bottom 0.35s ease, backdrop-filter 0.35s ease",
//         }}
//       >
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
//             <div
//               className="w-8 h-8 rounded-lg flex items-center justify-center"
//               style={{
//                 background: "rgba(164, 251, 204, 0.12)",
//                 border: "1px solid rgba(164, 251, 204, 0.3)",
//                 animation: "navLogoGlow 3s ease-in-out infinite",
//               }}
//             >
//               <Terminal size={16} style={{ color: "#A4FBCC" }} />
//             </div>
//             <span
//               className="text-sm tracking-wider"
//               style={{ fontFamily: "'Space Mono', monospace" }}
//             >
//               <span
//                 style={{
//                   color: "#A4FBCC",
//                   transition: "opacity 0.2s ease",
//                 }}
//                 className="group-hover:opacity-80"
//               >
//                 {PROFILE.initials}
//               </span>
//               <span style={{ color: "#9199A5" }}>://</span>
//               <span style={{ color: "#F2F2F2" }}>portfolio</span>
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-7">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className={`text-sm relative py-1 ${isActive(link.path) ? "nav-link-active" : ""}`}
//                 style={{
//                   color: isActive(link.path) ? "#A4FBCC" : "#9199A5",
//                   textDecoration: "none",
//                   fontWeight: isActive(link.path) ? 600 : 400,
//                   transition: "color 0.2s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = "#F2F2F2";
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = "#9199A5";
//                 }}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {PROFILE.resumeUrl && (
//               <a
//                 href={PROFILE.resumeUrl}
//                 className="nav-resume-btn text-sm px-4 py-2 rounded-lg"
//                 style={{
//                   border: "1px solid rgba(164, 251, 204, 0.35)",
//                   color: "#A4FBCC",
//                   textDecoration: "none",
//                   background: "transparent",
//                 }}
//               >
//                 Resume PDF
//               </a>
//             )}

//             {authenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-sm flex items-center gap-1.5 transition-colors duration-200"
//                 style={{ color: "#9199A5", background: "transparent", border: "none", cursor: "pointer" }}
//                 onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
//                 onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//               >
//                 <LogOut size={14} /> Log out
//               </button>
//             ) : (
//               <Link
//                 href="/login"
//                 className="text-sm flex items-center gap-1.5 transition-colors duration-200"
//                 style={{ color: "#9199A5", textDecoration: "none" }}
//                 onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
//                 onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//               >
//                 <LogIn size={14} /> Log in
//               </Link>
//             )}
//           </nav>

//           {/* Mobile Toggle */}
//           <button
//             className="md:hidden p-2 rounded-lg"
//             style={{
//               color: "#A4FBCC",
//               background: menuOpen ? "rgba(164,251,204,0.08)" : "transparent",
//               border: "1px solid transparent",
//               transition: "background 0.2s ease",
//             }}
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div
//             className="md:hidden px-6 pb-6 pt-2"
//             style={{
//               background: "rgba(8, 26, 4, 0.98)",
//               borderTop: "1px solid rgba(164, 251, 204, 0.08)",
//               animation: "mobileMenuSlide 0.25s ease forwards",
//             }}
//           >
//             <nav className="flex flex-col gap-1">
//               {NAV_LINKS.map((link, i) => (
//                 <Link
//                   key={link.path}
//                   href={link.path}
//                   className="text-sm py-3 px-3 rounded-lg"
//                   style={{
//                     color: isActive(link.path) ? "#A4FBCC" : "#9199A5",
//                     textDecoration: "none",
//                     fontWeight: isActive(link.path) ? 600 : 400,
//                     background: isActive(link.path) ? "rgba(164,251,204,0.06)" : "transparent",
//                     borderLeft: isActive(link.path)
//                       ? "2px solid #A4FBCC"
//                       : "2px solid transparent",
//                     transition: "all 0.2s ease",
//                     animationDelay: `${i * 40}ms`,
//                   }}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               <a
//                 href={PROFILE.resumeUrl}
//                 className="text-sm px-4 py-2.5 rounded-lg text-center mt-3"
//                 style={{
//                   border: "1px solid rgba(164, 251, 204, 0.35)",
//                   color: "#A4FBCC",
//                   textDecoration: "none",
//                 }}
//               >
//                 Resume PDF
//               </a>

//               {authenticated ? (
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left flex items-center gap-1.5 mt-3 py-2 px-3"
//                   style={{ color: "#9199A5", background: "transparent", border: "none" }}
//                 >
//                   <LogOut size={14} /> Log out
//                 </button>
//               ) : (
//                 <Link
//                   href="/login"
//                   className="w-full text-left flex items-center gap-1.5 mt-3 py-2 px-3"
//                   style={{ color: "#9199A5", textDecoration: "none" }}
//                 >
//                   <LogIn size={14} /> Log in
//                 </Link>
//               )}
//             </nav>
//           </div>
//         )}
//       </header>
//     </>
//   );
// }








































// -----------------------------------------------------------------------------
// =============================================================================
// -----------------------------------------------------------------------------






























'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import { PROFILE } from "@/app/data";

const NAV_LINKS = [
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Courses", path: "/courses" },
  { label: "Knowledge", path: "/knowledge" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-350 ${
        scrolled ? 'bg-surface-container-lowest/80 backdrop-blur-lg border-b border-glass-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent/10 border border-accent/30">
            <Terminal size={16} className="text-accent" />
          </div>
          <span className="text-sm tracking-wider font-mono">
            <span className="text-accent group-hover:opacity-80 transition-opacity">{PROFILE.initials}</span>
            <span className="text-outline">://</span>
            <span className="text-on-background">portfolio</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm relative py-1 ${
                isActive(link.path)
                  ? 'text-accent font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                  : 'text-outline font-normal hover:text-accent transition-colors'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg transition-colors text-accent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 bg-surface-container-lowest border-t border-glass-border">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm py-3 px-3 rounded-lg ${
                  isActive(link.path)
                    ? 'text-accent font-semibold bg-accent/10 border-l-2 border-accent'
                    : 'text-outline font-normal hover:text-accent transition-colors'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}