import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Clock } from 'lucide-react';
import { useBlogPost, useUserTracking } from '../../services/hooks';

export function BlogDetail({ slug, onBack }: { slug: string; onBack: () => void }) {
  const { data: post, loading } = useBlogPost(slug, true);
  const { trackContentView } = useUserTracking();

  useEffect(() => {
    trackContentView('blog_post', slug);
  }, [slug, trackContentView]);

  // Ensure viewport resets when opening a new post
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => {
      // No persistent listeners to clean up, but keep hook to clarify unmount behavior
    };
  }, [slug]);

  if (loading || !post) {
    return (
      <div className="py-20 text-center" style={{ color: 'var(--text-secondary)' }}>Loading article...</div>
    );
  }

  const content = (post as any).content || '';
  const author = (post as any).author?.name || 'Author';
  const date = (post as any).publish_date || (post as any).published_at || post.updated_at;
  const minutes = (post as any).reading_time_minutes || Math.ceil(content.length / 1000);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--primary-dark)' }}>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-sm font-medium"
          style={{ color: 'var(--text-accent)' }}
        >
          ← Back to Blog
        </button>

        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: 'var(--light-text)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {post.title}
        </motion.h1>

        <div className="flex items-center gap-4 text-sm mb-8" style={{ color: 'var(--light-text-60)' }}>
          <div className="flex items-center gap-1"><User className="h-4 w-4" />{author}</div>
          <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(date).toDateString()}</div>
          <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{minutes} min</div>
        </div>

        <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}
