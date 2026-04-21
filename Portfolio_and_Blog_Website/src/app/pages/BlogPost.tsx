import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Clock, Calendar, Tag, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { blogPosts, type ContentBlock } from "../data/mock-data";

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} style={{ color: "rgba(240,230,211,0.75)", fontSize: "1.02rem", lineHeight: 1.85, letterSpacing: "0.01em" }}>
                {block.text}
              </p>
            );
          case "heading":
            return block.level === 2 ? (
              <h2 key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#f0e6d3", letterSpacing: "-0.015em", paddingTop: "0.5rem" }}>
                {block.text}
              </h2>
            ) : (
              <h3 key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.15rem", color: "#f0e6d3", letterSpacing: "-0.01em" }}>
                {block.text}
              </h3>
            );
          case "code":
            return (
              <div key={i} className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0e0e0e", border: "1px solid rgba(84,68,52,0.2)" }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: "#1c1b1b", borderBottom: "1px solid rgba(84,68,52,0.15)" }}>
                  <span style={{ color: "rgba(126,184,247,0.7)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {block.language}
                  </span>
                  <div className="flex gap-1.5">
                    {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <pre className="p-5 overflow-x-auto text-sm leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: "rgba(240,230,211,0.8)", margin: 0 }}>
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          case "quote":
            return (
              <blockquote key={i} className="relative pl-6" style={{ borderLeft: "3px solid #ffc68b" }}>
                <p style={{ color: "rgba(240,230,211,0.7)", fontSize: "1.05rem", lineHeight: 1.75, fontStyle: "italic" }}>"{block.text}"</p>
                {block.author && (
                  <footer className="mt-2" style={{ color: "#ffc68b", fontSize: "0.82rem", fontWeight: 600 }}>— {block.author}</footer>
                )}
              </blockquote>
            );
          case "callout": {
            const calloutColors: Record<string, { bg: string; border: string; label: string; labelColor: string }> = {
              info: { bg: "rgba(126,184,247,0.06)", border: "rgba(126,184,247,0.2)", label: "Note", labelColor: "rgba(126,184,247,0.9)" },
              warning: { bg: "rgba(255,198,139,0.06)", border: "rgba(255,198,139,0.2)", label: "Warning", labelColor: "#ffc68b" },
              success: { bg: "rgba(74,222,128,0.06)", border: "rgba(74,222,128,0.2)", label: "Pro Tip", labelColor: "rgba(74,222,128,0.9)" },
            };
            const c = calloutColors[block.variant];
            return (
              <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
                <p className="mb-1" style={{ color: c.labelColor, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.label}</p>
                <p style={{ color: "rgba(240,230,211,0.7)", fontSize: "0.92rem", lineHeight: 1.75 }}>{block.text}</p>
              </div>
            );
          }
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-2.5 pl-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3" style={{ color: "rgba(240,230,211,0.7)", fontSize: "0.98rem", lineHeight: 1.75 }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#ffc68b" }} />
                    {item}
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const post = blogPosts[postIndex];

  if (!post) {
    return (
      <main style={{ backgroundColor: "#131313", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="text-center">
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f0e6d3", marginBottom: "1rem" }}>Article not found</h1>
          <Link to="/blog" style={{ color: "#ffc68b", fontWeight: 600 }}>← Back to Blog</Link>
        </div>
      </main>
    );
  }

  const prevPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <main style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full -top-40 left-1/2 -translate-x-1/2 opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #7eb8f7 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>

        {/* Cover image */}
        <div className="relative h-80 md:h-[420px] overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(19,19,19,0.3) 0%, rgba(19,19,19,0.95) 80%, #131313 100%)" }} />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full pb-10">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigate("/blog")}
                className="flex items-center gap-2 mb-6"
                style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.85rem", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <ArrowLeft size={15} /> All Articles
              </motion.button>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span style={{ color: "rgba(126,184,247,0.9)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "rgba(126,184,247,0.1)", padding: "0.3rem 0.75rem", borderRadius: "999px" }}>
                    {post.category}
                  </span>
                  <span style={{ color: "rgba(240,230,211,0.4)", fontSize: "0.78rem" }} className="flex items-center gap-1.5">
                    <Clock size={12} /> {post.readingTime} min read
                  </span>
                  <span style={{ color: "rgba(240,230,211,0.4)", fontSize: "0.78rem" }} className="flex items-center gap-1.5">
                    <Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  {post.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              {/* Author */}
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "#f0e6d3" }}>{post.author.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "rgba(240,230,211,0.45)" }}>{post.author.role}</p>
                  </div>
                </div>

                <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: "#1c1b1b", color: "rgba(240,230,211,0.5)", border: "1px solid rgba(84,68,52,0.12)" }}>
                      <Tag size={9} /> {tag}
                    </span>
                  ))}
                </div>

                {relatedPosts.length > 0 && (
                  <div className="mt-8">
                    <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Related</p>
                    <div className="flex flex-col gap-4">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.id} to={`/blog/${rp.slug}`} className="group">
                          <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "rgba(240,230,211,0.65)", lineHeight: 1.4 }} className="group-hover:text-[#ffc68b]! transition-colors">
                            {rp.title}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: "rgba(240,230,211,0.35)", marginTop: "0.2rem" }}>{rp.readingTime} min</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main article */}
            <article className="lg:col-span-3">
              {/* Subtitle */}
              <p style={{ color: "#ffc68b", fontSize: "1.05rem", fontStyle: "italic", marginBottom: "2rem", lineHeight: 1.6 }}>
                {post.subtitle}
              </p>

              <ContentRenderer blocks={post.content} />
            </article>
          </div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="py-12" style={{ backgroundColor: "#1c1b1b", borderTop: "1px solid rgba(84,68,52,0.12)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="group p-5 rounded-2xl" style={{ backgroundColor: "#201f1f" }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: "rgba(240,230,211,0.4)", fontSize: "0.75rem" }}>
                  <ArrowLeft size={13} /> Previous
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f0e6d3", lineHeight: 1.4 }} className="group-hover:text-[#ffc68b]! transition-colors line-clamp-2">
                  {prevPost.title}
                </p>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link to={`/blog/${nextPost.slug}`} className="group p-5 rounded-2xl text-right" style={{ backgroundColor: "#201f1f" }}>
                <div className="flex items-center justify-end gap-2 mb-2" style={{ color: "rgba(240,230,211,0.4)", fontSize: "0.75rem" }}>
                  Next <ArrowRight size={13} />
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f0e6d3", lineHeight: 1.4 }} className="group-hover:text-[#ffc68b]! transition-colors line-clamp-2">
                  {nextPost.title}
                </p>
              </Link>
            ) : <div />}
          </div>

          <div className="mt-8 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm" style={{ color: "rgba(240,230,211,0.5)", fontWeight: 500 }}>
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}