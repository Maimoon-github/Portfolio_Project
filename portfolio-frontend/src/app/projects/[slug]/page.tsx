// src/app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { projectsData } from '@/lib/data';
import { ProjectDetailClient } from './ProjectDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata dynamically based on project slug
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.projects.find(p => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const categoryLabel = projectsData.categoryLabels[project.category] || project.category;

  return {
    title: `${project.title} | ${categoryLabel} | Alex Kern Portfolio`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: 'article',
      images: project.images?.[0]?.src ? [{ url: project.images[0].src }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.shortDescription,
    },
  };
}

// Pre‑generate all static paths at build time
export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }));
}

// Main page component (Server Component)
export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.projects.find(p => p.slug === slug);

  if (!project) {
    notFound(); // Triggers Next.js built‑in 404 page
  }

  return <ProjectDetailClient project={project} />;
}