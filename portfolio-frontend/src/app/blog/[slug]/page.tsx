// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchPost } from "@/lib/api/blog";
import { RichTextRenderer } from "@/components/blog/RichTextRenderer";
import { PostHeader } from "@/components/blog/PostHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { PrevNextPost } from "@/components/blog/PrevNextPost";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await fetchPost.detail(slug);
    return {
      title: `${post.title} • Neural Dispatch`,
      description: post.excerpt || `Exploring ${post.title}`,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
      }
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  
  let post;
  try {
    post = await fetchPost.detail(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <main className="min-h-screen pt-[120px] pb-24">
      <div className="container max-w-5xl">
        <PostHeader post={post} />
        
        <div className="flex flex-col lg:flex-row gap-16 mt-16">
          <article className="flex-grow max-w-3xl">
            <RichTextRenderer html={post.body || ""} />
            
            <div className="mt-24 pt-12 border-t border-outline-variant/30">
              <PrevNextPost />
            </div>
          </article>
          
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-[120px]">
              <TableOfContents headings={[]} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}