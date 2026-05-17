'use client';

import { getCourses } from '@/services/api';
import { CoursesGrid } from '@/components/sections/CoursesGrid';
import type { Course } from '@/app/types/api';

export const metadata = {
  title: 'Courses',
  description: 'Structured, hands-on courses on agentic AI, MLOps, and data engineering.',
};

export default async function CoursesPage() {
  let courses: Course[] = [];
  let error = false;

  try {
    const data = await getCourses();
    courses = data.results || data;
  } catch (err) {
    error = true;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A4FBCC] font-mono">
            Knowledge
          </span>
          <h1 className="mt-2 mb-3 text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
            Courses
          </h1>
          <p className="max-w-xl text-[#B0C4B0]">
            Structured courses pulled from the backend — click any item to see details.
          </p>
        </div>

        {error ? (
          <div className="text-center py-20">
            <p className="text-red-400">Failed to load courses. Please try again later.</p>
          </div>
        ) : (
          <CoursesGrid courses={courses} />
        )}
      </div>
    </div>
  );
}