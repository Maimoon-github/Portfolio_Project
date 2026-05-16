// src/app/blog/page.tsx
export default async function BlogPage() {
  // const postsResponse = await fetchPost.list()
  const posts: unknown[] = [] // placeholder until backend ready

  return <div>Blog Page - {posts.length} posts</div>
}