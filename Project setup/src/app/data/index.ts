// ─── Portfolio Mock Data ─────────────────────────────────────────────────────

export const PROFILE = {
  name: "Jordan Mercer",
  initials: "JM",
  title: "AI Agent Architect & MLOps Engineer",
  tagline: "Designing agentic AI workflows, scalable ML pipelines, and production-ready data systems.",
  location: "San Francisco, CA",
  email: "jordan@aiarchitect.dev",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resumeUrl: "/jordan-mercer-ai-mlops-resume-2025.pdf",
  bio: `I specialize in architecting production-grade agentic AI systems and end-to-end MLOps pipelines.
  With a background spanning data science, infrastructure, and distributed systems, I bridge the gap between
  research and deployment — shipping models that scale.`,
};

export const SERVICES = [
  {
    id: 1,
    icon: "Brain",
    title: "Agentic AI Architecture",
    description: "Design multi-agent systems with LangGraph, AutoGen, and custom orchestration frameworks for complex task automation.",
  },
  {
    id: 2,
    icon: "GitBranch",
    title: "MLOps Pipeline Design",
    description: "End-to-end ML lifecycle management — from experiment tracking and model registry to continuous deployment and monitoring.",
  },
  {
    id: 3,
    icon: "BarChart2",
    title: "Data Science & Analytics",
    description: "Transform raw data into actionable intelligence with rigorous statistical analysis and advanced ML modeling.",
  },
  {
    id: 4,
    icon: "Server",
    title: "Production AI Deployment",
    description: "Containerized model serving with Kubernetes, autoscaling, A/B testing, and real-time observability stacks.",
  },
];

export const SKILLS = {
  "Agentic AI & LLMs": [
    "LangChain", "LangGraph", "AutoGen", "CrewAI", "OpenAI API",
    "Anthropic Claude", "Hugging Face", "LlamaIndex", "RAG Pipelines", "Vector DBs",
  ],
  "Machine Learning & Data Science": [
    "PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "Optuna",
    "SHAP", "MLflow", "DVC", "Pandas", "NumPy",
  ],
  "MLOps & Infrastructure": [
    "Apache Airflow", "Kubeflow", "BentoML", "Ray Serve", "Seldon Core",
    "Docker", "Kubernetes", "Terraform", "Helm", "ArgoCD",
  ],
  "Data Engineering": [
    "Apache Spark", "Apache Kafka", "Apache Flink", "dbt", "Snowflake",
    "BigQuery", "Databricks", "Delta Lake", "Prefect", "Great Expectations",
  ],
  "Cloud & DevOps": [
    "AWS (SageMaker, Lambda, ECS)", "GCP (Vertex AI, BigQuery)", "Azure ML",
    "GitHub Actions", "Jenkins", "Prometheus", "Grafana", "OpenTelemetry",
  ],
  "Languages & Tools": [
    "Python", "SQL", "Bash", "TypeScript", "Go",
    "Jupyter", "VS Code", "Git", "Weights & Biases", "Evidently AI",
  ],
};

export const PROJECTS = [
  {
    id: "agentic-rag-pipeline",
    title: "Agentic RAG Pipeline",
    tagline: "Multi-agent retrieval-augmented generation with LangGraph and Qdrant",
    description: `A production-grade multi-agent RAG system built with LangGraph, featuring a supervisor agent that routes queries to specialized sub-agents — a retriever, a web searcher, and a reasoner. Deployed on Kubernetes with auto-scaling and sub-100ms p95 latency.`,
    image: "https://images.unsplash.com/photo-1768327239584-e97d004f1830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjBkYXRhJTIwc2NpZW5jZSUyMGFic3RyYWN0JTIwZGFya3xlbnwxfHx8fDE3NzI2MzUwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI/ML",
    tags: ["LangGraph", "Python", "Qdrant", "FastAPI", "Kubernetes", "OpenAI"],
    year: 2025,
    role: "Lead AI Architect",
    timeline: "3 Months",
    github: "https://github.com",
    demo: "https://demo.example.com",
    featured: true,
    overview: "The challenge was building a RAG system that could handle complex multi-hop queries across diverse data sources — PDFs, Confluence wikis, and live APIs — while maintaining contextual coherence and traceability.",
    challenge: "Single-agent RAG systems consistently hallucinated on cross-domain queries. Token context limits required intelligent chunking, and latency spikes occurred under high concurrency.",
    solution: "Implemented a supervisor-worker graph with LangGraph where the supervisor decomposes queries and dispatches to specialized agents. Used Qdrant hybrid search (dense + sparse) with MMR reranking. Deployed via BentoML on GKE with horizontal pod autoscaling.",
    results: ["Reduced hallucination rate by 67% over baseline RAG", "Sub-100ms p95 retrieval latency at 500 RPS", "Integrated with 4 enterprise data sources", "Deployed to production serving 10k+ daily queries"],
  },
  {
    id: "mlops-orchestration-platform",
    title: "MLOps Orchestration Platform",
    tagline: "End-to-end ML lifecycle with Airflow, MLflow, and GitOps",
    description: `A self-service MLOps platform enabling data scientists to go from notebook to production in under an hour. Includes experiment tracking, model registry, automated retraining triggers, A/B deployment, and drift monitoring.`,
    image: "https://images.unsplash.com/photo-1708807524676-86a7a4d42d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBwaXBlbGluZSUyMHdvcmtmbG93JTIwZGlhZ3JhbXxlbnwxfHx8fDE3NzI2MzUwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "MLOps",
    tags: ["Apache Airflow", "MLflow", "Kubernetes", "Terraform", "ArgoCD", "Python"],
    year: 2024,
    role: "MLOps Lead",
    timeline: "5 Months",
    github: "https://github.com",
    demo: "https://demo.example.com",
    featured: true,
    overview: "A Fortune 500 client had 30+ ML models deployed as spaghetti scripts — no versioning, no monitoring, and retraining happened manually. This platform standardized their entire ML lifecycle.",
    challenge: "Existing workflows were inconsistent across teams. Models had no lineage tracking. Retraining pipelines failed silently. Deployment required DevOps intervention for every release.",
    solution: "Built on Apache Airflow for orchestration, MLflow for tracking and registry, and ArgoCD for GitOps-based deployment. Custom Terraform modules provisioned per-project environments. Evidently AI for drift detection with PagerDuty integration.",
    results: ["Reduced model deployment time from 2 weeks to 45 minutes", "100% model lineage coverage", "Automated retraining triggered on data drift detection", "Supports 8 teams and 40+ models in production"],
  },
  {
    id: "real-time-anomaly-detection",
    title: "Real-time Anomaly Detection",
    tagline: "Streaming anomaly detection for financial fraud at scale",
    description: `A streaming ML system detecting fraudulent transactions in real-time using Kafka Streams and a custom ensemble of isolation forests and LSTM autoencoders. Processes 50k+ events per second with <10ms decision latency.`,
    image: "https://images.unsplash.com/photo-1687603849601-ef2bd73820cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMFB5dGhvbiUyMGNvZGUlMjBwcm9ncmFtbWluZyUyMGRhcmt8ZW58MXx8fHwxNzcyNjM1MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI/ML",
    tags: ["Apache Kafka", "PyTorch", "Flink", "Redis", "Grafana", "Python"],
    year: 2024,
    role: "Lead Data Scientist",
    timeline: "4 Months",
    github: "https://github.com",
    demo: null,
    featured: true,
    overview: "A payments processor needed sub-second fraud detection across multiple concurrent transaction streams without impacting checkout latency or generating excessive false positives.",
    challenge: "Batch-based fraud models had 2-4 hour detection lag. Class imbalance (0.1% fraud rate) caused models to miss rare attack patterns. Stateful aggregations required complex distributed state management.",
    solution: "Deployed Flink for stateful stream processing, feeding a two-stage model: fast Isolation Forest (< 1ms) for triage, then LSTM autoencoder for deep anomaly scoring. Feature store backed by Redis with TTL-based session windows.",
    results: ["50k+ events/sec throughput", "<10ms end-to-end decision latency", "43% reduction in fraudulent transaction value", "False positive rate maintained below 0.3%"],
  },
  {
    id: "llm-finetuning-framework",
    title: "LLM Fine-tuning Framework",
    tagline: "Domain-adaptive LLM fine-tuning with QLoRA and automated evaluation",
    description: `A modular framework for fine-tuning large language models on domain-specific data using QLoRA. Features automated dataset curation, RLHF preference collection, multi-GPU distributed training, and benchmark-driven model selection.`,
    image: "https://images.unsplash.com/photo-1710584805097-4e116679213f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbm9tb3VzJTIwQUklMjByb2JvdCUyMGFnZW50JTIwZnV0dXJpc3RpYyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNjM1MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI/ML",
    tags: ["PyTorch", "Hugging Face", "QLoRA", "vLLM", "W&B", "Python"],
    year: 2024,
    role: "ML Engineer",
    timeline: "6 Months",
    github: "https://github.com",
    demo: "https://demo.example.com",
    featured: false,
    overview: "Organizations needed domain-specific LLMs that outperform general-purpose models on specialized tasks (legal, medical, financial) without the cost of training from scratch.",
    challenge: "Full fine-tuning of 7B+ parameter models required expensive GPU clusters. Data quality was inconsistent. Evaluation metrics didn't capture real-world performance differences.",
    solution: "QLoRA for memory-efficient fine-tuning (4-bit quantization), automated dataset quality filtering via perplexity scoring, multi-GPU training with DeepSpeed ZeRO-3, and a custom eval harness comparing against domain benchmarks.",
    results: ["14% improvement over GPT-4o baseline on domain benchmarks", "70% reduction in fine-tuning compute cost via QLoRA", "Framework supports Llama, Mistral, Qwen model families", "Open-sourced with 800+ GitHub stars"],
  },
  {
    id: "ai-workflow-orchestrator",
    title: "AI Workflow Orchestrator",
    tagline: "Visual no-code builder for multi-agent AI workflows",
    description: `A visual workflow builder enabling non-engineers to design, test, and deploy multi-agent AI workflows. Features a React Flow canvas, real-time execution tracing, and one-click deployment to managed infrastructure.`,
    image: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMGRhdGElMjBjZW50ZXIlMjBpbmZyYXN0cnVjdHVyZSUyMHRlY2h8ZW58MXx8fHwxNzcyNjM1MDkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Frontend",
    tags: ["React", "TypeScript", "LangGraph", "FastAPI", "PostgreSQL", "Docker"],
    year: 2025,
    role: "Full-Stack Lead",
    timeline: "4 Months",
    github: "https://github.com",
    demo: "https://demo.example.com",
    featured: false,
    overview: "Product managers and domain experts needed to prototype AI agent workflows without writing code or waiting for engineering cycles.",
    challenge: "Translating visual graph structures to executable agent code. Handling real-time streaming execution feedback. Ensuring security isolation between user-defined agents.",
    solution: "React Flow for the canvas, compiling node graphs to LangGraph definitions at runtime. FastAPI backend with WebSocket streaming for real-time trace updates. Docker-in-Docker sandboxing for code execution nodes.",
    results: ["Reduced prototype-to-demo time from weeks to hours", "100+ workflows deployed by non-engineers in first month", "Supports 20+ node types including code, LLM, tool, and routing nodes"],
  },
  {
    id: "predictive-analytics-dashboard",
    title: "Predictive Analytics Dashboard",
    tagline: "Real-time ML model monitoring and business intelligence platform",
    description: `A unified observability platform for ML models and business KPIs. Features drift detection, performance degradation alerts, feature importance tracking, and integrates with existing BI tools via a REST API.`,
    image: "https://images.unsplash.com/photo-1647514422086-18cde746fa26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbGFuZ3VhZ2UlMjBwcm9jZXNzaW5nJTIwdGV4dCUyMGFuYWx5c2lzJTIwTkxQfGVufDF8fHx8MTc3MjYzNTA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "MLOps",
    tags: ["React", "Python", "Evidently AI", "Grafana", "Prometheus", "ClickHouse"],
    year: 2023,
    role: "Full-Stack Engineer",
    timeline: "3 Months",
    github: "https://github.com",
    demo: "https://demo.example.com",
    featured: false,
    overview: "A data team needed unified visibility across 15 production models — correlating ML degradation signals with downstream business impact in a single pane of glass.",
    challenge: "Data lived in silos across MLflow, Grafana, and internal databases. Business stakeholders needed non-technical views. Alerting had too many false positives causing alert fatigue.",
    solution: "Built a custom aggregation layer querying MLflow, Prometheus, and ClickHouse. Adaptive thresholds using rolling baselines reduced alert noise by 70%. Separate business and technical views with role-based access.",
    results: ["Unified observability across 15 production models", "70% reduction in alert fatigue", "MTTR for model incidents reduced by 55%", "Adopted as standard monitoring solution across 3 business units"],
  },
];

export const BLOG_POSTS = [
  {
    id: "building-production-agentic-ai-langgraph",
    title: "Building Production-Grade Agentic AI Systems with LangGraph",
    excerpt: "A deep dive into architecting stateful multi-agent workflows with LangGraph — covering graph design patterns, memory management, and deployment strategies that actually hold up under production load.",
    date: "February 20, 2025",
    readTime: "12 min read",
    category: "AI/ML",
    tags: ["LangGraph", "Agents", "Production", "Python"],
    featured: true,
    body: `
## Introduction

Agentic AI systems represent a paradigm shift from single-shot LLM calls to stateful, multi-step reasoning workflows. LangGraph — built on LangChain — provides the graph primitives needed to build them reliably.

## Why Graph-Based Agents?

Traditional chain-based agents struggle with:
- **Branching logic** — conditional routing based on intermediate results
- **State management** — persisting context across multiple tool calls
- **Human-in-the-loop** — pausing execution for approval or clarification
- **Parallelism** — running independent sub-tasks concurrently

LangGraph solves all of these via a directed graph abstraction where nodes are functions and edges carry typed state.

## Core Architecture Patterns

### 1. Supervisor Pattern
A supervisor node routes to specialized worker agents based on the query type.

\`\`\`python
from langgraph.graph import StateGraph, END

def supervisor(state):
    intent = classify_intent(state["messages"][-1])
    if intent == "retrieval":
        return "retriever_agent"
    elif intent == "analysis":
        return "analysis_agent"
    return END

graph = StateGraph(AgentState)
graph.add_node("supervisor", supervisor)
graph.add_node("retriever_agent", retriever_agent)
graph.add_node("analysis_agent", analysis_agent)
graph.add_conditional_edges("supervisor", route_by_intent)
\`\`\`

### 2. Reflection Pattern
An evaluator node scores the output and loops back if quality is insufficient.

## Production Deployment Considerations

- **Checkpointing**: Use PostgreSQL-backed checkpointers for durability
- **Streaming**: Use \`astream_events\` for real-time UI updates
- **Observability**: Integrate LangSmith or custom OTEL exporters
- **Concurrency**: Run independent subgraphs with asyncio gather

## Conclusion

LangGraph gives you the control primitives to build agents that behave predictably in production. Start with a simple supervisor pattern and add complexity only when the use case demands it.
    `,
  },
  {
    id: "mlops-best-practices-2025",
    title: "MLOps Best Practices: From Experiment Tracking to Model Serving",
    excerpt: "The complete lifecycle — structuring experiments with MLflow, automating training pipelines with Airflow, and serving models reliably with BentoML and Kubernetes. Lessons from 3 years in production.",
    date: "January 15, 2025",
    readTime: "15 min read",
    category: "MLOps",
    tags: ["MLflow", "Airflow", "Kubernetes", "BentoML"],
    featured: false,
    body: `
## The ML Lifecycle Problem

Most teams treat ML like software but it's fundamentally different — the behavior is shaped by data, not just code. That's why standard DevOps practices fail when applied naively to ML.

## Experiment Tracking with MLflow

Every experiment should log:
- Parameters (hyperparameters, data versions)
- Metrics (train/val loss, business KPIs)
- Artifacts (model weights, confusion matrices)
- Tags (git commit, author, dataset hash)

\`\`\`python
import mlflow

with mlflow.start_run():
    mlflow.log_params({"learning_rate": 0.001, "epochs": 50})
    mlflow.log_metrics({"val_f1": 0.94, "val_auc": 0.97})
    mlflow.sklearn.log_model(model, "model")
\`\`\`

## Automated Pipelines with Airflow

...

## Model Serving with BentoML

...
    `,
  },
  {
    id: "multi-agent-workflows-automation",
    title: "Implementing Multi-Agent Workflows for Complex Task Automation",
    excerpt: "How to decompose complex business processes into coordinated agent tasks — with real examples from document processing, research synthesis, and code generation pipelines.",
    date: "December 10, 2024",
    readTime: "10 min read",
    category: "AI/ML",
    tags: ["Agents", "AutoGen", "CrewAI", "Orchestration"],
    featured: false,
    body: `## Multi-Agent Decomposition\n\nNot every task should be handled by a single agent...`,
  },
  {
    id: "vector-databases-rag-deep-dive",
    title: "Vector Databases Deep Dive: Choosing the Right Tool for RAG",
    excerpt: "Comparing Qdrant, Weaviate, Pinecone, and pgvector across dimensions that actually matter: filtered search accuracy, hybrid retrieval quality, and operational overhead at scale.",
    date: "November 28, 2024",
    readTime: "14 min read",
    category: "Tutorials",
    tags: ["RAG", "Vector DB", "Qdrant", "Embeddings"],
    featured: false,
    body: `## Why Vector DB Choice Matters\n\nNot all vector databases are created equal...`,
  },
  {
    id: "ml-model-monitoring-evidently-grafana",
    title: "Real-time ML Model Monitoring with Evidently and Grafana",
    excerpt: "A practical guide to detecting data drift, prediction drift, and model degradation in production — with a reference architecture using Evidently AI, Prometheus, and Grafana.",
    date: "October 14, 2024",
    readTime: "11 min read",
    category: "MLOps",
    tags: ["Evidently AI", "Grafana", "Prometheus", "Monitoring"],
    featured: false,
    body: `## The Model Decay Problem\n\nModels don't fail dramatically — they degrade silently...`,
  },
  {
    id: "rag-chunking-strategies",
    title: "Advanced RAG Chunking Strategies That Actually Work",
    excerpt: "Beyond naive fixed-size chunking: semantic chunking, late chunking, contextual retrieval, and proposition-level indexing — benchmarked against real enterprise corpora.",
    date: "September 5, 2024",
    readTime: "9 min read",
    category: "Tutorials",
    tags: ["RAG", "Chunking", "LLMs", "Python"],
    featured: false,
    body: `## Why Chunking Is the Biggest RAG Lever\n\nMost RAG failures trace back to poor chunking...`,
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    title: "Senior AI Architect",
    company: "Nexus AI Labs",
    location: "San Francisco, CA",
    start: "Jan 2024",
    end: "Present",
    type: "Full-time",
    bullets: [
      "Architected a multi-agent RAG system processing 10k+ daily queries with sub-100ms p95 latency",
      "Led a team of 4 ML engineers to build a self-service MLOps platform reducing deployment time by 95%",
      "Designed agentic workflow orchestration framework adopted as company-wide standard",
      "Established ML observability practices with Evidently AI + Grafana, reducing MTTR by 55%",
    ],
  },
  {
    id: 2,
    title: "ML Engineer II",
    company: "DataFlow Systems",
    location: "Seattle, WA (Remote)",
    start: "Mar 2022",
    end: "Dec 2023",
    type: "Full-time",
    bullets: [
      "Built real-time fraud detection system processing 50k+ events/sec with <10ms decision latency",
      "Implemented Kafka Streams + Flink pipeline for stateful feature computation at scale",
      "Developed and maintained 8 production ML models with continuous retraining pipelines",
      "Created internal ML training bootcamp adopted by 15 data scientists across the org",
    ],
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Cognify Analytics",
    location: "Austin, TX",
    start: "Jun 2020",
    end: "Feb 2022",
    type: "Full-time",
    bullets: [
      "Built demand forecasting models (LSTM + XGBoost ensemble) reducing inventory costs by 18%",
      "Designed and deployed customer churn prediction model achieving 0.89 AUC in production",
      "Migrated analytics infrastructure from on-prem to GCP BigQuery + Vertex AI",
      "Created automated reporting pipeline with dbt + Looker serving 50+ stakeholders daily",
    ],
  },
  {
    id: 4,
    title: "ML Research Intern",
    company: "Stanford HAI (Human-Centered AI)",
    location: "Stanford, CA",
    start: "Jun 2019",
    end: "Aug 2019",
    type: "Internship",
    bullets: [
      "Researched interpretability methods for transformer-based NLP models",
      "Published findings as co-author in workshop paper at NeurIPS 2019",
      "Implemented attention visualization tools in PyTorch",
    ],
  },
];

export const EDUCATION = [
  {
    id: 1,
    degree: "M.S. in Computer Science",
    concentration: "Machine Learning & AI",
    institution: "Carnegie Mellon University",
    year: "2020",
    honors: "GPA: 3.94 / 4.0",
  },
  {
    id: 2,
    degree: "B.S. in Mathematics & Statistics",
    concentration: "Applied Statistics",
    institution: "UC Berkeley",
    year: "2018",
    honors: "Magna Cum Laude",
  },
];

export const CERTIFICATIONS = [
  { id: 1, name: "AWS Certified Machine Learning – Specialty", issuer: "Amazon Web Services", year: "2024" },
  { id: 2, name: "Google Professional ML Engineer", issuer: "Google Cloud", year: "2023" },
  { id: 3, name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", year: "2023" },
  { id: 4, name: "Deep Learning Specialization", issuer: "DeepLearning.AI / Coursera", year: "2021" },
];

export const COURSES = [
  {
    id: "agentic-ai-systems-101",
    title: "Agentic AI Systems: From Architecture to Production",
    description: "A 12-lesson course covering the full lifecycle of building production agentic AI systems — from design patterns to deployment and monitoring.",
    lessons: 12,
    duration: "6 hours",
    level: "Intermediate",
    tags: ["LangGraph", "Agents", "Python", "Production"],
    topics: [
      "Introduction to Agentic AI Paradigms",
      "Graph-Based Orchestration with LangGraph",
      "Memory & State Management for Agents",
      "Tool Use and Function Calling Patterns",
      "Multi-Agent Supervisor Architectures",
      "RAG Integration in Agent Systems",
      "Human-in-the-Loop Workflows",
      "Streaming & Real-Time Agent Responses",
      "Testing and Evaluating Agent Behavior",
      "Deploying Agents to Production",
      "Observability and Debugging Agents",
      "Scaling Agents: Concurrency & Cost",
    ],
  },
  {
    id: "mlops-zero-to-production",
    title: "MLOps Zero to Production",
    description: "A practical, hands-on guide to building enterprise MLOps infrastructure using open-source tools — Airflow, MLflow, BentoML, and Kubernetes.",
    lessons: 10,
    duration: "8 hours",
    level: "Advanced",
    tags: ["Airflow", "MLflow", "Kubernetes", "BentoML"],
    topics: [
      "MLOps Philosophy and Maturity Model",
      "Experiment Tracking with MLflow",
      "Data Versioning with DVC",
      "Pipeline Orchestration with Airflow",
      "Model Registry and Promotion Workflows",
      "Containerizing Models with BentoML",
      "Kubernetes Deployment Patterns for ML",
      "Continuous Training and A/B Testing",
      "Model Monitoring and Drift Detection",
      "Building a Self-Service MLOps Platform",
    ],
  },
];

export const TOOLS = [
  {
    category: "LLM Frameworks",
    items: [
      { name: "LangGraph", url: "https://langchain-ai.github.io/langgraph/", description: "Best-in-class for stateful multi-agent workflows. The go-to for production agentic systems.", rating: 5 },
      { name: "LlamaIndex", url: "https://www.llamaindex.ai/", description: "Excellent for data ingestion pipelines and RAG. Superior connector ecosystem.", rating: 4 },
      { name: "DSPy", url: "https://dspy-docs.vercel.app/", description: "Programmatic approach to LLM prompting. Game-changer for systematic prompt optimization.", rating: 4 },
    ],
  },
  {
    category: "MLOps Tools",
    items: [
      { name: "MLflow", url: "https://mlflow.org/", description: "Industry-standard experiment tracking and model registry. Excellent self-hosted option.", rating: 5 },
      { name: "Weights & Biases", url: "https://wandb.ai/", description: "Superior visualization and collaboration for ML experiments. Preferred for deep learning.", rating: 5 },
      { name: "BentoML", url: "https://bentoml.com/", description: "Best-in-class model serving abstraction. Makes containerization of models trivial.", rating: 4 },
    ],
  },
  {
    category: "Vector Databases",
    items: [
      { name: "Qdrant", url: "https://qdrant.tech/", description: "My default choice for production RAG. Fast, reliable, excellent filtered search support.", rating: 5 },
      { name: "pgvector", url: "https://github.com/pgvector/pgvector", description: "Best for orgs already on Postgres. Eliminates operational overhead for moderate scale.", rating: 4 },
      { name: "Weaviate", url: "https://weaviate.io/", description: "Strong GraphQL interface. Great for hybrid search use cases.", rating: 3 },
    ],
  },
];
