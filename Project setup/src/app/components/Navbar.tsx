import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Terminal } from "lucide-react";
import { PROFILE } from "../data";

const NAV_LINKS = [
  { label: "Projects", path: "/projects" },
  { label: "Resume", path: "/resume" },
  { label: "Blog", path: "/blog" },
  { label: "Knowledge", path: "/knowledge" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8, 26, 4, 0.95)"
          : "transparent",
        borderBottom: scrolled ? "1px solid rgba(164, 251, 204, 0.08)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" style={{ textDecoration: "none" }}>
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ background: "rgba(164, 251, 204, 0.12)", border: "1px solid rgba(164, 251, 204, 0.3)" }}
          >
            <Terminal size={16} style={{ color: "#A4FBCC" }} />
          </div>
          <span
            className="font-mono text-sm tracking-wider group-hover:opacity-80 transition-opacity"
            style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
          >
            {PROFILE.initials}
            <span style={{ color: "#9199A5" }}>://</span>
            <span style={{ color: "#F2F2F2" }}>portfolio</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm transition-colors duration-200 relative"
              style={{
                color: isActive(link.path) ? "#A4FBCC" : "#9199A5",
                textDecoration: "none",
                fontWeight: isActive(link.path) ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = "#F2F2F2";
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = "#9199A5";
              }}
            >
              {isActive(link.path) && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "#A4FBCC" }}
                />
              )}
              {link.label}
            </Link>
          ))}
          <a
            href={PROFILE.resumeUrl}
            className="text-sm px-4 py-2 rounded transition-all duration-200"
            style={{
              border: "1px solid rgba(164, 251, 204, 0.4)",
              color: "#A4FBCC",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Resume PDF
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: "#A4FBCC" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2"
          style={{
            background: "rgba(8, 26, 4, 0.98)",
            borderTop: "1px solid rgba(164, 251, 204, 0.08)",
          }}
        >
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm py-2"
                style={{
                  color: isActive(link.path) ? "#A4FBCC" : "#9199A5",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(164, 251, 204, 0.06)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={PROFILE.resumeUrl}
              className="text-sm px-4 py-2 rounded text-center mt-2"
              style={{
                border: "1px solid rgba(164, 251, 204, 0.4)",
                color: "#A4FBCC",
                textDecoration: "none",
              }}
            >
              Resume PDF
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
