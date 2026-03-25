import { useState, useEffect } from "react";
import { BlogCard } from "../components/BlogCard";
import { Rss } from "lucide-react";
import { getBlogPosts } from "../services/api";
import { PostList } from "../types/api";

const CATEGORIES = ["All", "AI/ML", "MLOps", "Tutorials", "Career"];

export function Blog() {
  const [active, setActive] = useState("All");
  const [posts, setPosts] = useState<PostList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogPosts(active === "All" ? undefined : active)
      .then((data) => setPosts(data.results))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [active]);

  const featured = posts[0];
  const rest = active === "All" ? posts.slice(1) : posts;
  const showFeatured = active === "All";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#081A04" }}>
        <p style={{ color: "#9199A5" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
            >
              Writing
            </span>
            <h1
              className="mt-2 mb-3"
              style={{ color: "#F2F2F2", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
            >
              Blog
            </h1>
            <p style={{ color: "#9199A5", maxWidth: "500px" }}>
              Thoughts, tutorials, and deep dives on agentic AI, MLOps, and data engineering.
            </p>
          </div>
          <button
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded text-xs transition-all duration-200"
            style={{
              border: "1px solid rgba(164, 251, 204, 0.2)",
              color: "#9199A5",
              background: "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
          >
            <Rss size={12} /> RSS Feed
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="text-sm px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                background: active === cat ? "#A4FBCC" : "rgba(164, 251, 204, 0.06)",
                color: active === cat ? "#081A04" : "#9199A5",
                border: active === cat ? "none" : "1px solid rgba(164, 251, 204, 0.15)",
                fontWeight: active === cat ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {showFeatured && featured && (
          <div className="mb-8">
            <BlogCard post={featured} large />
          </div>
        )}

        {/* Post Grid */}
        {(showFeatured ? rest : posts).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(showFeatured ? rest : posts).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p style={{ color: "#9199A5" }}>No posts in this category yet.</p>
          </div>
        )}

        {/* Newsletter CTA (unchanged) */}
        <div
          className="mt-16 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.12)" }}
        >
          <div>
            <h3 style={{ color: "#F2F2F2", fontWeight: 700, marginBottom: "4px" }}>
              Stay in the loop
            </h3>
            <p className="text-sm" style={{ color: "#9199A5" }}>
              Get new articles on agentic AI and MLOps delivered to your inbox.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-56 px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: "rgba(8, 26, 4, 0.8)",
                border: "1px solid rgba(164, 251, 204, 0.2)",
                color: "#F2F2F2",
              }}
            />
            <button
              className="px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
              style={{
                background: "#A4FBCC",
                color: "#081A04",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}