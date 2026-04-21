import { Metadata } from "next";
import { fetchPosts } from "@/lib/api/blog";
import PostCard from "@/components/blog/PostCard";

export const revalidate = 300; // ISR: 5 minutes as per roadmap

export const metadata: Metadata = {
  title: "Blog | Shehran",
  description: "Thoughts on full-stack development, Next.js, Django, Wagtail, and modern web architecture.",
};

export default async function BlogIndex() {
  const posts = await fetchPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-4">Blog</h1>
      <p className="text-zinc-500 mb-12">Latest articles and insights</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}