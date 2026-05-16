// 'use client';

// import { useState, useMemo } from 'react';
// import { CourseCard } from '@/components/shared/CourseCard';
// import type { Course } from '@/app/types/api';

// interface CoursesGridProps {
//   courses: Course[];
// }

// type Difficulty = 'all' | 'Beginner' | 'Intermediate' | 'Advanced';

// export function CoursesGrid({ courses }: CoursesGridProps) {
//   const [difficulty, setDifficulty] = useState<Difficulty>('all');

//   const filteredCourses = useMemo(() => {
//     if (difficulty === 'all') return courses;
//     return courses.filter((c) => c.difficulty === difficulty);
//   }, [courses, difficulty]);

//   const difficulties: Difficulty[] = ['all', 'Beginner', 'Intermediate', 'Advanced'];

//   if (courses.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-[#B0C4B0]">No courses available at the moment.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Filter tabs */}
//       <div className="flex flex-wrap gap-2 mb-8">
//         {difficulties.map((diff) => (
//           <button
//             key={diff}
//             onClick={() => setDifficulty(diff)}
//             className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${difficulty === diff
//                 ? 'bg-[#A4FBCC] text-[#0A2E1A] shadow-[0_0_12px_rgba(164,251,204,0.3)]'
//                 : 'bg-[#0F2C1A] text-[#B0C4B0] border border-[rgba(164,251,204,0.2)] hover:border-[rgba(164,251,204,0.4)] hover:text-[#A4FBCC]'
//               }`}
//           >
//             {diff === 'all' ? 'All' : diff}
//           </button>
//         ))}
//       </div>

//       {/* Course grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredCourses.map((course) => (
//           <CourseCard key={course.id} course={course} />
//         ))}
//       </div>

//       {filteredCourses.length === 0 && (
//         <div className="text-center py-20">
//           <p className="text-[#B0C4B0]">No courses match the selected difficulty.</p>
//         </div>
//       )}
//     </>
//   );
// }
















































// ----------------------------------------------------------------------------------------------
// ==============================================================================================
// ----------------------------------------------------------------------------------------------




















'use client';

import { useState, useMemo } from 'react';
import { CourseCard } from '@/app/components/shared/CourseCard';
import type { Course } from '@/app/types/api';

type Difficulty = 'all' | 'Beginner' | 'Intermediate' | 'Advanced';

interface CoursesGridProps {
  courses: Course[];
}

export function CoursesGrid({ courses }: CoursesGridProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('all');

  const filteredCourses = useMemo(() => {
    if (difficulty === 'all') return courses;
    return courses.filter((c) => c.difficulty === difficulty);
  }, [courses, difficulty]);

  const difficulties: Difficulty[] = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  if (courses.length === 0) {
    return <p className="text-outline text-center py-20">No courses available at the moment.</p>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setDifficulty(diff)}
            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${
              difficulty === diff
                ? 'bg-accent text-on-accent'
                : 'bg-surface-container-low text-outline border border-glass-border hover:border-glass-border-hover hover:text-accent'
            }`}
          >
            {diff === 'all' ? 'All' : diff}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-outline text-center py-20">No courses match the selected difficulty.</p>
      )}
    </>
  );
}