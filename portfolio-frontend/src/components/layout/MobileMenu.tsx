import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Briefcase, BookOpen, Wrench, Mail, X } from "lucide-react";

const navLinks = [
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/calculators", label: "Calculators", icon: Calculator },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-16 z-40 lg:hidden"
          style={{
            backgroundColor: "rgba(19,19,19,0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: active ? "rgba(255,198,139,0.08)" : "transparent",
                    color: active ? "#ffc68b" : "#f0e6d3",
                  }}
                >
                  <Icon size={18} style={{ color: active ? "#ffc68b" : "rgba(240,230,211,0.5)" }} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <Link
              to="/contact"
              onClick={onClose}
              className="mt-3 px-4 py-3 rounded-lg text-center font-semibold"
              style={{
                background: "linear-gradient(135deg, #ffc68b, #ff9f1c)",
                color: "#1a0e00",
              }}
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}