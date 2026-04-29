// src/app/blog/[slug]/page.tsx  [ISR:600]
import { PostHeader } from "@/components/blog/PostHeader"
import { RichTextRenderer } from "@/components/blog/RichTextRenderer"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { PrevNextPost } from "@/components/blog/PrevNextPost"
import { CommentSection } from "@/components/blog/CommentSection"
import { notFound } from "next/navigation"

export const revalidate = 600

interface Props { params: { slug: string } }

export default async function BlogPost({ params }: Props) {
  // const post = await fetchPost.detail(params.slug)
  // if (!post) notFound()
  const post = null

  if (!post) notFound()

  return (
    <article>
      <PostHeader post={post} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_200px]">
        <div>
          <RichTextRenderer html={post.body} />
        </div>
        <aside className="hidden lg:block">
          <TableOfContents content={post.body} />
        </aside>
      </div>
      <PrevNextPost prev={post.prev} next={post.next} />
      <CommentSection postSlug={params.slug} />
    </article>
  )
}