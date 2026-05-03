// src/app/tools/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { ToolCard } from '@/components/tools/ToolCard';
import { fetchTool } from '@/lib/api/tools';
import { Tool } from '@/types/api';

export const metadata: Metadata = {
  title: 'Tools • Intelligence Utility',
  description: 'A laboratory of autonomous utilities designed for high-end technologists.',
};

export default async function ToolsPage() {
  let tools: Tool[] = [];
  try {
    const response = await fetchTool.list();
    tools = response.results;
  } catch (error) {
    console.error('Failed to fetch tools:', error);
  }

  return (
    <main className="min-h-screen pt-[120px] pb-24">
      <div className="container">
        <header className="max-w-3xl mb-20 animate-reveal">
          <span className="type-label-caps text-neo-mint opacity-80 block mb-6">
            Intelligence Utility
          </span>
          <h1 className="text-[var(--type-h1-size)] font-bold text-on-surface mb-8">
            The Neural Lab
          </h1>
          <p className="text-[var(--type-body-lg-size)] text-on-surface-variant max-w-[60ch]">
            A collection of interactive utilities and prototypes. From LLM evaluators to 
            molecular visualizers, these tools are built for precision and discovery.
          </p>
        </header>

        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse bg-surface-container-low h-96 rounded-xl" />}>
          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <ToolCard 
                  key={tool.slug} 
                  slug={tool.slug}
                  title={tool.title}
                  description={tool.description || ""}
                  category={tool.category || "General"}
                  icon={tool.icon || "🛠️"}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-8 border border-outline-variant/30 bg-surface-container-low opacity-50">
                  <div className="h-8 w-8 bg-primary/20 rounded mb-6" />
                  <h3 className="text-xl font-medium text-on-surface mb-4">Laboratory Entry {i}</h3>
                  <p className="text-sm text-on-surface-variant mb-6">System initializing. Neural weights loading from cold storage.</p>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-neo-mint w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}