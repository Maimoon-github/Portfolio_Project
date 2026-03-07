import { Course } from "../types/api";
import { useState } from "react";
import { PopupModal } from "./PopupModal";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="card-hover rounded-xl overflow-hidden p-6 cursor-pointer"
        style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.12)" }}
        onClick={() => setOpen(true)}
      >
        <h3 className="mb-2" style={{ color: "#F2F2F2", fontSize: "1rem", fontWeight: 700 }}>
          {course.title}
        </h3>
        <p className="text-sm" style={{ color: "#9199A5" }}>
          {course.description}
        </p>
      </div>

      <PopupModal open={open} onClose={() => setOpen(false)}>
        <h2 style={{ color: "#F2F2F2", fontSize: "1.5rem", fontWeight: 700 }}>
          {course.title}
        </h2>
        <p className="mt-4" style={{ color: "#9199A5" }}>
          Difficulty: {course.difficulty}
        </p>
        <p className="mt-2" style={{ color: "#9199A5" }}>
          Estimated Hours: {course.estimated_hours}
        </p>
        <div className="mt-4">
          <h3 style={{ color: "#F2F2F2", fontWeight: 600 }}>Lessons</h3>
          <ul className="list-disc list-inside mt-2" style={{ color: "#9199A5" }}>
            {course.lessons ? (
              course.lessons.map((l) => <li key={l.id}>{l.title}</li>)
            ) : (
              <li>{course.lesson_count || "--"} lessons</li>
            )}
          </ul>
        </div>
      </PopupModal>
    </>
  );
}