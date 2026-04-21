// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  publishedAt: string;
  metrics?: { label: string; value: string }[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "callout"; text: string; variant: "info" | "warning" | "success" }
  | { type: "list"; items: string[] };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: ContentBlock[];
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  author: { name: string; avatar: string; role: string };
}

export interface Calculator {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: "finance" | "health" | "math" | "dev";
  emoji: string;
  featured: boolean;
  keywords: string[];
}

export interface Skill {
  name: string;
  category: string;
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "1",
    title: "NeuroForge LLM Suite",
    description:
      "A production-grade fine-tuning framework for large language models using LoRA and QLoRA, achieving 4× throughput on consumer GPUs.",
    longDescription:
      "NeuroForge is an end-to-end fine-tuning toolkit that abstracts the complexity of distributed training. It supports parameter-efficient methods including LoRA, QLoRA, and prefix tuning, with automatic mixed-precision and gradient checkpointing built in.",
    image: "https://images.unsplash.com/photo-1640941295021-a2f78b997312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    techStack: ["PyTorch", "Transformers", "DeepSpeed", "CUDA", "Python", "FastAPI"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    featured: true,
    category: "LLMs",
    publishedAt: "2024-03-15",
    metrics: [
      { label: "GitHub Stars", value: "4.2K" },
      { label: "Throughput Gain", value: "4×" },
      { label: "GPU Memory Saved", value: "60%" },
    ],
  },
  {
    id: "2",
    title: "VisionStack — Computer Vision Platform",
    description:
      "Multi-modal object detection and segmentation platform running real-time inference at 120 FPS on edge devices.",
    longDescription:
      "VisionStack provides a unified API for object detection (YOLO, RT-DETR), semantic segmentation, and pose estimation. Models are automatically quantized for edge deployment via ONNX Runtime and TensorRT.",
    image: "https://images.unsplash.com/photo-1571818684035-c1afe7eab7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    techStack: ["PyTorch", "ONNX", "TensorRT", "OpenCV", "FastAPI", "Docker"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    featured: true,
    category: "Computer Vision",
    publishedAt: "2024-01-08",
    metrics: [
      { label: "Inference Speed", value: "120 FPS" },
      { label: "mAP Score", value: "67.2" },
      { label: "Model Compression", value: "8×" },
    ],
  },
  {
    id: "3",
    title: "RAGFlow — Production RAG Pipeline",
    description:
      "A battle-tested Retrieval-Augmented Generation framework with hybrid search, re-ranking, and hallucination detection.",
    longDescription:
      "RAGFlow orchestrates the full RAG lifecycle: ingestion (PDF, HTML, Markdown, code), chunking, embedding, storage in Weaviate/Pinecone/Chroma, hybrid search (BM25 + dense), cross-encoder re-ranking, and LLM generation with citation grounding.",
    image: "https://images.unsplash.com/photo-1692607431225-5f4564c8f132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    techStack: ["LangChain", "LlamaIndex", "Weaviate", "Redis", "FastAPI", "Next.js"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    featured: true,
    category: "RAG",
    publishedAt: "2023-11-20",
    metrics: [
      { label: "Retrieval Accuracy", value: "94%" },
      { label: "Latency P95", value: "420ms" },
      { label: "Documents Indexed", value: "10M+" },
    ],
  },
  {
    id: "4",
    title: "AlphaRL — Reinforcement Learning Toolkit",
    description:
      "A modular RL library supporting PPO, SAC, and RLHF with multi-environment parallelism and W&B integration.",
    longDescription:
      "AlphaRL provides clean implementations of state-of-the-art RL algorithms with a focus on RLHF pipelines for language model alignment. Supports vectorized environments, custom reward modelling, and seamless W&B experiment tracking.",
    image: "https://images.unsplash.com/photo-1568585262983-9b54814595a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    techStack: ["PyTorch", "Gymnasium", "Ray RLlib", "W&B", "Python", "NumPy"],
    githubUrl: "https://github.com",
    featured: false,
    category: "Reinforcement Learning",
    publishedAt: "2023-09-12",
    metrics: [
      { label: "Environments", value: "50+" },
      { label: "Sample Efficiency", value: "3× base" },
      { label: "GitHub Stars", value: "1.8K" },
    ],
  },
  {
    id: "5",
    title: "MLOps Orchestrator",
    description:
      "Kubernetes-native ML pipeline orchestration with automated retraining, A/B testing, and drift detection.",
    longDescription:
      "A full MLOps platform built on Kubeflow and Argo Workflows that automates the complete ML lifecycle from data ingestion to production serving. Includes model registry, experiment tracking, and automated canary deployments.",
    image: "https://images.unsplash.com/photo-1667984390527-850f63192709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    techStack: ["Kubernetes", "Kubeflow", "MLflow", "Prometheus", "Grafana", "Terraform"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    featured: false,
    category: "MLOps",
    publishedAt: "2023-07-05",
    metrics: [
      { label: "Deployments/Day", value: "200+" },
      { label: "Uptime", value: "99.97%" },
      { label: "Models in Prod", value: "85" },
    ],
  },
  {
    id: "6",
    title: "NLP Workbench",
    description:
      "A zero-shot NLP toolkit powered by sentence transformers and custom classification heads for rapid domain adaptation.",
    longDescription:
      "NLP Workbench provides a CLI and web interface for zero-shot classification, named entity recognition, sentiment analysis, and summarisation without any labelled data. Powered by sentence-transformers and dynamic label generation.",
    image: "https://images.unsplash.com/photo-1762328862557-e0a36587cd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    techStack: ["Sentence-Transformers", "SpaCy", "Hugging Face", "Streamlit", "FastAPI"],
    githubUrl: "https://github.com",
    featured: false,
    category: "NLP",
    publishedAt: "2023-04-18",
    metrics: [
      { label: "Zero-shot Accuracy", value: "89%" },
      { label: "Languages", value: "45+" },
      { label: "Downloads/Month", value: "12K" },
    ],
  },
];

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────

const AUTHOR = {
  name: "Alex Reeves",
  avatar: "https://images.unsplash.com/photo-1618593706014-06782cd3bb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  role: "Senior AI/ML Engineer",
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "fine-tuning-llms-lora-practical-guide",
    title: "Fine-Tuning LLMs with LoRA: A Practical Guide",
    subtitle: "How to adapt a 70B model on a single A100 without going broke",
    excerpt:
      "Low-Rank Adaptation (LoRA) has fundamentally changed what's possible on constrained hardware. This guide walks through the mathematics, implementation, and production pitfalls from real-world experience.",
    category: "LLMs",
    tags: ["LoRA", "Fine-Tuning", "PyTorch", "Transformers", "PEFT"],
    coverImage: "https://images.unsplash.com/photo-1640941295021-a2f78b997312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    publishedAt: "2024-04-10",
    readingTime: 14,
    author: AUTHOR,
    content: [
      { type: "paragraph", text: "Low-Rank Adaptation (LoRA) is arguably the most important technique to emerge from the parameter-efficient fine-tuning literature. By decomposing weight updates into low-rank matrices, LoRA reduces trainable parameters by up to 10,000× while matching or exceeding full fine-tuning on most downstream tasks." },
      { type: "heading", level: 2, text: "The Mathematics of LoRA" },
      { type: "paragraph", text: "Traditional fine-tuning updates all model weights W ∈ ℝᵐˣⁿ. LoRA instead constrains updates to ΔW = BA where B ∈ ℝᵐˣʳ and A ∈ ℝʳˣⁿ with rank r ≪ min(m, n). Only A and B are trained; the pre-trained W is frozen." },
      { type: "code", language: "python", code: `import torch\nfrom peft import LoraConfig, get_peft_model\nfrom transformers import AutoModelForCausalLM\n\nmodel = AutoModelForCausalLM.from_pretrained(\n    "meta-llama/Llama-3-70b-hf",\n    load_in_4bit=True,\n    device_map="auto",\n)\n\nlora_config = LoraConfig(\n    r=64,\n    lora_alpha=128,\n    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],\n    lora_dropout=0.05,\n    bias="none",\n    task_type="CAUSAL_LM",\n)\n\nmodel = get_peft_model(model, lora_config)\nmodel.print_trainable_parameters()\n# trainable params: 83,886,080 || all params: 70,621,618,688 || trainable%: 0.12%` },
      { type: "heading", level: 2, text: "Choosing the Right Rank" },
      { type: "paragraph", text: "Rank selection is a hyperparameter, not a constant. Lower ranks (r=4–8) work well for simple tasks like classification. Instruction tuning benefits from r=32–64. Code generation and complex reasoning often require r=128+. Always sweep rank before committing to a training run." },
      { type: "callout", text: "Pro tip: Use singular value decomposition (SVD) on the task's gradient updates to empirically determine the intrinsic rank of your adaptation. The `peft` library's `adalora` method does this automatically.", variant: "info" },
      { type: "heading", level: 2, text: "Production Deployment Patterns" },
      { type: "list", items: ["Merge adapters before deployment using `merge_and_unload()` to eliminate inference latency.", "Store base model once; load multiple LoRA adapters dynamically (LoRA Hub pattern).", "For serving, use vLLM's native LoRA support with `--lora-modules`.", "Monitor adapter drift — adapters can degrade if the base model is updated."] },
      { type: "quote", text: "The goal of fine-tuning is not to teach the model new knowledge — it's to teach it a new behaviour on knowledge it already has.", author: "John Schulman, OpenAI" },
    ],
  },
  {
    id: "2",
    slug: "building-production-rag-pipelines",
    title: "Building Production-Ready RAG Pipelines",
    subtitle: "Beyond naive retrieval — the architecture decisions that actually matter",
    excerpt:
      "Naive RAG (embed → retrieve → generate) breaks in production at scale. Learn the advanced patterns: hybrid search, re-ranking, query expansion, and hallucination detection.",
    category: "LLMs",
    tags: ["RAG", "LangChain", "Weaviate", "Pinecone", "Production"],
    coverImage: "https://images.unsplash.com/photo-1768330187404-59e46cf222c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    publishedAt: "2024-03-22",
    readingTime: 18,
    author: AUTHOR,
    content: [
      { type: "paragraph", text: "Retrieval-Augmented Generation solved hallucination in theory. In practice, most RAG systems fail silently — they retrieve the wrong chunks, generate plausible-but-wrong answers, and provide no mechanism to detect the failure. This post covers the architectural patterns that separate toy demos from production systems." },
      { type: "heading", level: 2, text: "Why Naive RAG Fails" },
      { type: "paragraph", text: "Naive RAG pipelines embed queries with a single dense model and retrieve top-k chunks by cosine similarity. This fails when: (1) the query uses different vocabulary than the documents (semantic gap), (2) exact matches matter more than semantic similarity (keyword search problem), (3) the answer spans multiple chunks, or (4) documents contradict each other." },
      { type: "heading", level: 2, text: "Hybrid Search: BM25 + Dense Retrieval" },
      { type: "code", language: "python", code: `from weaviate.classes.query import HybridFusion\n\nresults = collection.query.hybrid(\n    query="transformer attention mechanism",\n    alpha=0.5,  # 0=BM25 only, 1=dense only, 0.5=equal blend\n    fusion_type=HybridFusion.RELATIVE_SCORE,\n    limit=20,\n    return_metadata=MetadataQuery(score=True),\n)\n\n# Then apply cross-encoder re-ranking\nfrom sentence_transformers import CrossEncoder\nreranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-12-v2")\nscores = reranker.predict([(query, r.properties["text"]) for r in results.objects])\nranked = sorted(zip(scores, results.objects), reverse=True)[:5]` },
      { type: "heading", level: 2, text: "Hallucination Detection" },
      { type: "paragraph", text: "Every generated answer should be verified against retrieved sources. Use an NLI model to check entailment — if the generated claim is not entailed by any retrieved chunk, flag it as potentially hallucinated." },
      { type: "callout", text: "Build an evaluation harness from day one. RAGAS (Retrieval Augmented Generation Assessment) provides standardised metrics for faithfulness, context precision, and answer relevancy.", variant: "success" },
    ],
  },
  {
    id: "3",
    slug: "attention-mechanisms-mathematics",
    title: "The Mathematics Behind Attention Mechanisms",
    subtitle: "Scaled dot-product, multi-head, cross-attention, and flash attention — derived from first principles",
    excerpt:
      "Attention is all you need — but do you understand why? A deep dive into the linear algebra, computational complexity, and architectural innovations that define modern transformers.",
    category: "Mathematics",
    tags: ["Transformers", "Attention", "Linear Algebra", "FlashAttention"],
    coverImage: "https://images.unsplash.com/photo-1692607431225-5f4564c8f132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    publishedAt: "2024-02-14",
    readingTime: 22,
    author: AUTHOR,
    content: [
      { type: "paragraph", text: "Attention mechanisms are the core innovation of the transformer architecture. Unlike RNNs that process tokens sequentially, attention allows every token to directly attend to every other token in O(1) steps — at the cost of O(n²) memory, which Flash Attention dramatically improves." },
      { type: "heading", level: 2, text: "Scaled Dot-Product Attention" },
      { type: "paragraph", text: "Given queries Q, keys K, and values V, attention is computed as: Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V. The √dₖ scaling factor prevents the dot products from growing large in magnitude as dₖ increases, which would push softmax into regions with extremely small gradients." },
      { type: "heading", level: 2, text: "Why Multi-Head?" },
      { type: "paragraph", text: "A single attention head computes one relation between tokens. Multi-head attention runs h heads in parallel, each with its own projection matrices Wᵢᴼ, Wᵢᴷ, Wᵢᵛ. This allows the model to jointly attend to information from different representation subspaces — syntax in one head, coreference in another, semantics in a third." },
      { type: "callout", text: "Flash Attention rewrites the attention computation to avoid materialising the full n×n attention matrix. By tiling computation in SRAM and using online softmax, it achieves O(n) memory instead of O(n²) — making 100K+ context windows feasible.", variant: "info" },
    ],
  },
  {
    id: "4",
    slug: "ml-models-kubernetes-production",
    title: "Deploying ML Models at Scale with Kubernetes",
    subtitle: "From Jupyter notebook to 99.99% uptime: the full MLOps journey",
    excerpt:
      "Kubernetes is the de facto infrastructure for serving ML models at scale. This guide covers autoscaling, GPU scheduling, canary deployments, and monitoring for production ML workloads.",
    category: "MLOps",
    tags: ["Kubernetes", "MLOps", "Docker", "Serving", "Monitoring"],
    coverImage: "https://images.unsplash.com/photo-1667984390527-850f63192709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    publishedAt: "2024-01-30",
    readingTime: 16,
    author: AUTHOR,
    content: [
      { type: "paragraph", text: "Most ML engineers are excellent at training models and terrible at keeping them alive in production. Kubernetes solves the operational complexity — but only if you understand its primitives and how they map to ML-specific concerns like GPU scheduling, long-running inference, and model versioning." },
      { type: "heading", level: 2, text: "GPU Scheduling and Node Affinity" },
      { type: "paragraph", text: "GPU nodes are expensive. Efficient scheduling requires node affinity rules, resource quotas, and priority classes to ensure critical inference pods preempt batch training jobs during traffic spikes." },
      { type: "heading", level: 2, text: "Canary Deployments for Models" },
      { type: "paragraph", text: "Model updates carry more risk than code updates. A new model can have subtly different behaviour that only emerges at scale. Progressive rollout with traffic splitting (95%/5%) and automatic rollback based on business metrics (not just latency) is non-negotiable." },
      { type: "callout", text: "Instrument your model server with custom Prometheus metrics: prediction distribution, feature drift scores, and business KPIs. Latency alone tells you nothing about model quality degradation.", variant: "warning" },
    ],
  },
  {
    id: "5",
    slug: "rlhf-chatgpt-explained",
    title: "Understanding RLHF: How ChatGPT Got So Good",
    subtitle: "The three-stage pipeline that aligns language models with human intent",
    excerpt:
      "Reinforcement Learning from Human Feedback (RLHF) is the alignment technique that transformed GPT-3 into ChatGPT. A technical deep dive into supervised fine-tuning, reward modelling, and PPO.",
    category: "RLHF",
    tags: ["RLHF", "PPO", "Alignment", "ChatGPT", "Reward Modelling"],
    coverImage: "https://images.unsplash.com/photo-1765894359240-49b82f93b91a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    publishedAt: "2023-12-12",
    readingTime: 20,
    author: AUTHOR,
    content: [
      { type: "paragraph", text: "RLHF is a three-stage process: (1) supervised fine-tuning on demonstration data, (2) training a reward model from human preference comparisons, (3) optimising the policy with PPO against the reward model while applying a KL penalty against the original SFT policy to prevent reward hacking." },
      { type: "heading", level: 2, text: "Stage 1: Supervised Fine-Tuning" },
      { type: "paragraph", text: "Before any reinforcement learning, the base model is fine-tuned on high-quality demonstrations collected from human labellers. These demonstrations show the model what 'helpful, harmless, honest' responses look like for a wide variety of prompts." },
      { type: "heading", level: 2, text: "Stage 2: Reward Modelling" },
      { type: "paragraph", text: "Human labellers rank two or more model outputs for the same prompt. These preferences train a reward model that learns to assign higher scores to outputs humans prefer. The reward model generalises to rank new outputs without human annotation." },
      { type: "quote", text: "The key insight of RLHF is that it's much easier for humans to compare two outputs than to generate an ideal output from scratch.", author: "InstructGPT paper, OpenAI 2022" },
    ],
  },
  {
    id: "6",
    slug: "vector-databases-compared",
    title: "Vector Databases Compared: Pinecone vs Weaviate vs Chroma",
    subtitle: "A rigorous benchmark across 10M vectors on latency, recall, and operational complexity",
    excerpt:
      "Not all vector databases are created equal. A hands-on performance comparison at 10M vector scale across the leading managed and self-hosted options, with opinionated recommendations for each use case.",
    category: "Infrastructure",
    tags: ["Vector DB", "Pinecone", "Weaviate", "Chroma", "Benchmark"],
    coverImage: "https://images.unsplash.com/photo-1591206246042-2ed5fec8f27e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    publishedAt: "2023-11-05",
    readingTime: 12,
    author: AUTHOR,
    content: [
      { type: "paragraph", text: "Choosing a vector database is one of the most consequential infrastructure decisions in an AI application. Get it wrong and you face vendor lock-in, scalability walls, or operational nightmares. This benchmark tests Pinecone, Weaviate, and Chroma against 10M vectors of 1536 dimensions (OpenAI ada-002 embeddings)." },
      { type: "heading", level: 2, text: "Benchmark Methodology" },
      { type: "list", items: ["Dataset: 10M vectors, 1536 dimensions, OpenAI ada-002 embeddings from a legal document corpus.", "Query load: 1000 concurrent queries, measuring P50/P95/P99 latency.", "Recall@10: how often the true nearest neighbours appear in the top-10 results.", "Operational: time to index 1M vectors, memory footprint, recovery from crash."] },
      { type: "heading", level: 2, text: "Results Summary" },
      { type: "paragraph", text: "Pinecone wins on managed simplicity and P99 latency. Weaviate wins on hybrid search quality and data sovereignty. Chroma wins for local development and prototyping. For production at scale, Weaviate's self-hosted mode with HNSW indexing provides the best balance of performance and control." },
      { type: "callout", text: "If you're on the OpenAI stack and budget is no concern: Pinecone. If you need hybrid search + data residency: Weaviate. If you're prototyping solo: Chroma.", variant: "success" },
    ],
  },
];

// ─── CALCULATORS ──────────────────────────────────────────────────────────────

export const calculators: Calculator[] = [
  { id: "1", slug: "mortgage", name: "Mortgage Calculator", description: "Calculate monthly payments, total interest, and generate a full amortisation schedule for any home loan.", category: "finance", emoji: "🏠", featured: true, keywords: ["mortgage", "home loan", "monthly payment", "amortization"] },
  { id: "2", slug: "compound-interest", name: "Compound Interest", description: "Project the future value of any investment with configurable compounding frequency and additional contributions.", category: "finance", emoji: "📈", featured: true, keywords: ["compound interest", "investment", "future value", "savings"] },
  { id: "3", slug: "bmi", name: "BMI Calculator", description: "Calculate your Body Mass Index and understand what it means for your health with detailed category breakdowns.", category: "health", emoji: "⚖️", featured: true, keywords: ["BMI", "body mass index", "health", "weight"] },
  { id: "4", slug: "tax-bracket", name: "Tax Bracket Calculator", description: "Estimate your US federal income tax liability across all brackets with marginal and effective rate breakdown.", category: "finance", emoji: "🧾", featured: true, keywords: ["tax", "income tax", "tax bracket", "IRS"] },
  { id: "5", slug: "percentage", name: "Percentage Calculator", description: "Solve any percentage problem: X% of Y, percentage change, percentage difference, and reverse lookups.", category: "math", emoji: "💯", featured: false, keywords: ["percentage", "percent", "calculation"] },
  { id: "6", slug: "base-converter", name: "Number Base Converter", description: "Instantly convert numbers between decimal, binary, hexadecimal, and octal with step-by-step working.", category: "dev", emoji: "🔢", featured: false, keywords: ["binary", "hexadecimal", "octal", "base conversion"] },
  { id: "7", slug: "password-strength", name: "Password Strength Meter", description: "Analyse password strength in real-time, estimate crack time, and get suggestions for improvement.", category: "dev", emoji: "🔐", featured: false, keywords: ["password", "security", "strength", "crack time"] },
  { id: "8", slug: "unit-converter", name: "Unit Converter", description: "Convert between hundreds of units across length, weight, temperature, area, volume, speed, and more.", category: "math", emoji: "📏", featured: false, keywords: ["unit conversion", "length", "weight", "temperature"] },
];

// ─── SKILLS ───────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // ML & AI
  { name: "PyTorch", category: "ML & AI" },
  { name: "TensorFlow", category: "ML & AI" },
  { name: "JAX/Flax", category: "ML & AI" },
  { name: "Hugging Face", category: "ML & AI" },
  { name: "LangChain", category: "ML & AI" },
  { name: "LlamaIndex", category: "ML & AI" },
  { name: "ONNX Runtime", category: "ML & AI" },
  { name: "TensorRT", category: "ML & AI" },
  // Languages
  { name: "Python", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "Rust", category: "Languages" },
  { name: "CUDA C++", category: "Languages" },
  { name: "SQL", category: "Languages" },
  // Infrastructure
  { name: "Kubernetes", category: "Infrastructure" },
  { name: "Docker", category: "Infrastructure" },
  { name: "Terraform", category: "Infrastructure" },
  { name: "AWS SageMaker", category: "Infrastructure" },
  { name: "GCP Vertex AI", category: "Infrastructure" },
  { name: "Ray", category: "Infrastructure" },
  // Data
  { name: "Apache Spark", category: "Data" },
  { name: "dbt", category: "Data" },
  { name: "Airflow", category: "Data" },
  { name: "Kafka", category: "Data" },
  { name: "Weaviate", category: "Data" },
  // Web
  { name: "Next.js", category: "Web" },
  { name: "FastAPI", category: "Web" },
  { name: "Django", category: "Web" },
  { name: "React", category: "Web" },
  { name: "GraphQL", category: "Web" },
];

export const CATEGORIES = ["All", "LLMs", "MLOps", "Mathematics", "Infrastructure", "RLHF"];
export const BLOG_CATEGORIES = ["All", "LLMs", "Mathematics", "MLOps", "RLHF", "Infrastructure"];
export const CALC_CATEGORIES = [
  { key: "all", label: "All Tools" },
  { key: "finance", label: "Finance" },
  { key: "health", label: "Health" },
  { key: "math", label: "Mathematics" },
  { key: "dev", label: "Developer" },
];
