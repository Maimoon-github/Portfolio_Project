// src/app/blog/layout.tsx  – persistent sidebar
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-8 py-12">
      <aside className="w-64 shrink-0 border-r pr-6">
        <h2 className="font-semibold">Blog</h2>
        <nav className="mt-4 flex flex-col gap-2 text-sm">
          <a href="/blog" className="hover:text-primary">All posts</a>
          <a href="/blog/category/ai" className="hover:text-primary">AI/ML</a>
          <a href="/blog/category/webdev" className="hover:text-primary">Web Dev</a>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}