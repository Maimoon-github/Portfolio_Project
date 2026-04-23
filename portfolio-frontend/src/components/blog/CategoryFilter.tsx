// src/components/blog/CategoryFilter.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: { slug: string; name: string }[]
  currentCategory?: string
}

export function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === currentCategory) {
      params.delete("category")
    } else {
      params.set("category", slug)
    }
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={currentCategory ? "outline" : "default"}
        onClick={() => router.push("/blog")}
        className="cursor-pointer"
      >
        All
      </Badge>
      {categories.map((cat) => (
        <Badge
          key={cat.slug}
          variant={currentCategory === cat.slug ? "default" : "outline"}
          onClick={() => handleClick(cat.slug)}
          className="cursor-pointer"
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  )
}