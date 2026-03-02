/**
 * resume.ts
 * Typed resume data store.
 * All data matches the ResumeData interface from '@/types/resume.types'.
 */

import type { ResumeData } from '@/types/resume.types';

export const resumeData: ResumeData = {
  competencies: [
    'Python', 'TypeScript', 'React', 'Node.js', 'LangChain',
    'LLM Ops', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL',
    'TensorFlow', 'FastAPI', 'Next.js', 'GraphQL', 'Redis',
  ],
  stack: [
    {
      category: 'Languages',
      items: ['TypeScript/JavaScript', 'Python', 'Rust', 'SQL', 'HTML/CSS'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Node.js', 'LangChain', 'FastAPI', 'TensorFlow'],
    },
    {
      category: 'AI/ML',
      items: ['LLM Ops', 'RAG', 'Agentic Workflows', 'Fine-tuning', 'Evaluation'],
    },
    {
      category: 'Infrastructure',
      items: ['Docker', 'Kubernetes', 'AWS (Lambda, SageMaker)', 'PostgreSQL', 'Redis'],
    },
  ],
  history: [
    {
      role: 'Senior AI Engineer',
      company: 'Agentic Systems',
      companyLink: '/work/projects?company=agentic-systems',
      period: '2023‑Present',
      achievements: [
        'Architected agentic workflows that automated 40% of manual reporting tasks, saving 20+ hours per week for client teams.',
        'Led development of a RAG‑based knowledge assistant deployed to 5 enterprise customers, achieving 94% answer accuracy.',
        'Designed and implemented evaluation frameworks for LLM outputs, reducing hallucinations by 35%.',
        'Mentored 4 junior engineers, improving team velocity by 25%.',
      ],
    },
    {
      role: 'Full‑Stack Developer',
      company: 'Digital Innovations',
      companyLink: '/work/projects?company=digital-innovations',
      period: '2020‑2022',
      achievements: [
        'Built scalable web applications serving 50k+ monthly active users.',
        'Migrated legacy monolith to microservices, improving deployment frequency by 200%.',
        'Implemented real‑time dashboards, increasing user engagement by 30%.',
        'Grew annual recurring revenue by $1.2M through new features.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Creative Labs',
      companyLink: '/work/projects?company=creative-labs',
      period: '2018‑2020',
      achievements: [
        'Developed React components and maintained design system across 12+ projects.',
        'Achieved Lighthouse scores >95 through performance optimization.',
        'Introduced TypeScript, reducing runtime errors by 40%.',
      ],
    },
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'M.Sc. Computer Science (AI Specialization)',
      period: '2016‑2018',
      location: 'Berlin, Germany',
    },
    {
      institution: 'University of Applied Sciences',
      degree: 'B.Sc. Software Engineering',
      period: '2013‑2016',
      location: 'Munich, Germany',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2024',
      credentialId: 'AWS‑PRO‑12345',
    },
    {
      name: 'LangChain for Production',
      issuer: 'DeepLearning.AI',
      date: '2024',
    },
    {
      name: 'Meta Front‑End Developer Certificate',
      issuer: 'Coursera',
      date: '2023',
    },
  ],
  publications: [
    {
      title: 'Building Agentic Workflows: A Practical Guide',
      link: '/mind/blog/building-agentic-workflows',
    },
    {
      title: 'LLM Ops Best Practices for 2025',
      link: '/mind/blog/llm-ops-best-practices',
    },
    {
      title: 'RAG Evaluation Framework',
      link: '/mind/docs/rag-evaluation',
    },
  ],
};