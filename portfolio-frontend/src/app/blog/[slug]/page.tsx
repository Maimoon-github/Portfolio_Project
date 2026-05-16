// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string }
}

export default async function BlogPost({ params }: Props) {
  // TODO: Replace with real fetch when backend is ready
  // const post = await fetchPost.detail(params.slug)
  const post = null

  if (!post) notFound()

  return <div>Blog Post: {params.slug}</div>
}