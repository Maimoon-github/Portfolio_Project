// src/app/blog/tag/[tag]/page.tsx
// [ISR:300] Tag archive
import { PostCard } from "@/components/blog/PostCard"

export const revalidate = 300

export default function TagArchivePage({ params }: { params: { tag: string } }) {
  return (
    <div>
      <h1 className="text-4xl font-medium mb-12">Posts tagged &quot;{params.tag}&quot;</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Posts filtered by tag — API in Phase 1 */}
      </div>
    </div>
  )
}