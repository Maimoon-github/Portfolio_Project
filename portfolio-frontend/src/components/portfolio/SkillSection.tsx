// src/components/portfolio/SkillSection.tsx
// Skills summary — category grid with 2px Neo-Mint progress indicators.
// Server component; data is static here, replace with fetchSkills() as needed.

import { cn } from '@/lib/utils';

// ── Static skill data ─────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: 'Machine Learning',
    items: [
      { label: 'PyTorch / JAX',       proficiency: 95 },
      { label: 'Transformers / LLMs', proficiency: 92 },
      { label: 'Diffusion Models',    proficiency: 85 },
      { label: 'MLOps / Kubeflow',    proficiency: 80 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { label: 'React / Next.js',     proficiency: 96 },
      { label: 'TypeScript',          proficiency: 94 },
      { label: 'Tailwind CSS',        proficiency: 92 },
      { label: 'Three.js / WebGL',    proficiency: 76 },
    ],
  },
  {
    category: 'Backend & Infra',
    items: [
      { label: 'Python / FastAPI',    proficiency: 90 },
      { label: 'PostgreSQL / Redis',  proficiency: 85 },
      { label: 'Docker / K8s',        proficiency: 82 },
      { label: 'AWS / GCP',          proficiency: 78 },
    ],
  },
  {
    category: 'Design Systems',
    items: [
      { label: 'Figma / Tokens',      proficiency: 88 },
      { label: 'Motion Design',       proficiency: 82 },
      { label: 'Glassmorphism UI',    proficiency: 90 },
      { label: 'Accessibility',       proficiency: 84 },
    ],
  },
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function ProficiencyBar({ value }: { value: number }) {
  return (
    <div
      className="progress-lotus mt-1.5"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Proficiency: ${value}%`}
    >
      <div
        className="progress-lotus-bar"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

interface SkillCategoryProps {
  category: string;
  items: ReadonlyArray<{ label: string; proficiency: number }>;
}

function SkillCategory({ category, items }: SkillCategoryProps) {
  return (
    <div
      className={cn(
        'relative p-6 rounded-[var(--radius-xl)]',
        'bg-[var(--color-surface-container-low)]',
        'border border-[var(--color-deep-moss)]',
        'transition-shadow duration-[220ms] ease-[var(--ease-out-expo)]',
        'hover:shadow-[var(--shadow-glow-sm)]'
      )}
    >
      <h3
        className="type-label-caps text-[var(--color-on-surface-variant)] mb-5"
      >
        {category}
      </h3>

      <ul className="space-y-4" role="list">
        {items.map(({ label, proficiency }) => (
          <li key={label}>
            <div className="flex items-center justify-between mb-0.5">
              <span
                className="text-[var(--color-on-surface)] text-[13px] font-medium leading-none"
              >
                {label}
              </span>
              <span
                className="type-label-caps text-[var(--color-outline)] text-[10px]"
              >
                {proficiency}%
              </span>
            </div>
            <ProficiencyBar value={proficiency} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function SkillSection() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="type-label-caps text-[var(--color-neo-mint)] block mb-2">
            Expertise
          </span>
          <h2
            className="text-[var(--color-on-surface)] font-semibold"
            style={{
              fontSize: 'var(--type-h2-size)',
              lineHeight: 'var(--type-h2-lh)',
              letterSpacing: 'var(--type-h2-ls)',
            }}
          >
            Skills & Proficiencies
          </h2>
        </div>
        <a
          href="/about#skills"
          className="btn-ghost inline-flex items-center gap-2 text-[11px] px-4 py-2"
        >
          Full Resume
          <span className="text-base leading-none">→</span>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((group) => (
          <SkillCategory
            key={group.category}
            category={group.category}
            items={group.items}
          />
        ))}
      </div>

      {/* Tech chip row */}
      <div className="mt-10 flex flex-wrap gap-2">
        {[
          'PyTorch', 'LangChain', 'Next.js', 'FastAPI', 'PostgreSQL',
          'Docker', 'Kubernetes', 'Tailwind CSS', 'TypeScript', 'Figma',
        ].map((tag) => (
          <span key={tag} className="chip-lotus">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}