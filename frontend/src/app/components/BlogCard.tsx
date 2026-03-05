import { Link } from "react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  large?: boolean;
}

export function BlogCard({ post, large = false }: BlogCardProps) {
  const CATEGORY_COLORS: Record<string, string> = {
    "AI/ML": "#A4FBCC",
    "MLOps": "#7DD3FC",
    "Tutorials": "#FCD34D",
    "Career": "#F9A8D4",
    "DevOps": "#C4B5FD",
  };

  const catColor = CATEGORY_COLORS[post.category] || "#A4FBCC";

  return (
    <div
      className="card-hover rounded-xl p-5 flex flex-col gap-4"
      style={{
        background: "#1B3022",
        border: "1px solid rgba(164, 251, 204, 0.1)",
        height: large ? "auto" : "auto",
      }}
    >
      {/* Category + Date */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            background: `${catColor}14`,
            color: catColor,
            border: `1px solid ${catColor}30`,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {post.category}
        </span>
        <div className="flex items-center gap-3 text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Title */}
      <Link to={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
        <h2
          className={`transition-colors duration-200 cursor-pointer leading-snug ${large ? "text-xl" : "text-base"}`}
          style={{ color: "#F2F2F2", fontWeight: 600 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
        >
          {post.title}
        </h2>
      </Link>

      {/* Excerpt */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
        {post.excerpt}
      </p>

      {/* Tags + Link */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
        <Link
          to={`/blog/${post.id}`}
          className="flex items-center gap-1 text-xs transition-colors duration-200"
          style={{ color: "#A4FBCC", textDecoration: "none" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Read <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
