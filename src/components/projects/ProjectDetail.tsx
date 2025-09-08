import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { useApi } from '../../services/api';
import { useApiCall, useUserTracking } from '../../services/hooks';

export function ProjectDetail({ slug, onBack }: { slug: string; onBack: () => void }) {
  const { client } = useApi();
  const { data: project, loading } = useApiCall(() => client.getProject(slug), [slug]);
  const { trackContentView } = useUserTracking();

  useEffect(() => {
    trackContentView('project', slug);
  }, [slug, trackContentView]);

  if (loading || !project) {
    return <div className="py-20 text-center" style={{ color: 'var(--text-secondary)' }}>Loading project...</div>;
  }

  const p: any = project;
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--primary-dark)' }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 text-sm font-medium" style={{ color: 'var(--text-accent)' }}>← Back to Projects</button>
        <motion.h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--light-text)' }}>{p.title}</motion.h1>
        <div className="flex items-center gap-4 text-sm mb-6" style={{ color: 'var(--light-text-60)' }}>
          {(p.start_date || p.updated_at) && (
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(p.start_date || p.updated_at).toDateString()}</span>
          )}
          {p.github_url && (
            <a href={p.github_url} target="_blank" className="flex items-center gap-1" style={{ color: 'var(--text-accent)' }}><Github className="h-4 w-4" />GitHub</a>
          )}
          {p.live_demo_url && (
            <a href={p.live_demo_url} target="_blank" className="flex items-center gap-1" style={{ color: 'var(--text-accent)' }}><ExternalLink className="h-4 w-4" />Live</a>
          )}
        </div>
        <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: p.content || p.description || '' }} />
      </div>
    </section>
  );
}
