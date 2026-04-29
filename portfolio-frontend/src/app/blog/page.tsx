// src/app/blog/page.tsx  [ISR:300]
import { PostCard } from "@/components/blog/PostCard"

export const revalidate = 300

export default async function BlogIndex() {
  // const posts = await fetchPost.list()
  const posts: any[] = []

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post: any) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </div>
  )
}