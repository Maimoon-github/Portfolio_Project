import type { Post } from "@/types/api";
import { Calendar, Clock, Share2 } from "lucide-react";

export function PostHeader({ post }: { post: Post }) {
  return (
    <div className="section pb-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="chip">{post.category}</span>
        </div>

        <h1 className="display-lg tracking-tighter mb-6">{post.title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(84,68,52,0.15)] pt-6">
          <div className="flex items-center gap-4">
            <div className="text-on-surface-variant">
              <div className="label-md">By Alex Reeves</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.publishedAt}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </div>
              </div>
            </div>
          </div>

          <button className="btn-secondary flex items-center gap-2 px-5 py-3 text-sm">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}