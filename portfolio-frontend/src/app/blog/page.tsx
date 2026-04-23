// src/app/blog/page.tsx
// [ISR:300] Blog index: paginated post list, category filter, featured post hero
import { PostCard } from "@/components/blog/PostCard"
import { SearchBar } from "@/components/blog/SearchBar"

export const revalidate = 300

export default function BlogPage() {
  // Placeholder data — real API fetch in Phase 1
  const posts = [
    {
      slug: "first-post",
      title: "Building Production RAG Systems",
      excerpt: "Lessons learned scaling LLM retrieval pipelines.",
      category: { name: "AI/ML", slug: "ai" },
      publishedAt: "2025-04-01",
      readingTime: 8,
    },
  ]

  return (
    <div>
      <div className="mb-12">
        <SearchBar onSearch={() => {}} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}