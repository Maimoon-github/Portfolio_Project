import { Link } from "react-router";
import { Terminal, Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 grid-bg"
      style={{ background: "#081A04" }}
    >
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
        style={{ background: "rgba(164, 251, 204, 0.08)", border: "1px solid rgba(164, 251, 204, 0.2)" }}
      >
        <Terminal size={28} style={{ color: "#A4FBCC" }} />
      </div>

      <p
        className="mb-3 font-mono"
        style={{ color: "#A4FBCC", fontSize: "4rem", fontWeight: 700, lineHeight: 1, fontFamily: "'Space Mono', monospace" }}
      >
        404
      </p>

      <h1 className="mb-2" style={{ color: "#F2F2F2", fontSize: "1.25rem", fontWeight: 700 }}>
        Page not found
      </h1>
      <p className="mb-8 max-w-xs" style={{ color: "#9199A5" }}>
        This route doesn't exist in the graph. The node you're looking for may have been removed or the path is incorrect.
      </p>

      <div className="flex gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
          style={{
            background: "#A4FBCC",
            color: "#081A04",
            fontWeight: 600,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          <Home size={14} /> Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
          style={{
            border: "1px solid rgba(164, 251, 204, 0.3)",
            color: "#A4FBCC",
            background: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.06)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          <ArrowLeft size={14} /> Go Back
        </button>
      </div>
    </div>
  );
}
