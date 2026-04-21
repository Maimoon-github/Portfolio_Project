"use client";

import { useEffect, useState } from "react";
import { PostDetail } from "@/lib/api/blog";

interface TableOfContentsProps {
  content: any;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Simple client-side TOC extraction from rendered content
    const extracted: { id: string; text: string; level: number }[] = [];
    const elements = document.querySelectorAll("h2, h3");
    elements.forEach((el) => {
      const id = el.id || `heading-${Math.random().toString(36).slice(2)}`;
      if (!el.id) el.id = id;
      extracted.push({
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });
    setHeadings(extracted);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-12 border-l-2 border-zinc-200 pl-6 text-sm">
      <h4 className="font-semibold text-zinc-500 mb-4">On this page</h4>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              className="text-zinc-600 hover:text-primary transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}