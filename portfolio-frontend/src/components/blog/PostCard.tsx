import type { Post } from "@/types/api";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="card h-full flex flex-col overflow-hidden">
        {/* Asymmetric image container */}
        <div className="project-image-container aspect-video bg-surface-container-high relative">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          )}
          <div className="absolute top-4 left-4">
            <span className="chip">{post.category}</span>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="headline-lg line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="mt-3 text-on-surface-variant line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between text-xs label-md">
            <div className="flex items-center gap-1.5 text-secondary">
              <Calendar className="h-3 w-3" />
              <time>{post.publishedAt}</time>
            </div>
            <div className="flex items-center gap-1.5 text-secondary">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}