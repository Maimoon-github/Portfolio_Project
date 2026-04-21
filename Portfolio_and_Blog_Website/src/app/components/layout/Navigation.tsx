import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/calculators", label: "Calculators" },
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(19,19,19,0.85)" : "rgba(19,19,19,0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(84,68,52,0.15)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)" }}
              >
                <Zap size={16} className="text-[#1a0e00]" fill="#1a0e00" />
              </div>
              <span
                className="tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  color: "#f0e6d3",
                  letterSpacing: "-0.01em",
                }}
              >
                Alex Reeves
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    letterSpacing: "0.01em",
                    color: isActive(link.href) ? "#ffc68b" : "rgba(240,230,211,0.65)",
                    transition: "color 0.2s ease",
                  }}
                  className="hover:text-[#ffc68b]! transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="mailto:alex@example.com"
                className="px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #ffc68b, #ff9f1c)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#1a0e00",
                  letterSpacing: "0.01em",
                }}
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#f0e6d3" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
            style={{
              backgroundColor: "rgba(19,19,19,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(84,68,52,0.15)",
            }}
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-3 rounded-lg"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: isActive(link.href) ? "#ffc68b" : "#f0e6d3",
                    backgroundColor: isActive(link.href) ? "rgba(255,198,139,0.08)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="mailto:alex@example.com"
                className="mt-3 px-4 py-3 rounded-lg text-center"
                style={{
                  background: "linear-gradient(135deg, #ffc68b, #ff9f1c)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#1a0e00",
                }}
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
