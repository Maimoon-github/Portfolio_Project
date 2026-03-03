// specialist-portfolio/src/data/tools.ts

import type { Tool } from '@/types/tool.types';

export const tools: readonly Tool[] = [
  {
    slug: 'prompt-optimizer',
    name: 'Prompt Optimizer CLI',
    description: 'CLI tool to test, version, and optimize prompts for LLMs.',
    category: 'ai-prompts',
    tags: ['AI', 'CLI', 'Python', 'Testing'],
    ctaType: 'github',
    githubUrl: 'https://github.com/dataspecialist/prompt-optimizer',
    featured: true,
  },
  {
    slug: 'workflow-builder',
    name: 'Workflow Builder',
    description: 'Visual workflow builder for creating automation sequences.',
    category: 'automation',
    tags: ['React', 'Node.js', 'Drag‑and‑Drop'],
    ctaType: 'use',
    featured: false,
  },
  {
    slug: 'api-mock-server',
    name: 'API Mock Server',
    description: 'Zero‑config mock server for rapid API prototyping.',
    category: 'dev-utils',
    tags: ['Node.js', 'Express', 'Testing'],
    ctaType: 'github',
    githubUrl: 'https://github.com/dataspecialist/api-mock',
    featured: false,
  },
  {
    slug: 'content-strategy-framework',
    name: 'Content Strategy Framework',
    description: 'Templates and guides for planning technical content.',
    category: 'strategy',
    tags: ['Strategy', 'Content', 'SEO'],
    ctaType: 'use',
    featured: true,
  },
  {
    slug: 'rag-evaluator',
    name: 'RAG Evaluator',
    description: 'Evaluate retrieval‑augmented generation pipelines with custom metrics.',
    category: 'ai-prompts',
    tags: ['Python', 'RAG', 'Evaluation'],
    ctaType: 'github',
    githubUrl: 'https://github.com/dataspecialist/rag-evaluator',
    featured: false,
  },
];