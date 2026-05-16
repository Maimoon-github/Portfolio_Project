import { ProjectDetail } from '@/app/pages/ProjectDetail';

// generateMetadata provides per-project SEO titles
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // params must be awaited in Next.js 15
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}
