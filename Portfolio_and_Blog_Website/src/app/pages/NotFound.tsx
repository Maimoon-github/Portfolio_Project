import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <main
      style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh" }}
      className="flex items-center justify-center relative overflow-hidden"
    >
      {/* Atmospheric blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #ffc68b 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)" }}
          >
            <Zap size={28} className="text-[#1a0e00]" fill="#1a0e00" />
          </div>
        </div>
        <p
          style={{
            fontSize: "8rem",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(135deg, #ffc68b, #ff9f1c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.5rem",
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Page not found
        </h1>
        <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "28rem", margin: "0 auto 2.5rem" }}>
          The page you're looking for doesn't exist. It may have been moved, deleted, or you might have mistyped the URL.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl"
          style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)", color: "#1a0e00", fontWeight: 600, fontSize: "0.95rem" }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
