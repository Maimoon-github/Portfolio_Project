// src/app/blog/tag/[tag]/page.tsx  [ISR:300]
import { PostCard } from "@/components/blog/PostCard"

export const revalidate = 300

interface Props { params: { tag: string } }

export default async function TagPage({ params }: Props) {
  // const posts = await fetchPost.list({ tag: params.tag })
  const posts: any[] = []
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">#{params.tag} Posts</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post: any) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-muted-foreground">No posts with this tag.</p>
        )}
      </div>
    </div>
  )
}