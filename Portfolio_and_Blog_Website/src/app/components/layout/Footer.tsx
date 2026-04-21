import { Link } from "react-router";
import { Github, Twitter, Linkedin, Mail, Zap } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#0e0e0e",
        borderTop: "1px solid rgba(84,68,52,0.12)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)" }}
              >
                <Zap size={16} className="text-[#1a0e00]" fill="#1a0e00" />
              </div>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  color: "#f0e6d3",
                  letterSpacing: "-0.01em",
                }}
              >
                Alex Reeves
              </span>
            </div>
            <p style={{ color: "rgba(240,230,211,0.55)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "26rem" }}>
              Senior AI/ML Engineer building production-grade intelligence systems. Open to consulting, advisory roles, and collaboration on ambitious projects.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:alex@example.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(255,198,139,0.08)",
                    color: "rgba(240,230,211,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,198,139,0.15)";
                    (e.currentTarget as HTMLElement).style.color = "#ffc68b";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,198,139,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(240,230,211,0.5)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 style={{ color: "rgba(126,184,247,0.9)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/blog", label: "Blog" },
                { to: "/calculators", label: "Calculators" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.9rem", transition: "color 0.2s" }}
                    className="hover:text-[#ffc68b]!"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 style={{ color: "rgba(126,184,247,0.9)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Quick Tools
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: "/calculators/mortgage", label: "Mortgage Calc" },
                { to: "/calculators/bmi", label: "BMI Calculator" },
                { to: "/calculators/compound-interest", label: "Compound Interest" },
                { to: "/calculators/password-strength", label: "Password Strength" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.9rem", transition: "color 0.2s" }}
                    className="hover:text-[#ffc68b]!"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(84,68,52,0.12)" }}
        >
          <p style={{ color: "rgba(240,230,211,0.3)", fontSize: "0.8rem" }}>
            © {currentYear} Alex Reeves. Built with React & Tailwind CSS.
          </p>
          <p style={{ color: "rgba(240,230,211,0.3)", fontSize: "0.8rem" }}>
            Designed under the{" "}
            <span style={{ color: "rgba(255,198,139,0.5)" }}>Sovereign Architect</span>{" "}
            system.
          </p>
        </div>
      </div>
    </footer>
  );
}
