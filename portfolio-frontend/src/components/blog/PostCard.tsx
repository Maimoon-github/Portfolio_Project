import type { Post } from "@/types/api";

export function PostCard({ post }: { post: Post }) {
  return <div>Post Card: {post.title}</div>;
}