// specialist-portfolio/src/data/blog.ts

import type { BlogPost } from '@/types/blog.types';

export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'building-agentic-workflows',
    title: 'Building Agentic Workflows: A Practical Guide',
    excerpt: 'Learn how to design and implement autonomous agent systems with reliability and observability.',
    content: `
      <h2>Introduction</h2>
      <p>Agentic workflows represent a paradigm shift in automation. Unlike traditional deterministic systems, agents can reason, plan, and adapt.</p>
      
      <h2>Key Design Principles</h2>
      <ul>
        <li><strong>Observability:</strong> Every decision must be traceable.</li>
        <li><strong>Fallback Mechanisms:</strong> Agents should degrade gracefully.</li>
        <li><strong>Human-in-the-loop:</strong> Critical decisions still require human approval.</li>
      </ul>
      
      <pre><code class="language-python">from langchain.agents import create_react_agent\n\nagent = create_react_agent(\n    tools=[search_tool, calculator],\n    llm=ChatOpenAI(model="gpt-4")\n)</code></pre>
      
      <h2>Conclusion</h2>
      <p>The next frontier is multi‑agent collaboration – systems where agents debate, critique, and improve each other's outputs.</p>
    `,
    meta: {
      date: '2025-04-15',
      readTime: '8 min',
      category: 'ai-strategy',
    },
    featured: true,
    image: '/images/blog/agentic-workflows.jpg',
    imageAlt: 'Agentic workflow diagram',
  },
  {
    slug: 'llm-ops-best-practices',
    title: 'LLM Ops Best Practices for 2025',
    excerpt: 'Production‑ready strategies for monitoring, versioning, and evaluating LLMs.',
    content: `
      <h2>Introduction</h2>
      <p>Moving LLMs from prototype to production requires a robust operational framework.</p>
      
      <h2>Monitoring</h2>
      <p>Track token usage, latency, and output quality metrics. Set up alerts for anomalies.</p>
      
      <h2>Versioning</h2>
      <p>Prompt templates, model weights, and evaluation datasets all need version control.</p>
    `,
    meta: {
      date: '2025-04-02',
      readTime: '6 min',
      category: 'engineering',
    },
    featured: false,
  },
  {
    slug: 'scaling-python-services',
    title: 'Scaling Python Services with Async and Workers',
    excerpt: 'Techniques for building high‑performance Python services.',
    content: `
      <h2>Async vs. Workers</h2>
      <p>Use async I/O for I/O‑bound tasks, worker processes for CPU‑bound workloads.</p>
      
      <h2>Case Study</h2>
      <p>A FastAPI service handling 10k req/s with async and background workers.</p>
    `,
    meta: {
      date: '2025-03-20',
      readTime: '5 min',
      category: 'engineering',
    },
    featured: false,
  },
  {
    slug: 'typescript-architecture-patterns',
    title: 'TypeScript Architecture Patterns for 2025',
    excerpt: 'Modern patterns for scalable TypeScript applications.',
    content: `
      <h2>Domain‑Driven Design</h2>
      <p>Organize code by domain, not technical layers.</p>
      
      <h2>Type‑Safe Dependency Injection</h2>
      <p>Use branded types and factory functions.</p>
    `,
    meta: {
      date: '2025-03-10',
      readTime: '7 min',
      category: 'engineering',
    },
    featured: false,
  },
  {
    slug: 'no-code-vs-custom-automation',
    title: 'No‑Code vs Custom Automation: When to Build',
    excerpt: 'Decision framework for choosing between no‑code tools and custom development.',
    content: `
      <h2>The Spectrum</h2>
      <p>From Zapier to bespoke Python scripts – each has tradeoffs.</p>
      
      <h2>Decision Matrix</h2>
      <p>Consider complexity, scale, maintenance, and team skills.</p>
    `,
    meta: {
      date: '2025-02-28',
      readTime: '4 min',
      category: 'automation',
    },
    featured: false,
  },
  {
    slug: 'technical-content-as-marketing',
    title: 'Technical Content as Marketing: A Strategy',
    excerpt: 'How to use blog posts and tutorials to attract developer audiences.',
    content: `
      <h2>Why Technical Content?</h2>
      <p>Developers trust peers who share deep knowledge.</p>
      
      <h2>SEO Strategy</h2>
      <p>Target long‑tail questions and specific problems.</p>
    `,
    meta: {
      date: '2025-02-15',
      readTime: '5 min',
      category: 'digital-growth',
    },
    featured: false,
  },
];