// src/app/blog/category/[category]/page.tsx
export default async function CategoryPage() {
  // const posts = await fetchPost.list({ category: params.category })
  const posts: unknown[] = []

  return <div>Category Archive - {posts.length} posts</div>
}