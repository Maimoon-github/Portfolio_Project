// src/app/blog/tag/[tag]/page.tsx
export default async function TagPage() {
  // const posts = await fetchPost.list({ tag: params.tag })
  const posts: unknown[] = []

  return <div>Tag Archive - {posts.length} posts</div>
}