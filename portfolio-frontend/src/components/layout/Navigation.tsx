import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, Zap } from "lucide-react";
import { motion } from "motion/react";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/calculators", label: "Calculators" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(19,19,19,0.9)" : "rgba(19,19,19,0.4)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(84,68,52,0.15)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)" }}>
                <Zap size={16} className="text-[#1a0e00]" fill="#1a0e00" />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "#f0e6d3", letterSpacing: "-0.01em" }}>
                Alex Reeves
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    color: isActive(link.href) ? "#ffc68b" : "rgba(240,230,211,0.65)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.88rem",
                  }}
                  className="hover:text-[#ffc68b]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                style={{
                  background: "linear-gradient(135deg, #ffc68b, #ff9f1c)",
                  color: "#1a0e00",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
                className="px-4 py-2 rounded-lg"
              >
                Get in Touch
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2"
              style={{ color: "#f0e6d3" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}