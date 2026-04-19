export const projects = [
  {
    id: 1,
    title: "Autonomous Researcher",
    description: "Multi-agent system powered by LangChain and GPT-4, producing comprehensive literature reviews.",
    image: "https://images.unsplash.com/photo-1620712948343-0008ece8f4a1?q=80&w=800&auto=format&fit=crop",
    tags: ["Python", "LangChain", "GPT-4"],
  },
  {
    id: 2,
    title: "MLOps Production Pipeline",
    description: "End-to-end Kubernetes-native CI/CD for computer vision model training and deployment.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    tags: ["Kubernetes", "PyTorch", "Docker"],
  },
  {
    id: 3,
    title: "Financial RAG System",
    description: "Vector DB retrieval augmentation architecture mapped to real-time market sentiment feeds.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
    tags: ["Pinecone", "FastAPI", "Next.js"],
  },
];

export const posts = [
  {
    id: 1,
    title: "Architecting Resilient Agentic Workflows",
    excerpt: "Why most LLM agents fail in production and how to build self-healing fallback states.",
    date: "APR 2024",
    readTime: "8 min read",
    category: "Architecture",
    slug: "architecting-resilient-agents"
  },
  {
    id: 2,
    title: "Optimizing Vector Search with Quantization",
    excerpt: "Reducing latency by 40% without compromising retrieval accuracy in high-dimensional spaces.",
    date: "MAR 2024",
    readTime: "12 min read",
    category: "MLOps",
    slug: "vector-search-quantization"
  },
  {
    id: 3,
    title: "The Fallacy of the Monolithic Prompt",
    excerpt: "Breaking down complex reasoning into chained, specialized agent functions.",
    date: "FEB 2024",
    readTime: "6 min read",
    category: "Prompt Engineering",
    slug: "monolithic-prompt-fallacy"
  },
  {
    id: 4,
    title: "Deploying PyTorch at the Edge",
    excerpt: "Strategies for model compression and ONNX runtime optimization on constrained devices.",
    date: "JAN 2024",
    readTime: "10 min read",
    category: "Infrastructure",
    slug: "pytorch-edge-deployment"
  },
  {
    id: 5,
    title: "State Management in LLM Applications",
    excerpt: "Beyond basic conversational memory: managing long-term context windows effectively.",
    date: "DEC 2023",
    readTime: "7 min read",
    category: "Architecture",
    slug: "llm-state-management"
  }
];

export const tools = [
  { name: 'Python', icon: 'Terminal', category: 'Language', color: 'amber' as const },
  { name: 'PyTorch', icon: 'Flame', category: 'Framework', color: 'amber' as const },
  { name: 'LangChain', icon: 'Link', category: 'Agents', color: 'blue' as const },
  { name: 'Kubernetes', icon: 'Ship', category: 'Orchestration', color: 'blue' as const },
  { name: 'Docker', icon: 'Container', category: 'Infrastructure', color: 'blue' as const },
  { name: 'Next.js', icon: 'Triangle', category: 'Frontend', color: 'amber' as const },
];
