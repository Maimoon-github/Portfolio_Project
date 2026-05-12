// src/app/(marketing)/page.tsx
import { Hero } from '@/components/sections/Hero';
import dynamic from 'next/dynamic';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { portfolioData } from '@/lib/data';

// Lazy-load sections (preserved)
const About = dynamic(() => import('@/components/sections/About').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Skills = dynamic(() => import('@/components/sections/Skills').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const AgenticWorkflow = dynamic(() => import('@/components/sections/AgenticWorkflow').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Projects = dynamic(() => import('@/components/sections/Projects').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  const {
    heroSubtitle,
    titleHighlight = 'autonomous',
    heroDescription,
    about,
    skills,
    agentFrameworks,
    projects,
    contact,
    footer
  } = portfolioData;

  return (
    <main>
      <Hero
        subtitle={heroSubtitle}
        titlePrefix="Building"
        titleHighlight={titleHighlight}
        titleSuffix="intelligence"
        description={heroDescription}
        ctaPrimary="View Work"
        ctaSecondary="Get in Touch"
      />
      <About heading={about.heading} content={about.content} />
      <Skills heading={skills.heading} items={skills.items} />
      <AgenticWorkflow
        heading={agentFrameworks.heading}
        subheading={agentFrameworks.subheading}
        description={agentFrameworks.description}
        items={agentFrameworks.items}
      />
      <Projects heading={projects.heading} items={projects.items} />
      <Contact
        heading={contact.heading}
        placeholderEmail={contact.placeholderEmail}
        placeholderMessage={contact.placeholderMessage}
        buttonSubmit={contact.buttonSubmit}
        buttonSubmitted={contact.buttonSubmitted}
      />
      <Footer
        navLinks={footer.navLinks}
        copyrightName={portfolioData.name}
      />
    </main>
  );
}