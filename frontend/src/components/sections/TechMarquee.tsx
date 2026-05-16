'use client';

const TECH_STACK = [
  'LangGraph', 'PyTorch', 'Apache Airflow', 'Kubernetes', 'MLflow',
  'Apache Kafka', 'LangChain', 'Qdrant', 'BentoML', 'Terraform',
  'OpenAI', 'Hugging Face', 'DVC', 'Ray Serve', 'Evidently AI',
  'Apache Flink', 'dbt', 'Snowflake', 'ArgoCD', 'Weights & Biases',
];

export function TechMarquee() {
  return (
    <div className="border-y border-glass-border py-4 bg-black/40">
      <div className="flex flex-wrap justify-center gap-3">
        {TECH_STACK.map((tech, i) => (
          <span key={i} className="text-xs whitespace-nowrap px-3 py-1 rounded-full glass text-outline">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}