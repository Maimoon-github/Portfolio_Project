import { useState, useRef } from "react";
import { Course, Lesson } from "../types/api";
import { PopupModal } from "./PopupModal";
import { useCourse } from "../hooks/useCourses";
import { Loader2, BookOpen, Clock, BarChart2 } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "rgba(164,251,204,0.10)", text: "#A4FBCC", border: "rgba(164,251,204,0.25)" },
  Intermediate: { bg: "rgba(252,211,77,0.10)", text: "#FCD34D", border: "rgba(252,211,77,0.25)" },
  Advanced: { bg: "rgba(249,168,212,0.10)", text: "#F9A8D4", border: "rgba(249,168,212,0.25)" },
};

export function CourseCard({ course }: CourseCardProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const { course: detailedCourse, loading, error } = useCourse(open ? course.slug : "");

  const diffColors = DIFFICULTY_COLORS[course.difficulty] || DIFFICULTY_COLORS.Beginner;

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
      <style>{`
        @keyframes courseCardReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="group relative rounded-xl overflow-hidden p-6 cursor-pointer flex flex-col gap-3"
        style={{
          background: "#1B3022",
          border: `1px solid ${hovered ? "rgba(164,251,204,0.35)" : "rgba(164,251,204,0.12)"}`,
          transition:
            "transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 20px 48px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(164,251,204,0.08)"
            : "0 2px 8px rgba(0,0,0,0.2)",
          animation: "courseCardReveal 0.5s ease forwards",
        }}
        onClick={() => setOpen(true)}
      >
        {/* Spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(180px circle at ${mousePos.x}% ${mousePos.y}%, rgba(164,251,204,0.08) 0%, transparent 70%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #A4FBCC, transparent)",
            opacity: hovered ? 0.7 : 0.15,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Header row: title + difficulty badge */}
        <div className="relative flex items-start justify-between gap-3">
          <h3
            className="leading-snug"
            style={{
              color: hovered ? "#A4FBCC" : "#F2F2F2",
              fontSize: "1rem",
              fontWeight: 700,
              transition: "color 0.2s ease",
            }}
          >
            {course.title}
          </h3>
          {course.difficulty && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{
                background: diffColors.bg,
                color: diffColors.text,
                border: `1px solid ${diffColors.border}`,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {course.difficulty}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="relative text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
          {course.description}
        </p>

        {/* Meta row */}
        <div
          className="relative flex items-center gap-4 pt-3 text-xs"
          style={{
            borderTop: "1px solid rgba(164,251,204,0.08)",
            color: "#9199A5",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {course.lesson_count != null && (
            <span className="flex items-center gap-1">
              <BookOpen size={11} style={{ color: "#A4FBCC" }} />
              {course.lesson_count} lessons
            </span>
          )}
          {course.estimated_hours != null && (
            <span className="flex items-center gap-1">
              <Clock size={11} style={{ color: "#A4FBCC" }} />
              {course.estimated_hours}h
            </span>
          )}
          <span
            className="ml-auto flex items-center gap-1 font-semibold"
            style={{
              color: "#A4FBCC",
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.2s ease, transform 0.2s ease",
              transform: hovered ? "translateX(2px)" : "translateX(0)",
            }}
          >
            Explore
            <BarChart2 size={11} />
          </span>
        </div>
      </div>

      {/* Detail Modal */}
      <PopupModal open={open} onClose={() => setOpen(false)}>
        {loading && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <Loader2 size={28} className="animate-spin" style={{ color: "#A4FBCC" }} />
            <p style={{ color: "#9199A5", fontSize: "0.85rem" }}>Loading course details…</p>
          </div>
        )}

        {error && (
          <div className="p-12 text-center">
            <p style={{ color: "#E55353" }}>Failed to load course details.</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-sm"
              style={{ color: "#A4FBCC", background: "none", border: "none", cursor: "pointer" }}
            >
              Close
            </button>
          </div>
        )}

        {!loading && !error && detailedCourse && (
          <>
            <h2 style={{ color: "#F2F2F2", fontSize: "1.5rem", fontWeight: 700 }}>
              {detailedCourse.title}
            </h2>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {detailedCourse.difficulty && (
                <span
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{
                    background: diffColors.bg,
                    color: diffColors.text,
                    border: `1px solid ${diffColors.border}`,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {detailedCourse.difficulty}
                </span>
              )}
              {detailedCourse.estimated_hours != null && (
                <span
                  className="text-xs flex items-center gap-1"
                  style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
                >
                  <Clock size={12} />
                  {detailedCourse.estimated_hours} hours
                </span>
              )}
            </div>

            {detailedCourse.description && (
              <p className="mt-5 text-sm leading-relaxed" style={{ color: "#9199A5" }}>
                {detailedCourse.description}
              </p>
            )}

            <div className="mt-6">
              <h3 style={{ color: "#F2F2F2", fontWeight: 600 }}>Lessons</h3>
              {detailedCourse.lessons && detailedCourse.lessons.length > 0 ? (
                <ol className="mt-3 space-y-2" style={{ color: "#9199A5" }}>
                  {detailedCourse.lessons.map((lesson: Lesson, i: number) => (
                    <li
                      key={lesson.id}
                      className="flex items-start gap-3 text-sm py-2 px-3 rounded-lg"
                      style={{
                        background: "rgba(164,251,204,0.03)",
                        border: "1px solid rgba(164,251,204,0.06)",
                      }}
                    >
                      <span
                        className="text-xs font-bold mt-0.5 shrink-0"
                        style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{lesson.title}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-2" style={{ color: "#9199A5" }}>
                  No lessons available.
                </p>
              )}
            </div>
          </>
        )}
      </PopupModal>
    </>
  );
}