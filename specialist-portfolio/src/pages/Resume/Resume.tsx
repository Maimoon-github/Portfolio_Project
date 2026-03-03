// specialist-portfolio/src/pages/Resume/Resume.tsx

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/DataTable';
import styles from './Resume.module.css';

// Types
export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

// Mock data – realistic for a specialist
const competencies: string[] = [
  'Python', 'TypeScript', 'React', 'Node.js', 'LangChain',
  'LLM Ops', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL',
  'TensorFlow', 'FastAPI', 'Next.js', 'GraphQL', 'Redis',
];

const stack: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['TypeScript/JavaScript', 'Python', 'Rust', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Node.js', 'LangChain', 'FastAPI', 'TensorFlow'],
  },
  {
    category: 'AI/ML',
    skills: ['LLM Ops', 'RAG', 'Agentic Workflows', 'Fine-tuning', 'Evaluation'],
  },
  {
    category: 'Infrastructure',
    skills: ['Docker', 'Kubernetes', 'AWS (Lambda, SageMaker)', 'PostgreSQL', 'Redis'],
  },
];

// Flatten skills into rows for DataTable
const skillRows = stack.flatMap((cat) =>
  cat.skills.map((skill) => ({ category: cat.category, skill }))
);

const experiences: Experience[] = [
  {
    role: 'Senior AI Engineer',
    company: 'Agentic Systems',
    companyUrl: '/work/projects?company=agentic-systems',
    startDate: '2023-01',
    endDate: 'Present',
    description: [
      'Architected agentic workflows that automated 40% of manual reporting tasks, saving 20+ hours per week for client teams.',
      'Led development of a RAG-based knowledge assistant deployed to 5 enterprise customers, achieving 94% answer accuracy.',
      'Designed and implemented evaluation frameworks for LLM outputs, reducing hallucinations by 35% through prompt engineering and retrieval tuning.',
      'Mentored 4 junior engineers and established code review practices that reduced production bugs by 25%.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Digital Innovations',
    companyUrl: '/work/projects?company=digital-innovations',
    startDate: '2020-06',
    endDate: '2022-12',
    description: [
      'Built scalable web applications using React, Node.js, and PostgreSQL, serving 50k+ monthly active users.',
      'Migrated legacy monolith to microservices architecture, improving deployment frequency by 200% and reducing incident recovery time by 60%.',
      'Implemented real-time dashboards with WebSockets and D3, increasing user engagement by 30%.',
      'Collaborated with product and design to ship features that grew annual recurring revenue by $1.2M.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Labs',
    companyUrl: '/work/projects?company=creative-labs',
    startDate: '2018-09',
    endDate: '2020-05',
    description: [
      'Developed responsive React components and maintained design system used across 12+ client projects.',
      'Optimized bundle size and performance, achieving Lighthouse scores >95 on mobile and desktop.',
      'Introduced TypeScript to the codebase, reducing runtime errors by 40% and improving developer experience.',
      'Collaborated in agile team to deliver features on tight deadlines with 95% on-time delivery rate.',
    ],
  },
];

const achievements = [
  {
    title: 'Open Source Contribution: LangChain',
    link: 'https://github.com/langchain-ai/langchain/pull/1234',
    description: 'Added callback handlers for better observability in agentic workflows.',
  },
  {
    title: 'Conference Talk: "Building Reliable Agents"',
    link: '/mind/blog/agentic-reliability-talk',
    description: 'Presented at AI Engineer Summit 2024 on testing strategies for LLM applications.',
  },
  {
    title: 'Published: "RAG Pipeline Design Patterns"',
    link: '/mind/docs/rag-patterns',
    description: 'Comprehensive guide adopted by 5+ teams in production.',
  },
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services',
    date: '2024',
  },
  {
    name: 'LangChain for Production',
    issuer: 'DeepLearning.AI',
    date: '2024',
  },
  {
    name: 'Meta Front-End Developer Certificate',
    issuer: 'Coursera',
    date: '2023',
  },
];

/**
 * Resume page – "Capabilities & Trajectory"
 * Structured timeline with quantifiable impact, core competencies,
 * technical stack (displayed as DataTable), and print‑optimized styles.
 */
const Resume = memo(() => {
  return (
    <>
      <Helmet>
        <title>Resume & Technical Expertise | The Data Specialist</title>
        <meta
          name="description"
          content="Explore the technical stack, professional history, and key achievements of a Developer and AI Engineer with a focus on impact and scalability."
        />
      </Helmet>

      <main className={styles.resume}>
        {/* Header */}
        <SectionContainer id="resume-header" paddingSize="lg" backgroundVariant="default">
          <div className={styles.downloadContainer}>
            <Button variant="accent" size="md" as="a" href="/resume.pdf" download>
              Download as PDF
            </Button>
          </div>
          <div className={styles.header}>
            <h1 className={styles.header__title}>Capabilities & Trajectory</h1>
            <p className={styles.header__subtitle}>Quantifiable impact, continuous growth.</p>
          </div>
        </SectionContainer>

        {/* Core Competencies */}
        <SectionContainer id="competencies" paddingSize="md" backgroundVariant="default">
          <div className={styles.competencies}>
            {competencies.map((skill) => (
              <span key={skill} className={styles.competency__tag}>
                {skill}
              </span>
            ))}
          </div>
        </SectionContainer>

        {/* Technical Stack (DataTable) + Certifications (2‑col) */}
        <SectionContainer id="stack-cert" paddingSize="md" backgroundVariant="default">
          <div className={styles.grid2}>
            {/* Stack as DataTable */}
            <div>
              <h2 className={styles.sectionHeader}>Technical Stack</h2>
              <div className={styles.tableWrapper}>
                <DataTable
                  columns={[
                    { key: 'category', header: 'Category' },
                    { key: 'skill', header: 'Skill' },
                  ]}
                  data={skillRows}
                  caption="Technical skills by category"
                />
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className={styles.sectionHeader}>Certifications</h2>
              <ul className={styles.certifications}>
                {certifications.map((cert) => (
                  <li key={cert.name} className={styles.certification}>
                    <h3 className={styles.certification__name}>{cert.name}</h3>
                    <span className={styles.certification__issuer}>{cert.issuer}</span>
                    <span className={styles.certification__date}>{cert.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionContainer>

        {/* Professional History (Timeline) */}
        <SectionContainer id="history" paddingSize="lg" backgroundVariant="default">
          <h2 className={styles.sectionHeader}>Professional History</h2>
          <div className={styles.timeline}>
            {experiences.map((exp, idx) => (
              <div key={idx} className={styles.timeline__item}>
                <div className={styles.timeline__meta}>
                  <h3 className={styles.timeline__role}>{exp.role}</h3>
                  {exp.companyUrl ? (
                    <Link to={exp.companyUrl} className={styles.timeline__company}>
                      @ {exp.company}
                    </Link>
                  ) : (
                    <span className={styles.timeline__company}>{exp.company}</span>
                  )}
                  <span className={styles.timeline__date}>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <ul className={styles.timeline__description}>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Key Achievements & Publications */}
        <SectionContainer id="achievements" paddingSize="lg" backgroundVariant="surface">
          <h2 className={styles.sectionHeader}>Key Achievements & Publications</h2>
          <ul className={styles.achievements}>
            {achievements.map((item, idx) => (
              <li key={idx} className={styles.achievement}>
                <h3 className={styles.achievement__title}>{item.title}</h3>
                <p>{item.description}</p>
                <Link to={item.link} className={styles.achievement__link}>
                  Read more →
                </Link>
              </li>
            ))}
          </ul>
        </SectionContainer>
      </main>
    </>
  );
});

Resume.displayName = 'Resume';
export default Resume;