// src/app/blog/layout.tsx
// Blog shell: persistent sidebar (categories/tags), breadcrumb, reading progress bar
import { ReactNode } from "react"
import { CategoryFilter } from "@/components/blog/CategoryFilter"
// import { fetchCategories } from "@/lib/api/blog" // Phase 1

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main content */}
        <div className="lg:col-span-8">{children}</div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="sticky top-24">
            <h4 className="uppercase text-xs font-medium tracking-widest text-muted-foreground mb-4">Categories</h4>
            {/* <CategoryFilter categories={...} /> */} {/* Phase 1 API */}
            <div className="text-xs text-muted-foreground">Categories loaded via API in Phase 1</div>
          </div>
        </aside>
      </div>
    </div>
  )
}