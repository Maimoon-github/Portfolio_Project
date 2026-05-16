// import { Knowledge } from '@/app/pages/Knowledge';

// export const metadata = {
//   title: 'Knowledge Base',
//   description:
//     'Long-form resources on AI and MLOps — structured courses and stack recommendations.',
// };

// export default function KnowledgePage() {
//   return <Knowledge />;
// }













// import Link from "next/link";
// import { BookOpen, Wrench, ChevronRight } from "lucide-react";
// import { useKnowledge } from "../hooks/useKnowledge";
// import { Course } from "../types/api";
// import { CourseCard } from "../components/CourseCard";

// export function Knowledge() {
//   const knowledge = useKnowledge();
//   return (
//     <div className="min-h-screen" style={{ background: "#081A04" }}>
//       <div className="max-w-6xl mx-auto px-6">
//         {/* Header */}
//         <div className="mb-12">
//           <span
//             className="text-xs uppercase tracking-widest"
//             style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
//           >
//             Resources
//           </span>
//           <h1
//             className="mt-2 mb-3"
//             style={{ color: "#F2F2F2", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
//           >
//             Knowledge Base
//           </h1>
//           <p className="max-w-2xl" style={{ color: "#9199A5" }}>
//             Long-form resources to level up your AI and MLOps skills — structured courses and my personal stack recommendations.
//           </p>
//         </div>

//         {/* Category Tiles - adapt counts from fetched data */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
//           {knowledge.data && (
//             [
//               {
//                 icon: <BookOpen size={24} style={{ color: "#A4FBCC" }} />,
//                 title: "Courses",
//                 description: "Structured, hands-on courses pulled from the Django API.",
//                 count: `${knowledge.data.courses.length} courses`,
//                 anchor: "/courses",
//               }
//             ].map((tile) => (
//               <a
//                 key={tile.title}
//                 href={tile.anchor}
//                 className="card-hover flex items-start gap-4 p-6 rounded-xl"
//                 style={{
//                   background: "#1B3022",
//                   border: "1px solid rgba(164, 251, 204, 0.12)",
//                   textDecoration: "none",
//                 }}
//               >
//                 <div
//                   className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ background: "rgba(164, 251, 204, 0.1)", border: "1px solid rgba(164, 251, 204, 0.2)" }}
//                 >
//                   {tile.icon}
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <h2 style={{ color: "#F2F2F2", fontSize: "1.1rem", fontWeight: 700 }}>{tile.title}</h2>
//                     <span
//                       className="text-xs px-2 py-0.5 rounded"
//                       style={{ background: "rgba(164, 251, 204, 0.08)", color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
//                     >
//                       {tile.count}
//                     </span>
//                   </div>
//                   <p className="text-sm" style={{ color: "#9199A5" }}>{tile.description}</p>
//                 </div>
//                 <ChevronRight size={16} className="ml-auto flex-shrink-0 mt-1" style={{ color: "#9199A5" }} />
//               </a>
//             ))
//           )}
//         </div>

//         {/* explanatory links to dedicated pages */}
//         <section id="courses" className="mb-16">
//           <div className="flex items-center gap-3 mb-8">
//             <BookOpen size={18} style={{ color: "#A4FBCC" }} />
//             <h2 style={{ color: "#F2F2F2", fontSize: "1.3rem", fontWeight: 700 }}>Courses</h2>
//           </div>
//           {knowledge.loading && <p style={{ color: "#9199A5" }}>Loading courses…</p>}
//           {knowledge.error && <p style={{ color: "#E55353" }}>Unable to fetch courses.</p>}
//           {knowledge.data && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {knowledge.data.courses.map((course: Course) => (
//                 <CourseCard key={course.id} course={course} />
//               ))}
//             </div>
//           )}
//           <div className="mt-8 text-center">
//             <Link href="/courses" className="text-sm text-[#A4FBCC] underline">
//               View all courses →
//             </Link>
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// }










































// -----------------------------------------------------------------------------
// =============================================================================
// -----------------------------------------------------------------------------





























import { getCourses } from '@/app/services/api';
import { CourseCard } from '@/app/components/shared/CourseCard';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Course } from '@/app/types/api';

export const metadata = {
  title: 'Knowledge Base',
  description:
    'Long-form resources on AI and MLOps — structured courses and stack recommendations.',
};

export default async function KnowledgePage() {
  let courses: Course[] = [];
  let error = false;

  try {
    const data = await getCourses();
    courses = data.results || data;
  } catch (err) {
    error = true;
  }

  const featuredCourses = courses.slice(0, 2); // show first 2 courses as preview

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A4FBCC] font-mono">
            Resources
          </span>
          <h1 className="mt-2 mb-3 text-[clamp(1.8rem,4vw,3rem)] font-bold text-white">
            Knowledge Base
          </h1>
          <p className="max-w-2xl text-[#B0C4B0]">
            Long-form resources to level up your AI and MLOps skills — structured courses and my personal stack recommendations.
          </p>
        </div>

        {/* Category Tile (only Courses for now) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          <Link
            href="/courses"
            className="group flex items-start gap-4 p-6 rounded-xl transition-all duration-300 bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)] hover:border-[rgba(164,251,204,0.35)] hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[rgba(164,251,204,0.1)] border border-[rgba(164,251,204,0.2)]">
              <BookOpen size={24} className="text-[#A4FBCC]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[1.1rem] font-bold text-white">Courses</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[rgba(164,251,204,0.08)] text-[#A4FBCC] font-mono">
                  {courses.length} courses
                </span>
              </div>
              <p className="text-sm text-[#B0C4B0]">
                Structured, hands-on courses pulled from the Django API.
              </p>
            </div>
            <ChevronRight size={16} className="text-[#B0C4B0] group-hover:text-[#A4FBCC] group-hover:translate-x-1 transition-all" />
          </Link>
          {/* You can add a second tile for "Stack" later */}
        </div>

        {/* Courses Preview Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={18} className="text-[#A4FBCC]" />
            <h2 className="text-[1.3rem] font-bold text-white">Featured Courses</h2>
          </div>

          {error ? (
            <p className="text-red-400">Failed to load courses. Please try again later.</p>
          ) : courses.length === 0 ? (
            <p className="text-[#B0C4B0]">No courses available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-sm text-[#A4FBCC] hover:gap-2 transition-all"
            >
              View all courses <ChevronRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}