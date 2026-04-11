import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { CourseCard } from "../components/CourseCard";
import { Link } from "react-router";
import { Course } from "../types/api";

export function Courses() {
  const { courses, loading, error } = useCourses();
  const [filter, setFilter] = useState("all");

  // simple filter by difficulty or other criteria in future
  const filtered = courses.filter((c: Course) => filter === "all" || c.difficulty === filter);

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
          >
            Knowledge
          </span>
          <h1
            className="mt-2 mb-3"
            style={{ color: "#F2F2F2", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Courses
          </h1>
          <p className="max-w-xl" style={{ color: "#9199A5" }}>
            Structured courses pulled from the backend — click any item to see details.
          </p>
        </div>

        {/* optional filter bar */}
        {/* <div className="flex gap-2 mb-8">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('beginner')}>Beginner</button>
          <button onClick={() => setFilter('intermediate')}>Intermediate</button>
          <button onClick={() => setFilter('advanced')}>Advanced</button>
        </div> */}

        {loading && <p style={{ color: "#9199A5" }}>Loading...</p>}
        {error && <p style={{ color: "#E55353" }}>Error loading courses.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20">
            <p style={{ color: "#9199A5" }}>No courses available.</p>
          </div>
        )}
      </div>
    </div>
  );
}