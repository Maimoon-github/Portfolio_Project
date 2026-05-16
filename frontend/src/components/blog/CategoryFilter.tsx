'use client';

import { useRouter, usePathname } from 'next/navigation';

const CATEGORIES = ['All', 'AI/ML', 'MLOps', 'Tutorials', 'Career'];

interface CategoryFilterProps {
  activeCategory: string;
}

export function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
            activeCategory === cat
              ? 'bg-[var(--color-accent)] text-[var(--color-on-accent)] font-semibold'
              : 'bg-[var(--color-surface-container-low)] text-[var(--color-outline)] border border-[var(--color-glass-border)] hover:border-[var(--color-glass-border-hover)] hover:text-[var(--color-accent)]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}