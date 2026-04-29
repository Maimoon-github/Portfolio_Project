import { notFound } from "next/navigation"

interface Props { params: { slug: string } }

export default async function BlogPost({ params }: Props) {
  // Placeholder until API is ready
  const post = null
  if (!post) notFound()

  return <div>Blog Post: {params.slug}</div>
}