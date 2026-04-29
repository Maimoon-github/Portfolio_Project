import type { PostListResponse } from "@/types/api";

export default async function BlogPage() {
  // const posts = await fetchPost.list();
  const posts: any[] = []; // placeholder until backend ready
  return <div>Blog Page - {posts.length} posts</div>;
}