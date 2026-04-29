"use client"

import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  onFilter?: (category: string | null) => void;
}

export function CategoryFilter({ categories, onFilter }: CategoryFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (category: string | null) => {
    setActive(category);
    onFilter?.(category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleClick(null)}
        className={`chip transition-all ${
          active === null ? "bg-primary text-on-primary-fixed" : ""
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`chip transition-all ${
            active === category ? "bg-primary text-on-primary-fixed" : ""
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}