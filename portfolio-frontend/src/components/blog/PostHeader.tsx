import Image from "next/image";
import { PostDetail } from "@/lib/api/blog";

interface PostHeaderProps {
  post: PostDetail;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-x-2 text-sm text-zinc-500 mb-6">
        {post.category && <span className="font-medium">{post.category.name}</span>}
        <span>·</span>
        <span>{post.reading_time} min read</span>
        <span>·</span>
        <time dateTime={post.first_published_at}>
          {new Date(post.first_published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      <h1 className="text-5xl font-bold tracking-tighter leading-tight mb-4">
        {post.title}
      </h1>
      {post.subtitle && (
        <p className="text-2xl text-zinc-600 mb-8">{post.subtitle}</p>
      )}

      {post.hero_image_url && (
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-10">
          <Image
            src={post.hero_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}
    </header>
  );
}