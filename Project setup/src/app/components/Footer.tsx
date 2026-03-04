import { Link } from "react-router";
import { Github, Linkedin, Twitter, Terminal, ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto"
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(164, 251, 204, 0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: "rgba(164, 251, 204, 0.1)", border: "1px solid rgba(164, 251, 204, 0.2)" }}
              >
                <Terminal size={14} style={{ color: "#A4FBCC" }} />
              </div>
              <span className="text-sm font-mono" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
                {PROFILE.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs" style={{ color: "#9199A5" }}>
              {PROFILE.tagline}
            </p>
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
                  className="w-8 h-8 rounded flex items-center justify-center transition-all duration-200"
                  style={{
                    border: "1px solid rgba(164, 251, 204, 0.15)",
                    color: "#9199A5",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#A4FBCC";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#9199A5";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.15)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
              Navigate
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Projects", path: "/projects" },
                { label: "Resume", path: "/resume" },
                { label: "Blog", path: "/blog" },
                { label: "Knowledge Base", path: "/knowledge" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#9199A5", textDecoration: "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
              Get in Touch
            </h4>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-sm transition-colors duration-200 flex items-center gap-1 mb-4"
              style={{ color: "#9199A5", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
            >
              {PROFILE.email}
              <ArrowUpRight size={12} />
            </a>
            <Link
              to="/contact"
              className="text-xs px-3 py-2 rounded inline-block transition-all duration-200"
              style={{
                border: "1px solid rgba(164, 251, 204, 0.3)",
                color: "#A4FBCC",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              Send a Message →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6"
          style={{ borderTop: "1px solid rgba(164, 251, 204, 0.06)" }}
        >
          <p className="text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
            © {year} {PROFILE.name}. Built with React + TypeScript.
          </p>
          <a
            href={PROFILE.resumeUrl}
            className="text-xs flex items-center gap-1 transition-colors duration-200"
            style={{ color: "#9199A5", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
          >
            Download Resume PDF
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
