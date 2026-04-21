import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Clock, Tag, ChevronRight, Search } from "lucide-react";
import { blogPosts, BLOG_CATEGORIES } from "../data/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesCat = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featured = blogPosts[0];

  return (
    <main style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full -top-20 right-0 opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #7eb8f7 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            Writing
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0e6d3", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            The Blog
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "rgba(240,230,211,0.55)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "36rem" }}>
            Deep technical writing on LLMs, MLOps, mathematics, and the craft of building intelligent systems that ship to production.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="relative rounded-3xl overflow-hidden" style={{ backgroundColor: "#1c1b1b" }}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden h-64 lg:h-auto min-h-72">
                    <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, #1c1b1b 100%)" }} />
                    <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to bottom, transparent 50%, #1c1b1b 100%)" }} />
                    <div className="absolute top-5 left-5">
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: "rgba(255,198,139,0.15)", color: "#ffc68b", border: "1px solid rgba(255,198,139,0.2)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em" }}>
                        FEATURED
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{featured.category}</span>
                      <span style={{ color: "rgba(240,230,211,0.25)" }}>·</span>
                      <span style={{ color: "rgba(240,230,211,0.4)", fontSize: "0.78rem" }} className="flex items-center gap-1">
                        <Clock size={12} /> {featured.readingTime} min read
                      </span>
                    </div>
                    <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: "0.75rem" }}>
                      {featured.title}
                    </h2>
                    <p style={{ color: "#ffc68b", fontSize: "0.95rem", fontStyle: "italic", marginBottom: "1rem" }}>{featured.subtitle}</p>
                    <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }} className="line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featured.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: "#201f1f", color: "rgba(240,230,211,0.5)", border: "1px solid rgba(84,68,52,0.15)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2" style={{ color: "#ffc68b", fontWeight: 600, fontSize: "0.9rem" }}>
                      Read Article <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search */}
      <section style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    backgroundColor: activeCategory === cat ? "rgba(255,198,139,0.12)" : "transparent",
                    color: activeCategory === cat ? "#ffc68b" : "rgba(240,230,211,0.5)",
                    border: activeCategory === cat ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(240,230,211,0.08)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,230,211,0.3)" }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "#201f1f",
                  color: "#f0e6d3",
                  border: "1px solid rgba(84,68,52,0.2)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  width: "220px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-16" style={{ backgroundColor: "#131313" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p style={{ color: "rgba(240,230,211,0.35)", fontSize: "1rem" }}>No articles match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <div className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300" style={{ backgroundColor: "#1c1b1b" }}>
                      {/* Cover */}
                      <div className="relative overflow-hidden h-48 flex-shrink-0">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #1c1b1b 100%)" }} />
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ backgroundColor: "rgba(19,19,19,0.7)", backdropFilter: "blur(8px)" }}>
                          <Clock size={11} style={{ color: "rgba(240,230,211,0.5)" }} />
                          <span style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.72rem" }}>{post.readingTime} min</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5 pt-4">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            {post.category}
                          </span>
                          <span style={{ color: "rgba(240,230,211,0.25)" }}>·</span>
                          <span style={{ color: "rgba(240,230,211,0.35)", fontSize: "0.75rem" }}>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>

                        <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "#f0e6d3", letterSpacing: "-0.01em", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                          {post.title}
                        </h2>
                        <p style={{ color: "rgba(240,230,211,0.45)", fontSize: "0.82rem", lineHeight: 1.65 }} className="line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-md" style={{ backgroundColor: "#201f1f", color: "rgba(240,230,211,0.4)", fontSize: "0.7rem", border: "1px solid rgba(84,68,52,0.12)" }}>
                              <Tag size={9} /> {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Newsletter</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Stay in the Loop
            </h2>
            <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Deep-dives on LLMs, RAG, and ML systems — no fluff, no rehashed tutorials. About 2 articles per month.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl outline-none"
                style={{ backgroundColor: "#201f1f", color: "#f0e6d3", border: "1px solid rgba(84,68,52,0.2)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)", color: "#1a0e00", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap" }}
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
