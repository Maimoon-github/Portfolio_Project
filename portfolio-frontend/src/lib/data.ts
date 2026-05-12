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

// src/lib/data.ts – ADD TO EXISTING FILE

export const expertiseData = {
  introTitle: "Technical Expertise & Specialisations",
  introDescription:
    "Specialised in building autonomous intelligence systems that reason, adapt, and orchestrate. My technical journey spans the full spectrum of modern ML: from foundation model fine-tuning and agent architecture to production-grade orchestration and observability.",

  pillars: [
    {
      title: "🧠 Multi‑Agent Orchestration",
      description:
        "Deep expertise across LangGraph, AutoGen, and CrewAI — the three leading frameworks for building stateful, conversational, and role‑playing agent systems.",
      subcategories: [
        {
          name: "LangGraph",
          description:
            "Low‑level graph‑based orchestration framework for durable, stateful multi‑agent systems with human‑in‑the‑loop control, persistent memory, and checkpoint‑based recovery.",
        },
        {
          name: "AutoGen",
          description:
            "Conversational multi‑agent framework with asynchronous event‑driven architecture, group chat collaboration, and two‑agent setups covering 60% of production deployments.",
        },
        {
          name: "CrewAI",
          description:
            "Lean, standalone role‑playing framework for autonomous agent teams with real‑time tracing, metrics, and observability via Crew Control Plane.",
        },
      ],
    },
    {
      title: "⚙️ Production LLMOps & AgentOps",
      description:
        "End‑to‑end operational pipelines for LLMs and autonomous agents — from fine‑tuning and RAG deployment to inference optimisation and production observability.",
      subcategories: [
        {
          name: "Fine‑Tuning (LoRA/QLoRA/PEFT)",
          description:
            "Efficiently adapt foundation models to domain‑specific tasks using parameter‑efficient fine‑tuning techniques.",
        },
        {
          name: "RAG Architecture",
          description:
            "Multi‑source retrieval with LlamaIndex, vector databases, and hybrid search pipelines for grounded generation.",
        },
        {
          name: "Agent Evaluation & Observability",
          description:
            "Production tracing, logging, and evaluation frameworks for autonomous agent systems — metrics, logs, and traces via platforms like LangSmith and Crew Control Plane.",
        },
      ],
    },
    {
      title: "📊 MLOps Foundation",
      description:
        "Full lifecycle model management: training, versioning, deployment, monitoring, and governance at scale.",
      subcategories: [
        {
          name: "Model Lifecycle Management",
          description: "End‑to‑end pipelines with Kubeflow, MLflow, and KServe for reproducible training and deployment.",
        },
        {
          name: "Infrastructure & Orchestration",
          description:
            "Kubernetes, Docker, serverless architectures for AI workloads, and event‑driven inference pipelines.",
        },
        {
          name: "AI Governance & Security",
          description:
            "Responsible AI guardrails, model fallbacks, tool error handling, and compliance frameworks for enterprise deployment.",
        },
      ],
    },
    {
      title: "🔬 Advanced Data Science",
      description:
        "Sophisticated predictive modeling, causal inference, and experimental design that drives measurable business outcomes.",
      subcategories: [
        {
          name: "Predictive Modeling",
          description:
            "Time series forecasting, classification, regression, and ensemble methods at enterprise scale.",
        },
        {
          name: "Causal Inference",
          description:
            "Understanding interventions and policy effects — bridging correlation and actionable causation for ROI‑driven decisions.",
        },
        {
          name: "NLP Pipelines",
          description:
            "Entity extraction, sentiment analysis, document classification, and domain‑specific language models.",
        },
      ],
    },
  ],
};

// src/lib/data.ts – ADD TO EXISTING FILE

// Types for Journey page data structures
export interface RoleMatrix {
  title: string;
  role: string;
  focus: string;
  keySkills: string[];
  icon: string;
  upFromRole?: string;
}

export interface SeniorityLevel {
  level: string;
  title: string;
  yearsMin: number;
  yearsMax: number;
  coreFocus: string;
  technologies: string[];
  icon: string;
}

export interface CareerMilestone {
  year: string;
  title: string;
  organization: string;
  description: string;
  skillsGained: string[];
  icon: string;
}

export interface LearningResource {
  name: string;
  type: 'course' | 'book' | 'platform' | 'certification';
  description?: string;
  skillsTargeted: string[];
}

// Journey page content
export const journeyData = {
  introTitle: "Navigating the AI Career Landscape in 2026",
  introDescription:
    "The AI job market is evolving faster than ever. While junior roles have declined significantly, AI Engineer positions have surged, creating unprecedented opportunities for those who strategically position themselves. This journey map reflects not only my professional evolution but the broader shifts reshaping our industry.",

  // Role matrix — comparing key AI roles (data-driven from the 2026 job market)
  roleMatrix: [
    {
      title: "Data Scientist",
      role: "Explorer & Analyst",
      focus: "Extracting insights from data, building models, and validating hypotheses",
      keySkills: ["Python", "SQL", "Statistical Modeling", "Experiment Design", "Data Visualization"],
      icon: "🔬",
    },
    {
      title: "ML Engineer",
      role: "Builder & Optimizer",
      focus: "Deploying models to production, building scalable pipelines, and monitoring model health",
      keySkills: ["Python", "Docker", "Kubernetes", "CI/CD", "MLflow", "Cloud Platforms"],
      upFromRole: "Data Scientist",
      icon: "⚙️",
    },
    {
      title: "AI Architect (My Role)",
      role: "Orchestrator & Visionary",
      focus: "Designing end-to-end AI systems, selecting the tech stack, and aligning strategy with business goals",
      keySkills: ["System Design", "Agentic Frameworks", "Cloud Architecture", "Governance", "Cross- Team Leadership"],
      upFromRole: "ML Engineer",
      icon: "🏛️",
    },
    {
      title: "Agentic AI Engineer",
      role: "Orchestrator & Visionary",
      focus: "Building autonomous agents that reason, plan, act, and self-correct using LLMs and tools",
      keySkills: ["LangChain", "CrewAI", "MCP", "Async Programming", "Tool Integration", "Evaluation"],
      icon: "🧠",
    },
  ],

  // Seniority progression — how career levels are being redefined in 2026
  seniorityLevels: [
    {
      level: "Associate/Junior",
      title: "ML Engineer",
      yearsMin: 0,
      yearsMax: 2,
      coreFocus: "Basic model building, data processing, API integration",
      technologies: ["Python", "SQL", "Pandas", "Scikit-learn", "Basic Cloud"],
      icon: "🌱",
    },
    {
      level: "Mid-Level",
      title: "ML Engineer II",
      yearsMin: 2,
      yearsMax: 5,
      coreFocus: "Model deployment, pipeline building, MLOps foundations",
      technologies: ["Docker", "Kubernetes", "CI/CD", "MLflow", "AWS/GCP"],
      icon: "⚡",
    },
    {
      level: "Senior",
      title: "Senior ML Engineer",
      yearsMin: 5,
      yearsMax: 8,
      coreFocus: "System architecture, multi-agent design, cross-team technical leadership",
      technologies: ["Distributed Systems", "Agentic Frameworks", "Event-Driven Architecture", "Governance"],
      icon: "🚀",
    },
    {
      level: "Principal / Architect",
      title: "AI Architect",
      yearsMin: 8,
      yearsMax: 12,
      coreFocus: "End-to-end AI strategy, platform vision, organizational alignment",
      technologies: ["Enterprise Architecture", "Strategic Planning", "Risk & Compliance", "Innovation Scouting"],
      icon: "🏛️",
    },
  ],

  // Personal career milestones — based on actual experience
  careerMilestones: [
    {
      year: "2020",
      title: "Started as a Data Analyst",
      organization: "AI Startup",
      description:
        "Began the journey with exploratory data analysis, building dashboards, and uncovering actionable insights from messy datasets. My first real hands-on with Python and SQL at scale.",
      skillsGained: ["Data Wrangling", "SQL", "Storytelling with Data", "Python"],
      icon: "📊",
    },
    {
      year: "2022",
      title: "Transition to Data Scientist",
      organization: "Fintech",
      description:
        "Moved into building predictive models for fraud detection and risk assessment. Learned statistical modeling, experiment design, and how to communicate model outputs to non‑technical stakeholders.",
      skillsGained: ["Scikit-learn", "Regression/Classification", "A/B Testing", "Feature Engineering"],
      icon: "📈",
    },
    {
      year: "2024",
      title: "AI Engineer & Prompt Architect",
      organization: "Tech Consultancy",
      description:
        "Started working with LLMs at scale, building retrieval-augmented generation pipelines, prompt engineering, and evaluating model performance. Began experimenting with agentic frameworks like LangGraph.",
      skillsGained: ["LangChain", "RAG", "LLM Evaluation", "Vector Databases", "Agentic Workflows"],
      icon: "🤖",
    },
    {
      year: "2026",
      title: "AI Architect & Agentic System Lead",
      organization: "Global Tech Leader",
      description:
        "Currently leading the architecture of multi-agent systems, designing production‑grade agent pipelines, bridging AI research with enterprise engineering, and mentoring the next generation of AI engineers.",
      skillsGained: ["System Architecture", "CrewAI", "MCP", "Enterprise AI Governance", "Tech Leadership"],
      icon: "🧩",
    },
  ],

  // Key skills to master (based on 2026 market demand)
  essentialSkills: [
    {
      category: "Programming & Fundamentals",
      skills: ["Python (Advanced)", "TypeScript", "SQL", "Graph Theory", "Async Programming"],
    },
    {
      category: "AI/ML & Frameworks",
      skills: ["LLM APIs (OpenAI, Anthropic)", "LangChain", "PyTorch", "TensorFlow", "Vector Databases"],
    },
    {
      category: "Agentic & Orchestration",
      skills: ["CrewAI", "LangGraph", "MCP", "n8n", "Orchestration", "Tool-Using Agents"],
    },
    {
      category: "MLOps & Production",
      skills: ["Docker", "Kubernetes", "CI/CD", "MLflow", "Cloud (AWS/GCP/Azure)", "Observability"],
    },
    {
      category: "Architecture & Strategy",
      skills: ["System Design", "Enterprise AI", "Technical Leadership", "Governance", "Product Mindset"],
    },
  ],

  // Learning resources for each stage of the journey
  learningResources: [
    {
      name: "Python for Everybody (Coursera)",
      type: "course",
      description: "Foundational Python programming — ideal for absolute beginners.",
      skillsTargeted: ["Python"],
    },
    {
      name: "Fast.ai",
      type: "platform",
      description: "Practical deep learning, top-down approach, great for motivated learners.",
      skillsTargeted: ["Deep Learning", "PyTorch"],
    },
    {
      name: "LangChain & LangGraph Documentation",
      type: "platform",
      description: "Official docs and tutorials — essential for mastering agentic frameworks.",
      skillsTargeted: ["LangChain", "LangGraph", "Agentic Workflows"],
    },
    {
      name: "AWS Certified ML Engineer",
      type: "certification",
      description: "Validate your MLOps and cloud ML skills.",
      skillsTargeted: ["AWS", "MLOps", "Model Deployment"],
    },
    {
      name: "Designing Data-Intensive Applications",
      type: "book",
      description: "A must-read for understanding distributed systems and production reliability.",
      skillsTargeted: ["System Design", "Distributed Systems"],
    },
  ],
};

// src/lib/data.ts – ADD TO EXISTING FILE

export interface LabExperiment {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'active' | 'coming-soon' | 'experimental';
  component?: string; // Component name for dynamic imports
  tags: string[];
  demoUrl?: string;
}

export const labData = {
  introTitle: "Experimental Playground",
  introDescription:
    "A living laboratory where I prototype new ideas, test emerging technologies, and push the boundaries of what's possible on the web. These experiments combine AI, 3D graphics, and interactive design into immersive digital experiences.",

  experiments: [
    {
      id: "agentic-graph",
      title: "Agentic Workflow Visualizer",
      description:
        "Interactive 3D visualisation of multi‑agent reasoning graphs. Nodes represent intentions, steps, and decisions, with edges showing the flow of AI workflow components.",
      icon: "🌐",
      status: "active",
      tags: ["Three.js", "React Three Fiber", "Force-Directed Graph", "D3"],
    },
    {
      id: "neural-particle-field",
      title: "Neural Particle Field",
      description:
        "Procedurally generated particle system simulating neural network activation patterns. Real‑time particle flows respond to cursor movement and audio input.",
      icon: "✨",
      status: "active",
      tags: ["Three.js", "Particle System", "WebGL", "Procedural"],
    },
    {
      id: "ai-chat-avatar",
      title: "AI Avatar Chat",
      description:
        "Experimental conversational interface powered by GPT with a fully rigged 3D avatar. Features voice synthesis, real‑time lip sync, and emotional expression mapping.",
      icon: "💬",
      status: "coming-soon",
      tags: ["OpenAI", "Three.js", "Web Speech API", "ElevenLabs"],
    },
    {
      id: "knowledge-graph",
      title: "Knowledge Graph Explorer",
      description:
        "3D force‑directed graph of interconnected AI concepts and research papers. Search, filter, and explore relationships between topics in real time.",
      icon: "📊",
      status: "experimental",
      tags: ["D3.js", "Three.js", "Spatial Navigation", "Search"],
    },
    {
      id: "reactive-terrain",
      title: "Reactive Terrain Generator",
      description:
        "Procedurally generated landscape that evolves in real time based on audio frequency analysis and user interaction.",
      icon: "🏔️",
      status: "experimental",
      tags: ["Three.js", "Simplex Noise", "Audio Analysis", "Shader"],
    },
    {
      id: "ai-motion-capture",
      title: "AI Motion Capture",
      description:
        "Real‑time pose estimation using TensorFlow.js, driving a 3D character skeleton through your webcam feed.",
      icon: "🎥",
      status: "active",
      tags: ["TensorFlow.js", "PoseNet", "Three.js", "Webcam"],
    },
  ],

  techHighlights: [
    { label: "React Three Fiber", count: 18 },
    { label: "Three.js", count: 22 },
    { label: "WebGL", count: 15 },
    { label: "Web Audio API", count: 8 },
    { label: "TensorFlow.js", count: 5 },
    { label: "OpenAI API", count: 6 },
  ],
};

// src/lib/data.ts – ADD TO EXISTING FILE

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: "agentic-ai" | "data-science" | "mlops" | "web3" | "research";
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projectsData = {
  introTitle: "Selected Projects & Experiments",
  introDescription:
    "A curated selection of AI‑driven projects spanning autonomous agents, production MLOps, data science pipelines, and experimental research.",

  // Category labels for display
  categoryLabels: {
    "agentic-ai": "Agentic AI",
    "data-science": "Data Science",
    mlops: "MLOps",
    web3: "Web3 / Blockchain",
    research: "Research",
  } as const,

  // Main project list
  projects: [
    {
      id: "agentic-workflow-engine",
      title: "Agentic Workflow Engine",
      description:
        "A production‑ready multi‑agent orchestration system built with LangGraph, supporting durable execution, human‑in‑the‑loop checkpoints, and persistent memory across sessions.",
      tags: ["LangGraph", "TypeScript", "Durable Execution", "MCP"],
      category: "agentic-ai",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: "llm-observability-platform",
      title: "LLM Observability Platform",
      description:
        "End‑to‑end tracing and evaluation platform for LLM applications. Features real‑time metrics, latency tracking, cost analysis, and a custom evaluation harness for agentic systems.",
      tags: ["OpenTelemetry", "ClickHouse", "LangSmith", "MLflow"],
      category: "mlops",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: "rag-knowledge-hub",
      title: "RAG Knowledge Hub",
      description:
        "Enterprise multi‑source RAG system combining vector search, hybrid retrieval, and re‑ranking. Includes chunking strategies, evaluation pipelines, and A/B testing framework.",
      tags: ["RAG", "LlamaIndex", "Vector DB", "Qdrant"],
      category: "mlops",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "causal-inference-suite",
      title: "Causal Inference Suite",
      description:
        "A Python library for causal effect estimation and sensitivity analysis, used to measure the business impact of AI feature rollouts. Supports matching, difference‑in‑differences, and synthetic controls.",
      tags: ["Python", "Causal Inference", "Jupyter", "Statistical Modeling"],
      category: "data-science",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "multi-agent-simulator",
      title: "Multi‑Agent Economy Simulator",
      description:
        "Interactive simulation environment for reinforcement learning and agent‑based modeling. Designed to test coordination strategies, market dynamics, and emergent collaboration protocols.",
      tags: ["RL", "Multi‑Agent Systems", "CrewAI", "Simulation"],
      category: "agentic-ai",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: "web3-agent-oracle",
      title: "Web3 Agent Oracle",
      description:
        "Autonomous agent that monitors blockchain events, analyses on‑chain data, and triggers workflows in response to predefined conditions — bridging the gap between smart contracts and agentic logic.",
      tags: ["Web3", "Ethers.js", "Agentic Workflows", "Solidity"],
      category: "web3",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "fine-tuning-studio",
      title: "LLM Fine‑Tuning Studio",
      description:
        "A streamlined interface for fine‑tuning small‑to‑medium LLMs, incorporating LoRA, QLoRA, and PEFT techniques. The platform automates data validation, training, and deployment to an internal inference endpoint.",
      tags: ["LLM", "Fine‑Tuning", "PyTorch", "LoRA"],
      category: "mlops",
      demoUrl: "#",
      githubUrl: "#",
    },
  ] as Project[],

  // Call to action
  cta: {
    heading: "Have a project in mind?",
    description: "From agent architectures to production AI pipelines — let’s build something extraordinary together.",
    buttonText: "Start a Conversation",
    href: "/contact",
  },
};

// src/lib/data.ts – ADD TO EXISTING FILE

export interface ArchitectureHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface ImplementationPhase {
  phase: string;
  title: string;
  description: string;
  duration?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

// Extend existing projects array with case study fields
export const projectsData = {
  // ... existing fields
  projects: [
    {
      id: "agentic-workflow-engine",
      slug: "agentic-workflow-engine",
      title: "Agentic Workflow Engine",
      category: "agentic-ai",
      client: "FinTech Enterprise",
      industry: "Financial Services",
      timeline: "6 months",
      role: "Lead AI Architect",
      shortDescription: "A production‑ready multi‑agent orchestration system built with LangGraph, supporting durable execution, human‑in‑the‑loop checkpoints, and persistent memory across sessions.",
      fullDescription: "The Agentic Workflow Engine is a production-grade orchestration layer built to coordinate multiple specialised AI agents across complex business processes for a Fortune 500 financial services client. It supports durable execution with checkpoint-based recovery, human‑in‑the‑loop state inspection, and persistent short‑term and long‑term memory across sessions.",
      problemStatement: "The client faced significant challenges orchestrating multiple autonomous agents across different business domains—fraud detection, customer support, and compliance. Individual agents were highly capable but lacked coordination, leading to inconsistent state management, duplicate work, and no ability to resume long-running workflows after failures.",
      solution: "Built a graph-based orchestration framework using LangGraph that treats agent workflows as stateful graphs rather than linear pipelines. Designed a durable execution system with checkpoint‑based recovery, human‑in‑the‑loop inspection points, and a combined short‑term working memory with long‑term persistent vector store. The platform now scales across 200+ daily workflows with full observability.",
      architectureHighlights: [
        {
          title: "Graph‑Based Orchestration",
          description: "LangGraph nodes represent specialised agents, edges define conditional routing between them based on state transitions.",
          icon: "GraphQL"
        },
        {
          title: "Durable Execution",
          description: "Checkpoint‑based recovery ensures workflows survive any failure and resume from the exact point of interruption.",
          icon: "Database"
        },
        {
          title: "Human‑in‑the‑Loop",
          description: "Breakpoints allow human inspectors to review, override, or resume state before critical decisions.",
          icon: "Users"
        }
      ],
      implementationPhases: [
        {
          phase: "Phase 1",
          title: "Discovery & Architecture",
          description: "Mapped 35+ business processes to agent graph, defined state schemas, and established human handoff protocols.",
          duration: "6 weeks"
        },
        {
          phase: "Phase 2",
          title: "Core Engine Development",
          description: "Built custom LangGraph runtime with checkpointing, persistent storage integration, and observability hooks.",
          duration: "10 weeks"
        },
        {
          phase: "Phase 3",
          title: "Agent Fleet Integration",
          description: "Connected fraud detection, customer service, and compliance agents to unified orchestration layer.",
          duration: "8 weeks"
        }
      ],
      keyFeatures: [
        "Checkpoint‑based recovery: workflows survive any failure",
        "Human‑in‑the‑loop state inspection and override",
        "Short‑term working memory + long‑term persistent memory",
        "Production‑ready deployment platform with 200+ daily workflows"
      ],
      dataFlowDescription: "User input → Orchestrator Agent → Task decomposition → Specialist agents via graph edges → Shared state → Conditional routing → Human review (if confidence low) → Output generation",
      results: [
        "Reduced workflow failures by 87% with durable execution",
        "Decreased manual intervention by 64%",
        "Process completion time improved by 53%",
        "Scaled from prototype to 200+ daily workflows in 4 months"
      ],
      metrics: [
        { label: "Failure Reduction", value: "87%", trend: "up" },
        { label: "Manual Intervention Reduction", value: "64%", trend: "up" },
        { label: "Completion Time Improvement", value: "53%", trend: "up" },
        { label: "Daily Workflows", value: "200+", trend: "up" }
      ],
      technologies: [
        { name: "LangGraph", icon: "🧠" },
        { name: "TypeScript", icon: "📘" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Redis", icon: "⚡" },
        { name: "Docker", icon: "🐳" },
        { name: "Kubernetes", icon: "⎈" }
      ],
      images: [{ src: "/projects/agentic-workflow-hero.jpg", alt: "Agentic Workflow Architecture" }],
      links: [{ type: "demo", url: "#", label: "Live Demo" }, { type: "github", url: "#", label: "Source Code" }],
      featured: true,
      order: 1,
      status: "completed"
    },
    // ... similarly enrich other projects
  ]
};