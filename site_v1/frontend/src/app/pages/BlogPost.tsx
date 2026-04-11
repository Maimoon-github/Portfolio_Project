// src/app/pages/BlogPost.tsx

import { useParams, Link } from 'react-router-dom';
import { useWagtailBlogPost } from '../hooks/useBlog';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import type { CmsBlock } from '../types/api';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useWagtailBlogPost(slug);

  if (loading) return <BlogPostSkeleton />;

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">
          {error || 'Post not found.'}
        </p>
        <Link to="/blog" className="underline text-sm">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const imageId = post.featured_image?.id;
const heroUrl = imageId ? `/api/cms/v2/images/${imageId}/` : null;

  return (
    <article className="min-h-screen bg-background">
      {heroUrl && (
        <div className="w-full max-h-[480px] overflow-hidden">
          <img
            src={heroUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">{post.title}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.category && <Badge variant="secondary">{post.category}</Badge>}
          {post.tags.map((tag) => (
            <Link key={tag} to={`/blog?tag=${tag}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 py-4 border-y border-border mb-10">
          {post.author?.photo_url && (
            <img
              src={post.author.photo_url}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            {post.author && <p className="font-medium text-sm">{post.author.name}</p>}
            <p className="text-xs text-muted-foreground">
              {new Date(post.date_published).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
              {' · '}
              {post.reading_time_minutes} min read
            </p>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.body.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>

        {post.author?.bio && (
          <div className="mt-16 p-6 rounded-xl border border-border bg-card flex gap-4">
            {post.author.photo_url && (
              <img
                src={post.author.photo_url}
                alt={post.author.name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
              <div className="flex gap-3 mt-2">
                {post.author.github && (
                  <a href={post.author.github} target="_blank" rel="noreferrer"
                     className="text-xs underline text-muted-foreground hover:text-foreground">
                    GitHub
                  </a>
                )}
                {post.author.linkedin && (
                  <a href={post.author.linkedin} target="_blank" rel="noreferrer"
                     className="text-xs underline text-muted-foreground hover:text-foreground">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← All posts
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── StreamField block renderer ─────────────────────────────────────
function BlockRenderer({ block }: { block: CmsBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="text-2xl font-bold mt-10 mb-4">{block.value}</h2>;
    case 'subheading':
      return <h3 className="text-xl font-semibold mt-8 mb-3">{block.value}</h3>;
    case 'paragraph':
      return (
        <div
          className="mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );
    case 'image':
      return (
        <figure className={`my-8 ${block.value.alignment === 'center' ? 'text-center' : ''}`}>
          <img
            src={`/api/cms/v2/images/${block.value.image}/`}
            alt={block.value.caption}
            className="rounded-lg max-w-full mx-auto"
          />
          {block.value.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2">
              {block.value.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary pl-6 my-8 italic">
          <p className="text-lg">{block.value.text}</p>
          {block.value.attribution && (
            <cite className="text-sm text-muted-foreground not-italic mt-2 block">
              — {block.value.attribution}
            </cite>
          )}
        </blockquote>
      );
    case 'code':
      return (
        <div className="my-6 rounded-lg overflow-hidden border border-border">
          {block.value.filename && (
            <div className="px-4 py-2 bg-muted text-xs text-muted-foreground font-mono border-b border-border">
              {block.value.filename}
            </div>
          )}
          <pre className="p-4 overflow-x-auto bg-card">
            <code className={`language-${block.value.language} text-sm`}>
              {block.value.code}
            </code>
          </pre>
        </div>
      );
    case 'callout':
      const calloutStyles = {
        info: 'bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
        warning: 'bg-yellow-50 border-yellow-300 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100',
        success: 'bg-green-50 border-green-300 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100',
        danger: 'bg-red-50 border-red-300 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
      };
      return (
        <div className={`my-6 p-4 rounded-lg border ${calloutStyles[block.value.type]}`}>
          <div dangerouslySetInnerHTML={{ __html: block.value.text }} />
        </div>
      );
    case 'embed':
      return (
        <div className="my-8 aspect-video">
          <iframe
            src={block.value}
            className="w-full h-full rounded-lg border border-border"
            allowFullScreen
            title="Embedded content"
          />
        </div>
      );
    default:
      return null;
  }
}

// ─── Loading skeleton ───────────────────────────────────────────────
function BlogPostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 space-y-6">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-3/4" />
      <div className="flex gap-4 py-4 border-y border-border">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className={`h-4 w-${i % 2 === 0 ? 'full' : '5/6'}`} />
      ))}
    </div>
  );
}