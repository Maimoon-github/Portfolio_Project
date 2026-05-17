'use client';

import { getProjects, getBlogPosts } from '@/services/api';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { RecentBlogPosts } from '@/components/sections/RecentBlogPosts';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { StatsSection } from '@/components/sections/StatsSection';      
import { CTASection } from '@/components/sections/CTASection';
import { HeroSection } from '@/components/sections/HeroSection';

// Metadata for SEO
export const metadata = {
  title: 'Maimoon Amin — AI Architect & MLOps Engineer',
  description:
    'Portfolio of Maimoon Amin — AI Agent Architect, MLOps Engineer, and Data Scientist specializing in multi-agent systems and production ML pipelines.',
};

export default async function HomePage() {
  // Fetch data on the server – no loading states needed, streaming is automatic
  const [projectsData, blogData] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);

  const featuredProjects = projectsData.results.filter((p) => p.featured);
  const recentPosts = blogData.results.slice(0, 3);

  return (
    <>
      <HeroSection />
      <TechMarquee />
      <ServicesSection />
      <FeaturedProjects projects={featuredProjects} />
      <StatsSection />
      <RecentBlogPosts posts={recentPosts} />
      <CTASection />
    </>
  );
}