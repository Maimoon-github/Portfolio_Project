// src/app/portfolio/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchProject } from "@/lib/api/portfolio";
import { RichTextRenderer } from "@/components/blog/RichTextRenderer";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await fetchProject.detail(slug);
    return {
      title: `${project.title} • Project Archive`,
      description: project.description || `Case study: ${project.title}`,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.thumbnail ? [{ url: project.thumbnail }] : [],
      }
    };
  } catch {
    return { title: 'Project Not Found' };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  
  let project;
  try {
    project = await fetchProject.detail(slug);
  } catch {
    notFound();
  }

  if (!project) notFound();

  return (
    <main className="min-h-screen pt-[120px] pb-24">
      <div className="container">
        <header className="mb-20 animate-reveal">
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech_tags?.map((tag: string) => (
              <span key={tag} className="chip-lotus">{tag}</span>
            ))}
          </div>
          <h1 className="text-[var(--type-h1-size)] font-bold text-on-surface mb-8">
            {project.title}
          </h1>
          <p className="text-[var(--type-body-lg-size)] text-on-surface-variant max-w-[70ch] leading-relaxed">
            {project.description}
          </p>
        </header>

        {project.thumbnail && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-24 border border-outline-variant/30">
            <Image 
              src={project.thumbnail} 
              alt={project.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-3">
              <RichTextRenderer html={project.content || ""} />
            </div>
            <aside className="md:col-span-1 space-y-12">
              <div>
                <h4 className="type-label-caps text-primary mb-4">Role</h4>
                <p className="text-sm text-on-surface-variant">{project.role || "Lead Architect"}</p>
              </div>
              <div>
                <h4 className="type-label-caps text-primary mb-4">Timeline</h4>
                <p className="text-sm text-on-surface-variant">{project.timeline || "2024"}</p>
              </div>
              {project.live_url && (
                <div>
                  <h4 className="type-label-caps text-primary mb-4">Live Deployment</h4>
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full py-2">
                    View Project
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}