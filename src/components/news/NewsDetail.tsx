import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ExternalLink } from 'lucide-react';
import { useApi } from '../../services/api';
import { useApiCall, useUserTracking } from '../../services/hooks';

export function NewsDetail({ slug, onBack }: { slug: string; onBack: () => void }) {
  const { client } = useApi();
  const { data: item, loading } = useApiCall(() => client.getNewsItem(slug), [slug]);
  const { trackContentView } = useUserTracking();

  useEffect(() => { trackContentView('news', slug); }, [slug, trackContentView]);

  if (loading || !item) {
    return <div className="py-20 text-center" style={{ color: 'var(--text-secondary)' }}>Loading news...</div>;
  }
  const n: any = item;
  const date = n.publish_date || n.published_at || n.updated_at;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--secondary-dark)' }}>
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="mb-6 text-sm font-medium" style={{ color: 'var(--text-accent)' }}>← Back to News</button>
        <motion.h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--light-text)' }}>{n.title}</motion.h1>
        <div className="flex items-center gap-4 text-sm mb-6" style={{ color: 'var(--light-text-60)' }}>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(date).toDateString()}</span>
          {n.source_url && (
            <a href={n.source_url} target="_blank" className="flex items-center gap-1" style={{ color: 'var(--text-accent)' }}>
              <ExternalLink className="h-4 w-4" />Source
            </a>
          )}
        </div>
        <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: n.body || n.excerpt || '' }} />
      </div>
    </section>
  );
}
