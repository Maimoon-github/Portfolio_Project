// src/app/tools/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchTool } from "@/lib/api/tools";
import { ToolShell } from "@/components/tools/ToolShell";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const tool = await fetchTool.detail(slug);
    return {
      title: `${tool.title} • Laboratory Utility`,
      description: tool.description || `Interactive utility: ${tool.title}`,
    };
  } catch {
    return { title: 'Tool Not Found' };
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  
  let tool;
  try {
    tool = await fetchTool.detail(slug);
  } catch {
    notFound();
  }

  if (!tool) notFound();

  return (
    <main className="min-h-screen pt-[120px] pb-24">
      <div className="container">
        <ToolShell 
          title={tool.title} 
          description={tool.description || ""} 
          slug={tool.slug}
        >
          <div className="py-24 text-center border border-dashed border-outline-variant/30 rounded-xl bg-surface-container-low">
             <span className="type-label-caps text-neo-mint block mb-4">Laboratory Interface</span>
             <h3 className="text-xl text-on-surface">Initializing {tool.title}...</h3>
             <p className="text-sm text-on-surface-variant mt-4">The neural weights for this utility are being loaded into memory.</p>
          </div>
        </ToolShell>
      </div>
    </main>
  );
}