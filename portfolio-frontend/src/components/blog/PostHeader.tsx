import type { Post } from "@/types/api";

export function PostHeader({ post }: { post: Post }) {
  return <div>Post Header: {post.title}</div>;
}