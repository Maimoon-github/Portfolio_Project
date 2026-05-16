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
              ? 'bg-[#A4FBCC] text-[#0A2E1A] font-semibold shadow-[0_0_12px_rgba(164,251,204,0.3)]'
              : 'bg-[rgba(164,251,204,0.06)] text-[#B0C4B0] border border-[rgba(164,251,204,0.15)] hover:border-[rgba(164,251,204,0.35)] hover:text-[#A4FBCC]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}