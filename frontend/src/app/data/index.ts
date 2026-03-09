import { Tool } from "../types/api";

// ─── Portfolio Mock Data ─────────────────────────────────────────────────────

export const PROFILE = {
  name: "Mr. Maimoon Amin",
  initials: "Moon",
  title: "AI Agent Architect & MLOps Engineer",
  tagline: "Designing agentic AI workflows, scalable ML pipelines, and production-ready data systems.",
  location: "San Francisco, CA",
  email: "ideal.rhel@gmail.com",
  github: "https://github.com/Maimoon-github",
  linkedin: "https://www.linkedin.com/in/maimoon-moon-amin/",
  twitter: "https://twitter.com",
  resumeUrl: "",
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

export const TOOLS: Tool[] = [
  {
    id: "ap-bio",
    name: "AP Bio Score Calculator",
    slug: "ap-bio-calculator",
    description: "Estimate your AP Biology exam score using College Board weighting.",
    website_url: "/tools/ap-bio-calculator",
    category_name: "Calculators",
    featured: true,
    order: 1,
    logo: null,
  },
  {
    id: "ap-calc-bc",
    name: "AP Calc BC Score Calculator",
    slug: "ap-calc-bc-calculator",
    description: "Calculate your AP Calculus BC composite score and AB subscore.",
    website_url: "/tools/ap-calc-bc-calculator",
    category_name: "Calculators",
    featured: true,
    order: 2,
    logo: null,
  },
  {
    id: "ap-chem",
    name: "AP Chem Score Calculator",
    slug: "ap-chem-calculator",
    description: "Predict your AP Chemistry score based on raw MCQ and FRQ points.",
    website_url: "/tools/ap-chem-calculator",
    category_name: "Calculators",
    featured: true,
    order: 3,
    logo: null,
  },
  // Add the remaining calculators following the same pattern.
  // Make sure the id is unique and the slug matches the route.
];