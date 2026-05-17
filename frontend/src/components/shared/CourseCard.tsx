'use client';

import { useState } from "react";
import { Course, Lesson } from "@/app/types/api";
import { PopupModal } from "./PopupModal";
import { useCourse } from "@/app/hooks/useCourses";
import { Loader2, BookOpen, Clock, BarChart2 } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "rgba(164,251,204,0.10)", text: "var(--color-accent)", border: "rgba(164,251,204,0.25)" },
  Intermediate: { bg: "rgba(252,211,77,0.10)", text: "#FCD34D", border: "rgba(252,211,77,0.25)" },
  Advanced: { bg: "rgba(249,168,212,0.10)", text: "#F9A8D4", border: "rgba(249,168,212,0.25)" },
};

export function CourseCard({ course }: CourseCardProps) {
  const [open, setOpen] = useState(false);
  const { course: detailedCourse, loading, error } = useCourse(open ? course.slug : "");
  const diffColors = DIFFICULTY_COLORS[course.difficulty] || DIFFICULTY_COLORS.Beginner;

  return (
    <>
      <div
        className="group glass-card relative rounded-xl overflow-hidden p-6 cursor-pointer flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
        onClick={() => setOpen(true)}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-15 group-hover:opacity-70 transition-opacity duration-300" />

        <div className="relative flex items-start justify-between gap-3">
          <h3 className="leading-snug text-base font-bold text-on-background group-hover:text-accent transition-colors duration-200">
            {course.title}
          </h3>
          {course.difficulty && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono whitespace-nowrap"
              style={{ background: diffColors.bg, color: diffColors.text, border: `1px solid ${diffColors.border}` }}
            >
              {course.difficulty}
            </span>
          )}
        </div>

        <p className="relative text-sm leading-relaxed flex-1 text-outline">
          {course.description || "Keep learning with this structured course."}
        </p>

        <div className="relative flex items-center gap-4 pt-3 text-xs font-mono text-outline border-t border-glass-border">
          {course.lesson_count != null && (
            <span className="flex items-center gap-1">
              <BookOpen size={11} className="text-accent" /> {course.lesson_count} lessons
            </span>
          )}
          {course.estimated_hours != null && (
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-accent" /> {course.estimated_hours}h
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 font-semibold text-accent opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
            Explore <BarChart2 size={11} />
          </span>
        </div>
      </div>

      <PopupModal open={open} onClose={() => setOpen(false)}>
        {loading && (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <Loader2 size={28} className="animate-spin text-accent" />
            <p className="text-outline text-sm">Loading course details…</p>
          </div>
        )}
        {error && (
          <div className="p-12 text-center">
            <p className="text-error">Failed to load course details.</p>
            <button onClick={() => setOpen(false)} className="mt-4 text-sm text-accent">Close</button>
          </div>
        )}
        {!loading && !error && detailedCourse && (
          <>
            <h2 className="text-2xl font-bold text-on-background">{detailedCourse.title}</h2>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {detailedCourse.difficulty && (
                <span
                  className="text-xs px-2.5 py-1 rounded-md font-mono"
                  style={{ background: diffColors.bg, color: diffColors.text, border: `1px solid ${diffColors.border}` }}
                >
                  {detailedCourse.difficulty}
                </span>
              )}
              {detailedCourse.estimated_hours != null && (
                <span className="text-xs flex items-center gap-1 text-outline font-mono">
                  <Clock size={12} /> {detailedCourse.estimated_hours} hours
                </span>
              )}
            </div>
            {detailedCourse.description && (
              <p className="mt-5 text-sm leading-relaxed text-outline">{detailedCourse.description}</p>
            )}
            <div className="mt-6">
              <h3 className="text-on-background font-semibold">Lessons</h3>
              {detailedCourse.lessons && detailedCourse.lessons.length > 0 ? (
                <ol className="mt-3 space-y-2">
                  {detailedCourse.lessons.map((lesson: Lesson, i: number) => (
                    <li key={lesson.id} className="flex items-start gap-3 text-sm py-2 px-3 rounded-lg glass">
                      <span className="text-xs font-bold text-accent font-mono mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-outline">{lesson.title}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-2 text-outline">No lessons available.</p>
              )}
            </div>
          </>
        )}
      </PopupModal>
    </>
  );
}