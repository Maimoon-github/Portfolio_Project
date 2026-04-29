import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-8 py-12">
      <aside className="w-64 shrink-0 border-r pr-6">
        <h2 className="font-semibold">Blog</h2>
        <nav className="mt-4 flex flex-col gap-2 text-sm">
          <Link href="/blog">All posts</Link>
          <Link href="/blog/category/ai">AI/ML</Link>
          <Link href="/blog/category/webdev">Web Dev</Link>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}