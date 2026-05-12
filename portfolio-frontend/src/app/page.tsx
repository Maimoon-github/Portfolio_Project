// src/app/page.tsx — lazy‑load below‑the‑fold sections
import { Hero } from '@/components/sections/Hero';
import dynamic from 'next/dynamic';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <SectionSkeleton />,
});
const Skills = dynamic(() => import('@/components/sections/Skills'), {
  loading: () => <SectionSkeleton />,
});
const AgenticWorkflow = dynamic(() => import('@/components/sections/AgenticWorkflow'), {
  loading: () => <SectionSkeleton />,
});
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionSkeleton />,
});
const Footer = dynamic(() => import('@/components/sections/Footer'), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <AgenticWorkflow />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}