'use client';

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PostList } from "@/app/types/api";

interface BlogCardProps {
  post: PostList;
  large?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  "AI/ML": "var(--color-accent)",
  MLOps: "#7DD3FC",
  Tutorials: "#FCD34D",
  Career: "#F9A8D4",
  DevOps: "#C4B5FD",
};

export function BlogCard({ post, large = false }: BlogCardProps) {
  const categoryName = post.category?.name || "Uncategorized";
  const catColor = CATEGORY_COLORS[categoryName] || "var(--color-accent)";

  const formattedDate = post.publish_date
    ? new Date(post.publish_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";

  const readTimeText = post.read_time ? `${post.read_time} min read` : "";
  const tagNames = post.tags?.map((tag: { name: string }) => tag.name) || [];

  return (
    <div className="group glass-card relative rounded-xl p-5 flex flex-col gap-4 overflow-hidden transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-15 group-hover:opacity-70 transition-opacity duration-300" />

      <div className="relative flex items-center justify-between">
        <span
          className="text-xs px-2.5 py-1 rounded-md font-mono"
          style={{
            background: `${catColor}14`,
            color: catColor,
            border: `1px solid ${catColor}30`,
          }}
        >
          {categoryName}
        </span>
        <div className="flex items-center gap-3 text-xs text-outline font-mono">
          <span className="flex items-center gap-1"><Calendar size={11} /> {formattedDate}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {readTimeText}</span>
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="relative no-underline">
        <h2
          className={`leading-snug cursor-pointer transition-colors duration-200 ${
            large ? "text-xl" : "text-base"
          } font-semibold text-on-background group-hover:text-accent`}
        >
          {post.title}
        </h2>
      </Link>

      <p className="relative text-sm leading-relaxed flex-1 text-outline">{post.excerpt}</p>

      <div className="relative flex items-center justify-between pt-1">
        <div className="flex flex-wrap gap-1.5">
          {tagNames.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-1.5 text-xs font-medium text-accent no-underline transition-all group-hover:gap-2"
        >
          Read <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}