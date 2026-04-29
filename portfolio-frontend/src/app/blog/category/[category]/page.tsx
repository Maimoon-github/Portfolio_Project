// src/app/blog/category/[category]/page.tsx  [ISR:300]
import { PostCard } from "@/components/blog/PostCard"

export const revalidate = 300

interface Props { params: { category: string } }

export default async function CategoryPage({ params }: Props) {
  // const posts = await fetchPost.list({ category: params.category })
  const posts: any[] = []
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold capitalize">{params.category} Posts</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post: any) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-muted-foreground">No posts in this category.</p>
        )}
      </div>
    </div>
  )
}