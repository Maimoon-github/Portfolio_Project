// import { BlogPost } from '@/app/pages/BlogPost';

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   return {
//     title: slug
//       .split('-')
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//       .join(' '),
//   };
// }

// export default async function BlogPostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   return <BlogPost slug={slug} />;
// }




// 'use client';

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
// import { PROFILE } from "../data";
// import { BlogCard } from "../components/BlogCard";
// import { getBlogPost, getBlogPosts } from "../services/api";
// import { PostDetail, PostList } from "../types/api";

// export function BlogPost({ slug }: { slug: string }) {
//   const [post, setPost] = useState<PostDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [related, setRelated] = useState<PostList[]>([]);

//   useEffect(() => {
//     if (!slug) return;
//     setLoading(true);
//     getBlogPost(slug)
//       .then((data) => {
//         setPost(data);
//         const fetchedPost = data;
//         return getBlogPosts().then((allPosts) => {
//           const filtered = allPosts.results.filter(
//             (p) => p.slug !== slug && p.category?.name === fetchedPost.category?.name
//           );
//           setRelated(filtered.slice(0, 3));
//         });
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: "#081A04" }}>
//         <p style={{ color: "#9199A5" }}>Loading...</p>
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#081A04" }}>
//         <p style={{ color: "#9199A5" }}>Post not found.</p>
//         <Link href="/blog" className="mt-4 text-sm" style={{ color: "#A4FBCC", textDecoration: "none" }}>
//           ← Back to Blog
//         </Link>
//       </div>
//     );
//   }

//   const CATEGORY_COLORS: Record<string, string> = {
//     "AI/ML": "#A4FBCC",
//     "MLOps": "#7DD3FC",
//     "Tutorials": "#FCD34D",
//     "Career": "#F9A8D4",
//     "DevOps": "#C4B5FD",
//   };
//   const categoryName = post.category?.name || "Uncategorized";
//   const catColor = CATEGORY_COLORS[categoryName] || "#A4FBCC";

//   const formattedDate = post.publish_date
//     ? new Date(post.publish_date).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       })
//     : "";

//   const readTimeText = post.read_time ? `${post.read_time} min read` : "";

//   const tagNames = post.tags?.map((tag: { name: string }) => tag.name) || [];

//   // Simple markdown renderer (unchanged)
//   const renderBody = (body: string) => {
//     const lines = body.trim().split("\n");
//     const elements: React.ReactNode[] = [];
//     let i = 0;

//     while (i < lines.length) {
//       const line = lines[i];

//       if (line.startsWith("## ")) {
//         elements.push(
//           <h2
//             key={i}
//             className="mt-8 mb-4"
//             style={{
//               color: "#F2F2F2",
//               fontSize: "1.2rem",
//               fontWeight: 700,
//               borderLeft: "3px solid #A4FBCC",
//               paddingLeft: "12px",
//             }}
//           >
//             {line.slice(3)}
//           </h2>
//         );
//       } else if (line.startsWith("### ")) {
//         elements.push(
//           <h3
//             key={i}
//             className="mt-6 mb-3"
//             style={{ color: "#F2F2F2", fontSize: "1rem", fontWeight: 600 }}
//           >
//             {line.slice(4)}
//           </h3>
//         );
//       } else if (line.startsWith("```")) {
//         const lang = line.slice(3);
//         const codeLines: string[] = [];
//         i++;
//         while (i < lines.length && !lines[i].startsWith("```")) {
//           codeLines.push(lines[i]);
//           i++;
//         }
//         elements.push(
//           <div
//             key={i}
//             className="my-5 rounded-xl overflow-hidden"
//             style={{ border: "1px solid rgba(164, 251, 204, 0.15)" }}
//           >
//             {lang && (
//               <div
//                 className="px-4 py-2 text-xs"
//                 style={{
//                   background: "rgba(164, 251, 204, 0.08)",
//                   color: "#9199A5",
//                   fontFamily: "'Space Mono', monospace",
//                   borderBottom: "1px solid rgba(164, 251, 204, 0.1)",
//                 }}
//               >
//                 {lang}
//               </div>
//             )}
//             <pre
//               className="p-4 overflow-x-auto"
//               style={{
//                 background: "#000000",
//                 color: "#A4FBCC",
//                 fontFamily: "'Space Mono', monospace",
//                 fontSize: "0.8rem",
//                 lineHeight: 1.6,
//                 margin: 0,
//               }}
//             >
//               <code>{codeLines.join("\n")}</code>
//             </pre>
//           </div>
//         );
//       } else if (line.startsWith("- ")) {
//         const bullets: string[] = [];
//         while (i < lines.length && lines[i].startsWith("- ")) {
//           bullets.push(lines[i].slice(2));
//           i++;
//         }
//         elements.push(
//           <ul key={i} className="my-4 flex flex-col gap-2 pl-4">
//             {bullets.map((b, bi) => (
//               <li key={bi} className="flex items-start gap-2 text-sm" style={{ color: "#9199A5" }}>
//                 <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#A4FBCC" }} />
//                 <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#F2F2F2">$1</strong>') }} />
//               </li>
//             ))}
//           </ul>
//         );
//         continue;
//       } else if (line.trim() !== "") {
//         elements.push(
//           <p
//             key={i}
//             className="my-3 leading-relaxed text-sm"
//             style={{ color: "#9199A5" }}
//             dangerouslySetInnerHTML={{
//               __html: line
//                 .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#F2F2F2">$1</strong>')
//                 .replace(/`(.*?)`/g, `<code style="background:rgba(164,251,204,0.08);color:#A4FBCC;padding:1px 6px;border-radius:4px;font-family:Space Mono,monospace;font-size:0.8rem">$1</code>`),
//             }}
//           />
//         );
//       }

//       i++;
//     }

//     return elements;
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
//       <div className="max-w-3xl mx-auto px-6">
//         {/* Back */}
//         <Link
//           href="/blog"
//           className="inline-flex items-center gap-2 text-sm mb-8 transition-colors duration-200"
//           style={{ color: "#9199A5", textDecoration: "none" }}
//           onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
//           onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//         >
//           <ArrowLeft size={14} /> Back to Blog
//         </Link>

//         {/* Article Header */}
//         <article>
//           <header className="mb-8">
//             <span
//               className="text-xs px-2 py-1 rounded mb-4 inline-block"
//               style={{
//                 background: `${catColor}14`,
//                 color: catColor,
//                 border: `1px solid ${catColor}30`,
//                 fontFamily: "'Space Mono', monospace",
//               }}
//             >
//               {categoryName}
//             </span>
//             <h1
//               className="mb-4"
//               style={{
//                 color: "#F2F2F2",
//                 fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
//                 fontWeight: 700,
//                 lineHeight: 1.2,
//               }}
//             >
//               {post.title}
//             </h1>
//             <p className="text-base mb-6" style={{ color: "#9199A5" }}>
//               {post.excerpt}
//             </p>

//             {/* Byline */}
//             <div
//               className="flex flex-wrap items-center gap-4 py-4 px-5 rounded-xl"
//               style={{
//                 background: "#1B3022",
//                 border: "1px solid rgba(164, 251, 204, 0.1)",
//               }}
//             >
//               <div className="flex items-center gap-2">
//                 <div
//                   className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
//                   style={{ background: "#A4FBCC", color: "#081A04" }}
//                 >
//                   {PROFILE.initials}
//                 </div>
//                 <div>
//                   <p className="text-xs" style={{ color: "#F2F2F2", fontWeight: 600 }}>{PROFILE.name}</p>
//                   <p className="text-xs" style={{ color: "#9199A5" }}>{PROFILE.title}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 text-xs ml-auto" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
//                 <span className="flex items-center gap-1">
//                   <Calendar size={11} /> {formattedDate}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Clock size={11} /> {readTimeText}
//                 </span>
//               </div>
//             </div>
//           </header>

//           {/* Article Body (use content) */}
//           <div className="prose-custom">
//             {renderBody(post.content)}
//           </div>

//           {/* Tags */}
//           <div
//             className="flex flex-wrap gap-2 mt-10 pt-6"
//             style={{ borderTop: "1px solid rgba(164, 251, 204, 0.08)" }}
//           >
//             <Tag size={13} style={{ color: "#9199A5", marginTop: "2px" }} />
//             {tagNames.map((tag: string) => (
//               <span key={tag} className="tech-tag">{tag}</span>
//             ))}
//           </div>
//         </article>

//         {/* Author Bio Box (unchanged) */}
//         <div
//           className="mt-10 p-6 rounded-xl"
//           style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.12)" }}
//         >
//           <div className="flex items-start gap-4">
//             <div
//               className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
//               style={{ background: "#A4FBCC", color: "#081A04" }}
//             >
//               {PROFILE.initials}
//             </div>
//             <div>
//               <h4 style={{ color: "#F2F2F2", fontWeight: 700, marginBottom: "4px" }}>{PROFILE.name}</h4>
//               <p className="text-xs mb-3" style={{ color: "#A4FBCC" }}>{PROFILE.title}</p>
//               <p className="text-sm" style={{ color: "#9199A5" }}>
//                 {PROFILE.bio}
//               </p>
//               <div className="flex gap-3 mt-3">
//                 <Link href="/contact" className="text-xs" style={{ color: "#A4FBCC", textDecoration: "none" }}>
//                   Get in Touch →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Posts */}
//         {related.length > 0 && (
//           <div className="mt-16">
//             <h2 className="mb-6" style={{ color: "#F2F2F2", fontSize: "1.2rem", fontWeight: 700 }}>
//               Related Posts
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               {related.slice(0, 2).map((p) => (
//                 <BlogCard key={p.id} post={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





































// ----------------------------------------------------------------------------
// ============================================================================
// ----------------------------------------------------------------------------





























import { getBlogPost, getBlogPosts } from '@/services/api';
import { BlogCard } from '@/components/shared/BlogCard';
import { MarkdownContent } from '@/components/blog/MarkdownContent';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROFILE } from '@/app/data';
import type { PostDetail, PostList } from '@/app/types/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug) as PostDetail;
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: PostDetail | null = null;
  let related: PostList[] = [];
  let error = false;

  try {
    post = await getBlogPost(slug) as PostDetail;
    const allPosts = await getBlogPosts();
    const postsList = allPosts.results || allPosts;
    related = postsList
      .filter((p: PostList) => p.slug !== slug && p.category?.name === post.category?.name)
      .slice(0, 2);
  } catch (err) {
    error = true;
  }

  if (error || !post) {
    notFound();
  }

  const categoryName = post.category?.name || 'Uncategorized';
  const catColorMap: Record<string, string> = {
    'AI/ML': '#A4FBCC',
    MLOps: '#7DD3FC',
    Tutorials: '#FCD34D',
    Career: '#F9A8D4',
    DevOps: '#C4B5FD',
  };
  const catColor = catColorMap[categoryName] || '#A4FBCC';

  const formattedDate = post.publish_date
    ? new Date(post.publish_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    : '';

  const tagNames = post.tags?.map((tag: { name: string }) => tag.name) || [];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-8 text-[#B0C4B0] hover:text-[#A4FBCC] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <span
              className="text-xs px-2 py-1 rounded inline-block mb-4 font-mono"
              style={{
                background: `${catColor}14`,
                color: catColor,
                border: `1px solid ${catColor}30`,
              }}
            >
              {categoryName}
            </span>
            <h1 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-base text-[#B0C4B0] mb-6">{post.excerpt}</p>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-4 py-4 px-5 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#A4FBCC] text-[#0A2E1A]">
                  {PROFILE.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{PROFILE.name}</p>
                  <p className="text-xs text-[#B0C4B0]">{PROFILE.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-[#B0C4B0] ml-auto">
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {post.read_time} min read
                </span>
              </div>
            </div>
          </header>

          {/* Markdown content */}
          <MarkdownContent content={post.content} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[rgba(164,251,204,0.08)]">
            <Tag size={13} className="text-[#B0C4B0] mt-0.5" />
            {tagNames.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[rgba(164,251,204,0.08)] text-[#A4FBCC] font-mono">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-10 p-6 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-[#A4FBCC] text-[#0A2E1A]">
              {PROFILE.initials}
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">{PROFILE.name}</h4>
              <p className="text-xs text-[#A4FBCC] mb-3">{PROFILE.title}</p>
              <p className="text-sm text-[#B0C4B0]">{PROFILE.bio}</p>
              <Link href="/contact" className="text-xs text-[#A4FBCC] hover:underline mt-3 inline-block">
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-[1.2rem] font-bold text-white mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}