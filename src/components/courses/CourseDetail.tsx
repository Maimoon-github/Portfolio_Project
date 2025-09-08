import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Users, BookOpen } from 'lucide-react';
import { useApi } from '../../services/api';
import { useApiCall, useUserTracking } from '../../services/hooks';

export function CourseDetail({ slug, onBack }: { slug: string; onBack: () => void }) {
  const { client } = useApi();
  const { data: course, loading } = useApiCall(() => client.getCourse(slug), [slug]);
  const { trackContentView } = useUserTracking();

  useEffect(() => { trackContentView('course', slug); }, [slug, trackContentView]);

  if (loading || !course) {
    return <div className="py-20 text-center" style={{ color: 'var(--text-secondary)' }}>Loading course...</div>;
  }

  const c: any = course;
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--primary-dark)' }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 text-sm font-medium" style={{ color: 'var(--text-accent)' }}>← Back to Courses</button>
        <motion.h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--light-text)' }}>{c.title}</motion.h1>
        {c.subtitle && <p className="mb-4" style={{ color: 'var(--light-text-60)' }}>{c.subtitle}</p>}
        <div className="flex items-center gap-4 text-sm mb-6" style={{ color: 'var(--light-text-60)' }}>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{c.duration_hours || 0} hours</span>
          <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{c.lesson_count || 0} lessons</span>
          <span className="flex items-center gap-1"><Users className="h-4 w-4" />{c.enrollment_count || 0} students</span>
        </div>
        <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: c.content || c.description || '' }} />
      </div>
    </section>
  );
}
