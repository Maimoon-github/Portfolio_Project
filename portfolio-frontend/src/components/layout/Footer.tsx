import { Link } from "react-router";
import { Github, Twitter, Linkedin, Mail, Zap } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#131313",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)" }}
              >
                <Zap size={18} className="text-[#1a0e00]" fill="#1a0e00" />
              </div>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  color: "#f0e6d3",
                  letterSpacing: "-0.02em",
                }}
              >
                Alex Reeves
              </span>
            </div>
            <p style={{ color: "rgba(240,230,211,0.6)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "26rem" }}>
              Senior AI/ML Engineer building production-grade intelligence systems. Open to consulting, advisory roles, and collaboration on ambitious projects.
            </p>
            <div className="flex items-center gap-3 mt-8">
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
                  className="w-10 h-10 rounded-2xl flex items-center justify-center social-icon"
                  style={{
                    backgroundColor: "rgba(255,198,139,0.1)",
                    color: "rgba(240,230,211,0.7)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,198,139,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "#ffc68b";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,198,139,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(240,230,211,0.7)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: "rgba(126,184,247,0.85)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/blog", label: "Blog" },
                { to: "/calculators", label: "Calculators" },
                { to: "/services", label: "Services" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(240,230,211,0.7)", fontSize: "0.92rem" }}
                    className="hover:text-[#ffc68b]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 style={{ color: "rgba(126,184,247,0.85)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Quick Tools
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: "/calculators/mortgage", label: "Mortgage Calc" },
                { to: "/calculators/bmi", label: "BMI Calculator" },
                { to: "/calculators/compound-interest", label: "Compound Interest" },
                { to: "/calculators/tax-bracket", label: "Tax Bracket" },
                { to: "/calculators/password-strength", label: "Password Strength" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(240,230,211,0.7)", fontSize: "0.92rem" }}
                    className="hover:text-[#ffc68b]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: "rgba(126,184,247,0.85)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
                { to: "/cookies", label: "Cookie Policy" },
                { to: "/accessibility", label: "Accessibility" },
                { to: "/sitemap", label: "Site Map" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "rgba(240,230,211,0.7)", fontSize: "0.92rem" }}
                    className="hover:text-[#ffc68b]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar – tonal separator */}
        <div
          className="footer-separator mt-20 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm"
          style={{ color: "rgba(240,230,211,0.35)" }}
        >
          <p>© {currentYear} Alex Reeves. Built with React & Tailwind CSS.</p>
          <p>
            Designed under the{" "}
            <span style={{ color: "rgba(255,198,139,0.5)" }}>Sovereign Architect</span>{" "}
            system.
          </p>
        </div>
      </div>
    </footer>
  );
}