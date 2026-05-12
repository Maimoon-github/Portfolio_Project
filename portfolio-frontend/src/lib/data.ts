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
  titleHighlight: 'autonomous',
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
} as any; // Type assertion as a quick fix to resolve missing properties for now, alternatively we could define a strong type for portfolioData

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
  status: 'active' | 'coming-soon' | 'experimental' | string;
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

export const projectsData = {
  introTitle: "Selected Projects & Experiments",
  introDescription:
    "A curated selection of AI‑driven projects spanning autonomous agents, production MLOps pipelines, data science insights, and experimental research. Each case study includes architecture, outcomes, and technical highlights.",

  categoryLabels: {
    "agentic-ai": "Agentic AI",
    "data-science": "Data Science",
    mlops: "MLOps",
    web3: "Web3 / Blockchain",
    research: "Research",
  } as const,

  projects: [
    // 1. Agentic Workflow Engine (Agentic AI)
    {
      id: "agentic-workflow-engine",
      slug: "agentic-workflow-engine",
      title: "Agentic Workflow Engine",
      category: "agentic-ai",
      client: "FinTech Enterprise",
      industry: "Financial Services",
      timeline: "6 months",
      role: "Lead AI Architect",
      shortDescription:
        "Production‑ready multi‑agent orchestration system with durable execution, human‑in‑the‑loop checkpoints, and persistent memory across sessions.",
      fullDescription:
        "The Agentic Workflow Engine is a production‑grade orchestration layer built to coordinate multiple specialised AI agents across complex business processes for a Fortune 500 financial services client. It supports durable execution with checkpoint‑based recovery, human‑in‑the‑loop state inspection, and persistent short‑term and long‑term memory across sessions.",
      problemStatement:
        "The client faced significant challenges orchestrating multiple autonomous agents across different business domains—fraud detection, customer support, and compliance. Individual agents were highly capable but lacked coordination, leading to inconsistent state management, duplicate work, and no ability to resume long‑running workflows after failures.",
      solution:
        "Built a graph‑based orchestration framework using LangGraph that treats agent workflows as stateful graphs rather than linear pipelines. Designed a durable execution system with checkpoint‑based recovery, human‑in‑the‑loop inspection points, and a combined short‑term working memory with long‑term persistent vector store. The platform now scales across 200+ daily workflows with full observability.",
      architectureHighlights: [
        {
          title: "Graph‑Based Orchestration",
          description: "LangGraph nodes represent specialised agents, edges define conditional routing between them based on state transitions.",
          icon: "GraphQL",
        },
        {
          title: "Durable Execution",
          description: "Checkpoint‑based recovery ensures workflows survive any failure and resume from the exact point of interruption.",
          icon: "Database",
        },
        {
          title: "Human‑in‑the‑Loop",
          description: "Breakpoints allow human inspectors to review, override, or resume state before critical decisions.",
          icon: "Users",
        },
      ],
      implementationPhases: [
        {
          phase: "Phase 1",
          title: "Discovery & Architecture",
          description: "Mapped 35+ business processes to agent graph, defined state schemas, and established human handoff protocols.",
          duration: "6 weeks",
        },
        {
          phase: "Phase 2",
          title: "Core Engine Development",
          description: "Built custom LangGraph runtime with checkpointing, persistent storage integration, and observability hooks.",
          duration: "10 weeks",
        },
        {
          phase: "Phase 3",
          title: "Agent Fleet Integration",
          description: "Connected fraud detection, customer service, and compliance agents to unified orchestration layer.",
          duration: "8 weeks",
        },
      ],
      keyFeatures: [
        "Checkpoint‑based recovery – workflows survive any failure",
        "Human‑in‑the‑loop state inspection and override",
        "Short‑term working memory + long‑term persistent memory",
        "Production‑ready deployment platform with 200+ daily workflows",
      ],
      dataFlowDescription:
        "User input → Orchestrator Agent → Task decomposition → Specialist agents via graph edges → Shared state → Conditional routing → Human review (if confidence low) → Output generation",
      results: [
        "Reduced workflow failures by 87% with durable execution",
        "Decreased manual intervention by 64%",
        "Process completion time improved by 53%",
        "Scaled from prototype to 200+ daily workflows in 4 months",
      ],
      metrics: [
        { label: "Failure Reduction", value: "87%", trend: "up" },
        { label: "Manual Intervention Reduction", value: "64%", trend: "up" },
        { label: "Completion Time Improvement", value: "53%", trend: "up" },
        { label: "Daily Workflows", value: "200+", trend: "up" },
      ],
      technologies: [
        { name: "LangGraph", icon: "🧠" },
        { name: "TypeScript", icon: "📘" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Redis", icon: "⚡" },
        { name: "Docker", icon: "🐳" },
        { name: "Kubernetes", icon: "⎈" },
      ],
      images: [{ src: "/projects/agentic-workflow-hero.jpg", alt: "Agentic Workflow Architecture" }],
      links: [
        { type: "demo", url: "#", label: "Live Demo" },
        { type: "github", url: "#", label: "Source Code" },
      ],
      featured: true,
      order: 1,
      status: "completed",
    },

    // 2. LLM Observability Platform (MLOps)
    {
      id: "llm-observability-platform",
      slug: "llm-observability-platform",
      title: "LLM Observability Platform",
      category: "mlops",
      client: "AI Startup",
      industry: "SaaS / AI",
      timeline: "4 months",
      role: "Lead MLOps Engineer",
      shortDescription:
        "End‑to‑end tracing and evaluation platform for LLM applications, featuring real‑time metrics, latency analysis, cost tracking, and custom evaluation harnesses.",
      fullDescription:
        "An open‑standard observability platform built for companies deploying LLM‑powered applications. It ingests traces from LangChain, AutoGen, and custom agents, stores them in ClickHouse, and provides dashboards for latency, token usage, cost, and quality metrics. The platform includes an evaluation harness that allows teams to run offline tests against production traces.",
      problemStatement:
        "Teams deploying LLM applications lacked visibility into production behaviour. Debugging agent loops was painful, costs were opaque, and there was no standard way to evaluate model outputs against expected quality.",
      solution:
        "Built a lightweight OpenTelemetry‑compatible collector that intercepts LLM calls and agent steps. Traces are stored in ClickHouse for real‑time analytics. A React dashboard displays metrics, and an evaluation framework lets users define custom judges (LLM‑as‑judge, regex, or Python functions) to score traces.",
      architectureHighlights: [
        {
          title: "OpenTelemetry Native",
          description: "Uses OTLP exports from LangChain and custom agents – no vendor lock‑in.",
          icon: "OpenTelemetry",
        },
        {
          title: "Real‑time ClickHouse Analytics",
          description: "High‑performance analytical queries for cost and latency trends.",
          icon: "ClickHouse",
        },
        {
          title: "Evaluation Harness",
          description: "Offline trace replay with custom judges; integrates with Weights & Biases.",
          icon: "W&B",
        },
      ],
      implementationPhases: [
        { phase: "Phase 1", title: "Collector & Ingestion", description: "Built OTLP gRPC collector and wrote ClickHouse schemas.", duration: "6 weeks" },
        { phase: "Phase 2", title: "Dashboard & Visualisations", description: "React dashboard with real‑time filters and charts.", duration: "5 weeks" },
        { phase: "Phase 3", title: "Evaluation Framework", description: "Traced replay, custom judges, and CI integration.", duration: "4 weeks" },
      ],
      keyFeatures: [
        "OTLP ingestion – compatible with LangSmith, OpenInference, and custom agents",
        "Dashboard: token usage, cost per request, latency percentiles",
        "Evaluation framework – unit tests for LLM outputs",
        "Alerts for cost spikes or degraded quality",
      ],
      results: [
        "Adopted by 5 internal teams, reducing manual debugging time by 70%",
        "Detected and fixed prompt regression within 24 hours",
        "Saved 30% in LLM costs through usage optimisation",
      ],
      metrics: [
        { label: "Manual Debugging Reduction", value: "70%", trend: "up" },
        { label: "Cost Savings", value: "30%", trend: "up" },
        { label: "Deployed Teams", value: "5", trend: "up" },
      ],
      technologies: [
        { name: "OpenTelemetry", icon: "📡" },
        { name: "ClickHouse", icon: "🏦" },
        { name: "React", icon: "⚛️" },
        { name: "Python", icon: "🐍" },
        { name: "Docker", icon: "🐳" },
      ],
      images: [{ src: "/projects/llm-observability.jpg", alt: "LLM Observability Dashboard" }],
      links: [{ type: "github", url: "#", label: "Source Code" }],
      featured: false,
      order: 2,
      status: "completed",
    },

    // 3. RAG Knowledge Hub (MLOps / Agentic AI)
    {
      id: "rag-knowledge-hub",
      slug: "rag-knowledge-hub",
      title: "RAG Knowledge Hub",
      category: "mlops",
      client: "LegalTech Company",
      industry: "Legal / Professional Services",
      timeline: "3 months",
      role: "Lead AI Engineer",
      shortDescription:
        "Enterprise multi‑source RAG system combining vector search, hybrid retrieval, and re‑ranking. Includes chunking strategies, evaluation pipelines, and A/B testing.",
      fullDescription:
        "A production RAG pipeline that ingests legal documents (PDFs, emails, transcripts) and provides grounded, citation‑backed answers to internal analysts. Uses a hybrid retrieval strategy: BM25 + dense vector (ColBERT) + cross‑encoder re‑ranking. The system includes an evaluation suite to measure retrieval precision and answer faithfulness.",
      problemStatement:
        "Legal analysts spent hours finding relevant clauses and precedents in thousands of documents. Off‑the‑shelf RAG produced hallucinations and lacked proper citations.",
      solution:
        "Developed a multi‑stage retrieval pipeline with LlamaIndex customisations. Chunking strategies were tuned per document type. A feedback loop captures user corrections to improve future retrievals.",
      architectureHighlights: [
        {
          title: "Hybrid Retrieval",
          description: "Combined sparse (BM25) and dense (ColBERT) retrieval with a learned re‑ranker.",
          icon: "🔍",
        },
        {
          title: "Evaluation Pipeline",
          description: "Automated NDCG@k and Faithfulness scores using LLM‑as‑judge.",
          icon: "📊",
        },
        {
          title: "Citation & Attribution",
          description: "Every answer links directly to source text chunk with highlight.",
          icon: "📄",
        },
      ],
      implementationPhases: [
        { phase: "Phase 1", title: "Indexing Pipeline", description: "Document parsing, chunking, and vector DB ingestion.", duration: "4 weeks" },
        { phase: "Phase 2", title: "Retrieval & Reranking", description: "Integrated BM25, dense, cross‑encoder.", duration: "4 weeks" },
        { phase: "Phase 3", title: "Evaluation & A/B Testing", description: "Built evaluation harness and experiment logging.", duration: "3 weeks" },
      ],
      keyFeatures: [
        "Support for 10+ document formats including PDF, DOCX, HTML",
        "ColBERTv2 for late interaction – high recall",
        "Cross‑encoder re‑ranker (MiniLM) to boost precision",
        "A/B testing framework for retrieval strategies",
      ],
      results: [
        "Retrieval precision (NDCG@10) improved from 0.62 to 0.84",
        "Analysts reported 80% reduction in time finding relevant documents",
        "Hallucination rate dropped below 5% on internal tests",
      ],
      metrics: [
        { label: "NDCG@10", value: "0.84", trend: "up" },
        { label: "Time Saved", value: "80%", trend: "up" },
      ],
      technologies: [
        { name: "LlamaIndex", icon: "🦙" },
        { name: "Qdrant", icon: "📦" },
        { name: "ColBERTv2", icon: "🔤" },
        { name: "FastAPI", icon: "⚡" },
      ],
      images: [{ src: "/projects/rag-knowledge-hub.jpg", alt: "RAG Pipeline Architecture" }],
      links: [{ type: "demo", url: "#", label: "Case Study" }],
      featured: false,
      order: 3,
      status: "completed",
    },

    // 4. Causal Inference Suite (Data Science)
    {
      id: "causal-inference-suite",
      slug: "causal-inference-suite",
      title: "Causal Inference Suite",
      category: "data-science",
      client: "E‑commerce Marketplace",
      industry: "Retail / E‑commerce",
      timeline: "8 weeks",
      role: "Lead Data Scientist",
      shortDescription:
        "A Python library for causal effect estimation and sensitivity analysis, used to measure the business impact of AI feature rollouts.",
      fullDescription:
        "An internal library that provides matching, difference‑in‑differences, instrumental variables, and synthetic control methods. It integrates with the company’s experimentation platform and automatically produces reports with robustness checks.",
      problemStatement:
        "The company ran many A/B tests but struggled to interpret results when treatment effects were heterogeneous or when violations of stable unit treatment value assumption (SUTVA) occurred.",
      solution:
        "Developed a library that implements modern causal inference methods, with automated balance checking, sensitivity analysis, and visual diagnostics. The library outputs plain‑English summaries and effect estimates with credible intervals.",
      architectureHighlights: [
        { title: "Propensity Score Matching", description: "Nearest neighbour matching with caliper and exact matching constraints.", icon: "🎯" },
        { title: "Difference‑in‑Differences", description: "Parallel trends testing and event‑study plots.", icon: "📈" },
        { title: "Synthetic Control", description: "Optimised weighting to construct counterfactual.", icon: "🧪" },
      ],
      implementationPhases: [
        { phase: "Phase 1", title: "Matching & Balance", description: "Implemented matching algorithms and diagnostic plots.", duration: "3 weeks" },
        { phase: "Phase 2", title: "Panel Methods", description: "DiD and synthetic control with robust standard errors.", duration: "3 weeks" },
        { phase: "Phase 3", title: "Reporting & Integration", description: "Integrated with experimentation platform, generated automated reports.", duration: "2 weeks" },
      ],
      keyFeatures: [
        "Scikit‑learn compatible API",
        "Automated balance tables and love plots",
        "Sensitivity analysis for unobserved confounding",
        "Jupyter widget for interactive exploration",
      ],
      results: [
        "Adopted by 12 data science teams across the company",
        "Reduced time to produce causal estimates from days to hours",
        "Enabled decision‑making for 5 major product launches",
      ],
      metrics: [
        { label: "Adopted Teams", value: "12", trend: "up" },
        { label: "Time Saved per Analysis", value: "80%", trend: "up" },
      ],
      technologies: [
        { name: "Python", icon: "🐍" },
        { name: "NumPy", icon: "🔢" },
        { name: "Pandas", icon: "🐼" },
        { name: "SciPy", icon: "🔬" },
      ],
      images: [{ src: "/projects/causal-suite.jpg", alt: "Causal Inference Diagnostics" }],
      links: [{ type: "github", url: "#", label: "Internal Library" }],
      featured: false,
      order: 4,
      status: "completed",
    },

    // 5. Multi‑Agent Economy Simulator (Agentic AI / Research)
    {
      id: "multi-agent-simulator",
      slug: "multi-agent-simulator",
      title: "Multi‑Agent Economy Simulator",
      category: "agentic-ai",
      client: "Academic Research Lab",
      industry: "Research / Academia",
      timeline: "3 months",
      role: "AI Research Engineer",
      shortDescription:
        "Interactive simulation environment for reinforcement learning and agent‑based modeling, designed to test coordination strategies, market dynamics, and emergent collaboration.",
      fullDescription:
        "A simulation environment where heterogeneous agents (reinforcement learning, rule‑based, or LLM‑driven) interact in a virtual economy. Agents consume resources, trade, and form alliances. The platform records trajectories and supports custom reward functions.",
      problemStatement:
        "Researchers needed a flexible framework to test multi‑agent reinforcement learning algorithms in partially observable, co‑operative/competitive environments with complex emergent behaviours.",
      solution:
        "Built a modular simulator using CrewAI for agent orchestration and PettingZoo for RL environments. Agents communicate via a message bus. Visualisation layer written in Three.js for real‑time rendering of agent positions and states.",
      architectureHighlights: [
        { title: "Hybrid Agent Types", description: "RL agents, scripted policies, or LLM‑driven (via Ollama).", icon: "🤖" },
        { title: "Environment Recording", description: "Full trajectory logging and replay for analysis.", icon: "📼" },
        { title: "3D Real‑time Viewer", description: "Three.js visualisation of agent movements and resource flows.", icon: "🌍" },
      ],
      implementationPhases: [
        { phase: "Phase 1", title: "Core Simulator", description: "Market mechanics, resource dynamics, agent base classes.", duration: "6 weeks" },
        { phase: "Phase 2", title: "Agent Integration", description: "Wrapped RLlib and CrewAI agents; built message bus.", duration: "4 weeks" },
        { phase: "Phase 3", title: "Visualisation & Analysis", description: "Three.js viewer, trajectory database, and analysis notebooks.", duration: "3 weeks" },
      ],
      keyFeatures: [
        "Supports heterogeneous agents (RL, rule‑based, LLM)",
        "Configurable environment parameters (supply, demand, cooperation incentives)",
        "Real‑time 3D visualisation",
        "Export trajectories for offline analysis",
      ],
      results: [
        "Used in three published research papers",
        "Open‑sourced and starred by 250+ researchers",
        "Enabled rapid prototyping of novel coordination algorithms",
      ],
      metrics: [
        { label: "GitHub Stars", value: "250+", trend: "up" },
        { label: "Research Papers", value: "3", trend: "up" },
      ],
      technologies: [
        { name: "CrewAI", icon: "👥" },
        { name: "Ray/RLlib", icon: "⚡" },
        { name: "Three.js", icon: "🎨" },
        { name: "Python", icon: "🐍" },
      ],
      images: [{ src: "/projects/multi-agent-sim.jpg", alt: "Agent Economy Simulator" }],
      links: [{ type: "github", url: "#", label: "Open Source" }],
      featured: true,
      order: 5,
      status: "completed",
    },

    // 6. Fine‑Tuning Studio (MLOps / Agentic AI)
    {
      id: "fine-tuning-studio",
      slug: "fine-tuning-studio",
      title: "LLM Fine‑Tuning Studio",
      category: "mlops",
      client: "Internal AI Platform Team",
      industry: "Technology",
      timeline: "4 months",
      role: "ML Engineer",
      shortDescription:
        "A streamlined interface for fine‑tuning small‑to‑medium LLMs, incorporating LoRA, QLoRA, and PEFT techniques. Automates data validation, training, and deployment to an internal inference endpoint.",
      fullDescription:
        "An internal platform that allows engineers to fine‑tune open‑source LLMs (e.g., Llama 3, Mistral) on custom datasets without deep knowledge of distributed training. The platform handles dataset curation, PEFT configuration, training job orchestration, and model registry.",
      problemStatement:
        "Fine‑tuning was a bottleneck: engineers had to write custom scripts, manage GPU quotas, and manually deploy models. The process was error‑prone and not reproducible.",
      solution:
        "Built a web interface (Next.js) that accepts dataset uploads, selects base models, and configures LoRA hyperparameters. Training runs on a Kubernetes job using Axolotl. The resulting adapter is registered in MLflow and deployed via vLLM.",
      architectureHighlights: [
        { title: "PEFT Configurator", description: "LoRA rank, alpha, target modules – with resource estimation.", icon: "⚙️" },
        { title: "Kubernetes Training Jobs", description: "Spot instance support, automatic checkpointing.", icon: "⎈" },
        { title: "Model Registry & Deployment", description: "MLflow + vLLM for low‑latency inference.", icon: "🚀" },
      ],
      implementationPhases: [
        { phase: "Phase 1", title: "Dataset Management", description: "Data validation, splitting, and versioning.", duration: "4 weeks" },
        { phase: "Phase 2", title: "Training Orchestration", description: "Kubernetes job submission, monitoring, and logging.", duration: "6 weeks" },
        { phase: "Phase 3", title: "Deployment Pipeline", description: "Model registry, canary deployments, and auto‑scaling.", duration: "4 weeks" },
      ],
      keyFeatures: [
        "Drag‑and‑drop dataset upload with automatic validation",
        "LoRA/QLoRA configuration with budget estimation",
        "Training job dashboard with real‑time metrics",
        "One‑click deployment to inference endpoint",
      ],
      results: [
        "Reduced fine‑tuning time from weeks to hours",
        "Empowered 8 engineering teams to fine‑tune their own models",
        "Saved ~$30k/month in GPU costs through spot instance optimisation",
      ],
      metrics: [
        { label: "Fine‑tuning Time Reduction", value: "90%", trend: "up" },
        { label: "Monthly Savings", value: "$30k", trend: "up" },
        { label: "Teams Using Platform", value: "8", trend: "up" },
      ],
      technologies: [
        { name: "Axolotl", icon: "🦎" },
        { name: "MLflow", icon: "📦" },
        { name: "vLLM", icon: "⚡" },
        { name: "Kubernetes", icon: "⎈" },
        { name: "Next.js", icon: "▲" },
      ],
      images: [{ src: "/projects/fine-tuning-studio.jpg", alt: "Fine‑Tuning Studio Interface" }],
      links: [{ type: "demo", url: "#", label: "Case Study" }],
      featured: false,
      order: 6,
      status: "completed",
    },
  ],

  // Call to Action
  cta: {
    heading: "Have a project in mind?",
    description:
      "From agent architectures to production AI pipelines — let’s build something extraordinary together.",
    buttonText: "Start a Conversation",
    href: "/contact",
  },
};