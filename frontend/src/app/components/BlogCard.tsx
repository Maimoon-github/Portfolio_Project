// // import { Link } from "react-router";
// // import { Calendar, Clock, ArrowRight } from "lucide-react";

// // interface BlogPost {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// //   // API returns created_at and read_time; we support both to ease migration
// //   date?: string;
// //   created_at?: string;
// //   readTime?: string;
// //   read_time?: string;
// //   category: string;
// //   tags: string[];
// //   featured?: boolean;
// // }

// // interface BlogCardProps {
// //   post: BlogPost;
// //   large?: boolean;
// // }

// // export function BlogCard({ post, large = false }: BlogCardProps) {
// //   const CATEGORY_COLORS: Record<string, string> = {
// //     "AI/ML": "#A4FBCC",
// //     "MLOps": "#7DD3FC",
// //     "Tutorials": "#FCD34D",
// //     "Career": "#F9A8D4",
// //     "DevOps": "#C4B5FD",
// //   };

// //   const catColor = CATEGORY_COLORS[post.category] || "#A4FBCC";

// //   return (
// //     <div
// //       className="card-hover rounded-xl p-5 flex flex-col gap-4"
// //       style={{
// //         background: "#1B3022",
// //         border: "1px solid rgba(164, 251, 204, 0.1)",
// //         height: large ? "auto" : "auto",
// //       }}
// //     >
// //       {/* Category + Date */}
// //       <div className="flex items-center justify-between">
// //         <span
// //           className="text-xs px-2 py-1 rounded"
// //           style={{
// //             background: `${catColor}14`,
// //             color: catColor,
// //             border: `1px solid ${catColor}30`,
// //             fontFamily: "'Space Mono', monospace",
// //           }}
// //         >
// //           {post.category}
// //         </span>
// //         <div className="flex items-center gap-3 text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
// //           <span className="flex items-center gap-1">
// //             <Calendar size={11} />
// //             {post.date || post.created_at || ""}
// //           </span>
// //           <span className="flex items-center gap-1">
// //             <Clock size={11} />
// //             {post.readTime || post.read_time || ""}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Title */}
// //       <Link to={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
// //         <h2
// //           className={`transition-colors duration-200 cursor-pointer leading-snug ${large ? "text-xl" : "text-base"}`}
// //           style={{ color: "#F2F2F2", fontWeight: 600 }}
// //           onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
// //           onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
// //         >
// //           {post.title}
// //         </h2>
// //       </Link>

// //       {/* Excerpt */}
// //       <p className="text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
// //         {post.excerpt}
// //       </p>

// //       {/* Tags + Link */}
// //       <div className="flex items-center justify-between">
// //         <div className="flex flex-wrap gap-1">
// //           {post.tags.slice(0, 3).map((tag) => (
// //             <span key={tag} className="tech-tag">{tag}</span>
// //           ))}
// //         </div>
// //         <Link
// //           to={`/blog/${post.id}`}
// //           className="flex items-center gap-1 text-xs transition-colors duration-200"
// //           style={{ color: "#A4FBCC", textDecoration: "none" }}
// //           onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
// //           onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
// //         >
// //           Read <ArrowRight size={12} />
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }













































// // import { Link } from "react-router";
// // import { Calendar, Clock, ArrowRight } from "lucide-react";
// // import { PostList } from "../types/api";

// // interface BlogCardProps {
// //   post: PostList;
// //   large?: boolean;
// // }

// // export function BlogCard({ post, large = false }: BlogCardProps) {
// //   const CATEGORY_COLORS: Record<string, string> = {
// //     "AI/ML": "#A4FBCC",
// //     "MLOps": "#7DD3FC",
// //     "Tutorials": "#FCD34D",
// //     "Career": "#F9A8D4",
// //     "DevOps": "#C4B5FD",
// //   };

// //   // post.category is an object { id, name, slug, description }
// //   const categoryName = post.category?.name || "Uncategorized";
// //   const catColor = CATEGORY_COLORS[categoryName] || "#A4FBCC";

// //   // Format the date (publish_date is ISO string)
// //   const formattedDate = post.publish_date
// //     ? new Date(post.publish_date).toLocaleDateString("en-US", {
// //         year: "numeric",
// //         month: "short",
// //         day: "numeric",
// //       })
// //     : "";

// //   // Format read time (number → string)
// //   const readTimeText = post.read_time ? `${post.read_time} min read` : "";

// //   // Tags are an array of objects { id, name, slug }
// //   // const tagNames = post.tags?.map((tag) => tag.name) || [];
// //   {post.tags.slice(0, 3).map((tag: string) => (
// //     <span key={tag} className="tech-tag">{tag}</span>
// //   ))}


// //   return (
// //     <div
// //       className="card-hover rounded-xl p-5 flex flex-col gap-4"
// //       style={{
// //         background: "#1B3022",
// //         border: "1px solid rgba(164, 251, 204, 0.1)",
// //         height: large ? "auto" : "auto",
// //       }}
// //     >
// //       {/* Category + Date */}
// //       <div className="flex items-center justify-between">
// //         <span
// //           className="text-xs px-2 py-1 rounded"
// //           style={{
// //             background: `${catColor}14`,
// //             color: catColor,
// //             border: `1px solid ${catColor}30`,
// //             fontFamily: "'Space Mono', monospace",
// //           }}
// //         >
// //           {categoryName}
// //         </span>
// //         <div className="flex items-center gap-3 text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
// //           <span className="flex items-center gap-1">
// //             <Calendar size={11} />
// //             {formattedDate}
// //           </span>
// //           <span className="flex items-center gap-1">
// //             <Clock size={11} />
// //             {readTimeText}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Title */}
// //       <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
// //         <h2
// //           className={`transition-colors duration-200 cursor-pointer leading-snug ${large ? "text-xl" : "text-base"}`}
// //           style={{ color: "#F2F2F2", fontWeight: 600 }}
// //           onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
// //           onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
// //         >
// //           {post.title}
// //         </h2>
// //       </Link>

// //       {/* Excerpt */}
// //       <p className="text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
// //         {post.excerpt}
// //       </p>

// //       {/* Tags + Link */}
// //       <div className="flex items-center justify-between">
// //         <div className="flex flex-wrap gap-1">
// //           {tagNames.slice(0, 3).map((tag) => (
// //             <span key={tag} className="tech-tag">{tag}</span>
// //           ))}
// //         </div>
// //         <Link
// //           to={`/blog/${post.slug}`}
// //           className="flex items-center gap-1 text-xs transition-colors duration-200"
// //           style={{ color: "#A4FBCC", textDecoration: "none" }}
// //           onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
// //           onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
// //         >
// //           Read <ArrowRight size={12} />
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }

























































































// import { Link } from "react-router";
// import { Calendar, Clock, ArrowRight } from "lucide-react";
// import { PostList } from "../types/api";

// interface BlogCardProps {
//   post: PostList;
//   large?: boolean;
// }

// export function BlogCard({ post, large = false }: BlogCardProps) {
//   const CATEGORY_COLORS: Record<string, string> = {
//     "AI/ML": "#A4FBCC",
//     "MLOps": "#7DD3FC",
//     "Tutorials": "#FCD34D",
//     "Career": "#F9A8D4",
//     "DevOps": "#C4B5FD",
//   };

//   // post.category is an object { id, name, slug, description }
//   const categoryName = post.category?.name || "Uncategorized";
//   const catColor = CATEGORY_COLORS[categoryName] || "#A4FBCC";

//   // Format the date (publish_date is ISO string)
//   const formattedDate = post.publish_date
//     ? new Date(post.publish_date).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       })
//     : "";

//   // Format read time (number → string)
//   const readTimeText = post.read_time ? `${post.read_time} min read` : "";

//   // Tags are an array of objects { id, name, slug }
//   const tagNames = post.tags?.map((tag: { name: string }) => tag.name) || [];

//   return (
//     <div
//       className="card-hover rounded-xl p-5 flex flex-col gap-4"
//       style={{
//         background: "#1B3022",
//         border: "1px solid rgba(164, 251, 204, 0.1)",
//         height: large ? "auto" : "auto",
//       }}
//     >
//       {/* Category + Date */}
//       <div className="flex items-center justify-between">
//         <span
//           className="text-xs px-2 py-1 rounded"
//           style={{
//             background: `${catColor}14`,
//             color: catColor,
//             border: `1px solid ${catColor}30`,
//             fontFamily: "'Space Mono', monospace",
//           }}
//         >
//           {categoryName}
//         </span>
//         <div className="flex items-center gap-3 text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
//           <span className="flex items-center gap-1">
//             <Calendar size={11} />
//             {formattedDate}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock size={11} />
//             {readTimeText}
//           </span>
//         </div>
//       </div>

//       {/* Title */}
//       <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
//         <h2
//           className={`transition-colors duration-200 cursor-pointer leading-snug ${large ? "text-xl" : "text-base"}`}
//           style={{ color: "#F2F2F2", fontWeight: 600 }}
//           onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
//           onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
//         >
//           {post.title}
//         </h2>
//       </Link>

//       {/* Excerpt */}
//       <p className="text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
//         {post.excerpt}
//       </p>

//       {/* Tags + Link */}
//       <div className="flex items-center justify-between">
//         <div className="flex flex-wrap gap-1">
//           {tagNames.slice(0, 3).map((tag: string) => (
//             <span key={tag} className="tech-tag">{tag}</span>
//           ))}
//         </div>
//         <Link
//           to={`/blog/${post.slug}`}
//           className="flex items-center gap-1 text-xs transition-colors duration-200"
//           style={{ color: "#A4FBCC", textDecoration: "none" }}
//           onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
//           onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
//         >
//           Read <ArrowRight size={12} />
//         </Link>
//       </div>
//     </div>
//   );
// }














































import { useState, useRef } from "react";
import { Link } from "react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PostList } from "../types/api";

interface BlogCardProps {
  post: PostList;
  large?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  "AI/ML": "#A4FBCC",
  MLOps: "#7DD3FC",
  Tutorials: "#FCD34D",
  Career: "#F9A8D4",
  DevOps: "#C4B5FD",
};

export function BlogCard({ post, large = false }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const categoryName = post.category?.name || "Uncategorized";
  const catColor = CATEGORY_COLORS[categoryName] || "#A4FBCC";

  const formattedDate = post.publish_date
    ? new Date(post.publish_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const readTimeText = post.read_time ? `${post.read_time} min read` : "";
  const tagNames = post.tags?.map((tag: { name: string }) => tag.name) || [];

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
        @keyframes blogCardReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative rounded-xl p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "#1B3022",
          border: `1px solid ${hovered ? "rgba(164,251,204,0.35)" : "rgba(164,251,204,0.1)"}`,
          transition:
            "transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 16px 48px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(164,251,204,0.08)"
            : "0 2px 8px rgba(0,0,0,0.2)",
          animation: "blogCardReveal 0.5s ease forwards",
        }}
      >
        {/* Spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(200px circle at ${mousePos.x}% ${mousePos.y}%, rgba(164,251,204,0.07) 0%, transparent 70%)`,
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

        {/* Category + Date */}
        <div className="relative flex items-center justify-between">
          <span
            className="text-xs px-2.5 py-1 rounded-md"
            style={{
              background: `${catColor}14`,
              color: catColor,
              border: `1px solid ${catColor}30`,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.02em",
            }}
          >
            {categoryName}
          </span>
          <div
            className="flex items-center gap-3 text-xs"
            style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
          >
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {readTimeText}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/blog/${post.slug}`} className="relative" style={{ textDecoration: "none" }}>
          <h2
            className={`leading-snug cursor-pointer ${large ? "text-xl" : "text-base"}`}
            style={{
              color: hovered ? "#A4FBCC" : "#F2F2F2",
              fontWeight: 600,
              transition: "color 0.2s ease",
            }}
          >
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="relative text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
          {post.excerpt}
        </p>

        {/* Tags + Link */}
        <div className="relative flex items-center justify-between pt-1">
          <div className="flex flex-wrap gap-1.5">
            {tagNames.slice(0, 3).map((tag: string) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{
              color: "#A4FBCC",
              textDecoration: "none",
              transition: "gap 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.gap = "6px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.gap = "4px";
            }}
          >
            Read <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </>
  );
}