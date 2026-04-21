import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostListItem } from "@/lib/api/blog";

interface PostCardProps {
  post: PostListItem;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        {post.hero_image_url ? (
          <Image
            src={post.hero_image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-zinc-400 text-sm">
            No image
          </div>
        )}
      </div>
      <CardContent className="flex-1 p-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
          <span>{post.reading_time} min read</span>
        </div>
        <h3 className="font-semibold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-zinc-600 text-sm line-clamp-3 mb-4">{post.intro}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 text-xs text-zinc-500">
        {new Date(post.first_published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </CardFooter>
    </Card>
  );
}