import { useState, useRef } from "react";
import { Link } from "react-router";
import { Tool } from "../types/api";
import { PopupModal } from "./PopupModal";

interface ToolCardProps {
  tool: Tool & { badge?: string; stats?: string; icon?: React.ReactNode };
  index: number;
}

const BADGE_STYLES: Record<string, string> = {
  Popular: "bg-[#A4FBCC]/15 text-[#A4FBCC] border border-[#A4FBCC]/30",
  New: "bg-blue-400/15 text-blue-300 border border-blue-400/30",
  Advanced: "bg-amber-400/15 text-amber-300 border border-amber-400/30",
  Live: "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30",
  Dev: "bg-violet-400/15 text-violet-300 border border-violet-400/30",
};

export function ToolCard({ tool, index }: ToolCardProps) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <div
        ref={ cardRef }
        onMouseEnter={ () => setHovered(true) }
        onMouseLeave={ () => setHovered(false) }
        onMouseMove={ handleMouseMove }
        className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
        style={ {
          background: "#1B3022",
          border: "1px solid rgba(164,251,204,0.10)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          animationDelay: `${index * 80}ms`,
          animation: "cardReveal 0.6s ease forwards",
          opacity: 0,
          boxShadow: hovered
            ? "0 24px 48px -8px rgba(0,0,0,0.7), 0 0 0 1px rgba(164,251,204,0.25), inset 0 0 40px rgba(164,251,204,0.04)"
            : "0 4px 16px rgba(0,0,0,0.3)",
        } }
        onClick={ () => setModalOpen(true) }
      >
        {/* Spotlight glow */ }
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={ {
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(180px circle at ${mousePos.x}% ${mousePos.y}%, rgba(164,251,204,0.10) 0%, transparent 70%)`,
          } }
        />

        {/* Top accent line */ }
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={ {
            background: "linear-gradient(90deg, transparent, #A4FBCC, transparent)",
            opacity: hovered ? 0.8 : 0.2,
          } }
        />

        <div className="relative p-6 flex flex-col gap-4">
          {/* Header row */ }
          <div className="flex items-start justify-between gap-3">
            {/* Icon */ }
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
              style={ {
                background: hovered ? "rgba(164,251,204,0.15)" : "rgba(164,251,204,0.06)",
                color: "#A4FBCC",
                border: "1px solid rgba(164,251,204,0.15)",
              } }
            >
              { tool.icon }
            </div>

            {/* Badge + stats */ }
            <div className="flex flex-col items-end gap-1.5">
              { tool.badge && (
                <span className={ `text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide ${BADGE_STYLES[tool.badge]}` }>
                  { tool.badge }
                </span>
              ) }
              <span className="text-[11px]" style={ { color: "#9199A5" } }>{ tool.stats }</span>
            </div>
          </div>

          {/* Content */ }
          <div>
            <h3
              className="text-base font-semibold mb-2 transition-colors duration-200"
              style={ { color: hovered ? "#A4FBCC" : "#F2F2F2", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" } }
            >
              { tool.name }
            </h3>
            <p className="text-sm leading-relaxed" style={ { color: "#9199A5" } }>
              { tool.description }
            </p>
          </div>

          {/* CTA */ }
          <div
            className="flex items-center gap-2 text-xs font-semibold transition-all duration-300 mt-auto pt-2"
            style={ {
              color: "#A4FBCC",
              opacity: hovered ? 1 : 0.5,
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            } }
          >
            <span>Launch Tool</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </div>
      </div>

      <PopupModal open={ modalOpen } onClose={ () => setModalOpen(false) }>
        <h2 style={ { color: "#F2F2F2", fontSize: "1.5rem", fontWeight: 700 } }>{ tool.name }</h2>
        <p className="mt-3" style={ { color: "#9199A5" } }>{ tool.description }</p>
        <p className="mt-2" style={ { color: "#9199A5" } }><strong>Category:</strong> { tool.category_name }</p>
        { tool.website_url && (
          tool.website_url.startsWith("/") ? (
            <Link
              to={ tool.website_url }
              className="mt-4 inline-block text-sm text-[#A4FBCC] underline"
              onClick={ () => setModalOpen(false) }
            >Launch tool</Link>
          ) : (
            <a
              href={ tool.website_url }
              className="mt-4 inline-block text-sm text-[#A4FBCC] underline"
              target="_blank"
              rel="noopener noreferrer"
            >Open tool</a>
          )
        ) }
      </PopupModal>
    </>
  );
}