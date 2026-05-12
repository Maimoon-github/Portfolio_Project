// src/components/sections/About.tsx
'use client';

interface AboutProps {
  heading: string;
  content: string;
}

export default function About({ heading, content }: AboutProps) {
  return (
    <section id="about" className="py-section-gap px-gutter max-w-7xl mx-auto">
      <h2 className="text-h2 font-semibold mb-8">{heading}</h2>
      <p className="text-body-lg text-[var(--color-on-background)]/70">
        {content}
      </p>
    </section>
  );
}