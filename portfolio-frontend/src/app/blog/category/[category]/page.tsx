// src/app/blog/category/[category]/page.tsx
// [ISR:300] Category archive
import { PostCard } from "@/components/blog/PostCard"

export const revalidate = 300

export default function CategoryArchivePage({ params }: { params: { category: string } }) {
  return (
    <div>
      <h1 className="text-4xl font-medium mb-12 capitalize">Posts in {params.category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Posts filtered by category — API in Phase 1 */}
      </div>
    </div>
  )
}