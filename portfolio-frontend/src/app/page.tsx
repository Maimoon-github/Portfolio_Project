// src/app/page.tsx
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { AgenticWorkflow } from '@/components/sections/AgenticWorkflow';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

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