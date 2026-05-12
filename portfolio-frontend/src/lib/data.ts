// src/lib/data.ts
import { Brain, Server, Network, Workflow } from 'lucide-react';

export interface Skill {
  icon: any; // Lucide icon component
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export interface AgentFramework {
  framework: 'langgraph' | 'autogen' | 'crewai';
  title: string;
  description: string;
  features: string[];
  position: [number, number, number];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface ContactInfo {
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export const portfolioData = {
  name: 'Alex Kern',
  title: 'Data Scientist & AI Agent Architect',
  tagline: 'Building autonomous intelligence',
  heroSubtitle: 'Data Scientist · AI Agent Architect · MLOps Engineer',
  heroDescription: 'I design agentic workflows, deploy production ML systems, and turn complex data into strategic advantage.',
  about: {
    heading: 'About Me',
    content: 'I am a Data Scientist and AI Architect focused on building autonomous agentic systems. With over 8 years of experience in machine learning and distributed systems, I help organisations transition from traditional pipelines to intelligent, self-orchestrating workflows. My approach combines rigorous data science with agentic design patterns to create resilient, adaptive AI solutions.'
  },
  skills: {
    heading: 'Core Expertise',
    items: [
      { icon: Brain, title: 'Data Science', description: 'Predictive modeling, causal inference, NLP pipelines, and experimental design.' },
      { icon: Server, title: 'MLOps', description: 'End-to-end model lifecycle: training, versioning, deployment, and monitoring at scale.' },
      { icon: Network, title: 'AI Agents', description: 'Multi-agent orchestration, tool-use, memory systems, and autonomous planning.' },
      { icon: Workflow, title: 'Agentic Workflows', description: 'Probabilistic planning, human-in-the-loop automation, and self-correcting pipelines.' }
    ]
  },
  projects: {
    heading: 'Selected Work',
    items: [
      {
        title: 'AutoMLOps',
        description: 'End‑to‑end MLOps platform on Kubernetes with automated model training, versioning, and serving.',
        tags: ['Kubeflow', 'MLflow', 'Kubernetes'],
        href: '#'
      },
      {
        title: 'AgentVault',
        description: 'Secure multi‑agent task delegation system using LangChain and gRPC for enterprise AI workflows.',
        tags: ['LangChain', 'gRPC', 'Redis'],
        href: '#'
      },
      {
        title: 'DataMosaic',
        description: 'Real‑time anomaly detection engine processing millions of events per second with Apache Flink.',
        tags: ['Apache Flink', 'Kafka'],
        href: '#'
      }
    ]
  },
  agentFrameworks: {
    heading: 'Multi-Agent Orchestration',
    subheading: 'CORE EXPERTISE',
    description: 'Specialized in building production-grade agentic systems across the three leading frameworks. Each represents a distinct approach to multi-agent collaboration — from stateful graphs to conversational teams and role‑based orchestration.',
    items: [
      {
        framework: 'langgraph',
        title: 'LangGraph',
        description: 'Low-level orchestration framework for building long-running, stateful agents.',
        features: [
          'Durable execution — survives failures',
          'Human-in-the-loop with state inspection',
          'Short-term + long-term memory',
          'Production-ready deployment platform'
        ],
        position: [-2.8, 0, 0]
      },
      {
        framework: 'autogen',
        title: 'AutoGen',
        description: 'Multi-agent conversational framework with event‑driven architecture.',
        features: [
          'Group chat — multi-party conversations',
          'Asynchronous event‑driven core',
          'Visual prototyping (AutoGen Studio)',
          'Two-agent setups cover 60% of production'
        ],
        position: [0, 0, 0]
      },
      {
        framework: 'crewai',
        title: 'CrewAI',
        description: 'Lean, standalone framework for role‑playing autonomous agent teams.',
        features: [
          'Built from scratch — independent framework',
          'Tracing & metrics → real‑time observability',
          'Used by nearly half of Fortune 500',
          'Event‑driven orchestration (Crews + Flows)'
        ],
        position: [2.8, 0, 0]
      }
    ]
  },
  contact: {
    heading: 'Let’s Connect',
    buttonSubmit: 'Send Message',
    buttonSubmitted: 'Message Sent ✦',
    placeholderEmail: 'you@agent.dev',
    placeholderMessage: 'Tell me about your AI challenge…'
  },
  footer: {
    copyright: 'All rights reserved.',
    navLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/#about' },
      { label: 'Skills', href: '/#skills' },
      { label: 'Workflow', href: '/#workflow' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Contact', href: '/#contact' }
    ]
  }
};

// src/lib/data.ts – ADD TO EXISTING FILE

export const aboutData = {
  introTitle: "Architect of Autonomous Intelligence",
  introDescription:
    "I'm a Data Scientist and AI Engineer who builds systems that don't just compute—they reason, adapt, and orchestrate. My work bridges the gap between production-grade MLOps and autonomous agent architectures.",
  journeyTimeline: [
    { year: "2019–2021", title: "Data Science Foundations", description: "Predictive modeling at scale" },
    { year: "2021–2023", title: "MLOps & Production AI", description: "Kubeflow, MLflow, Kserve" },
    { year: "2023–2025", title: "Agentic Systems", description: "LangGraph, AutoGen, CrewAI" },
    { year: "2025–Present", title: "Multi‑Agent Orchestration", description: "Swarms, planning, memory systems" }
  ],
  corePhilosophy: [
    "Build durable, not just demos.",
    "Think in graphs, not just prompts.",
    "Production is the ultimate benchmark.",
    "Agents are teams, not tools."
  ],
  technologies: [
    { name: "Python", level: "expert", years: 8 },
    { name: "TypeScript", level: "advanced", years: 5 },
    { name: "PyTorch", level: "advanced", years: 4 },
    { name: "LangChain/LangGraph", level: "expert", years: 3 }
  ],
  recognitions: [
    { title: "Featured Speaker", issuer: "AI Engineer World's Fair 2025", year: "2025" },
    { title: "Open Source Contributor", issuer: "LangChain, AutoGen", year: "2024–2025" },
    { title: "MLOps Certified", issuer: "Databricks", year: "2024" }
  ],
  headlineQuote: "AI won’t replace engineers. Engineers using AI will.",
  headlineAuthor: "— My philosophy in a line"
};