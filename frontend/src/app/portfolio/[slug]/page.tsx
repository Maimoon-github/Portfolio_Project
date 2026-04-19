import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/utils/seo";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import { buttonVariants } from "@/components/ui/button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { cn } from "@/lib/utils/cn";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return { title: "Project not found" };
  }

  return generatePageMetadata({
    title: `${project.title} | Case Study`,
    description: project.highlight,
    slug: `portfolio/${project.slug}`,
  });
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return notFound();
  }

  return (
    <div className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="primary" size={500} opacity={6} className="-top-40 -right-40" />
      <GlowOrb color="secondary" size={600} opacity={5} className="top-1/3 -left-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-6xl space-y-16">
        <div className="pt-4 pb-8">
          <Link href="/portfolio" className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold hover:text-[color:var(--primary)] transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Back to Portfolio
          </Link>
        </div>

        {/* Header Section */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Chip>{project.category}</Chip>
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">
              Case study
            </span>
          </div>
          
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            {project.title}
          </h1>
          
          <p className="max-w-3xl text-lg md:text-xl leading-relaxed text-[color:var(--on_surface)]/80">
            {project.description}
          </p>
          
          {/* Metadata Grid */}
          <div className="grid gap-6 sm:grid-cols-3 pt-8">
            <Card surface="low" className="p-8">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-3">Role</p>
              <p className="font-medium text-[color:var(--on_surface)]">{project.role}</p>
            </Card>
            <Card surface="low" className="p-8">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-3">Stack</p>
              <div className="space-y-2">
                {project.stack.map((item) => (
                  <p key={item} className="text-[color:var(--on_surface)]/90 text-sm">{item}</p>
                ))}
              </div>
            </Card>
            <Card surface="low" className="p-8">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-3">Outcomes</p>
              <p className="text-[color:var(--on_surface)]/90 text-sm leading-relaxed">{project.outcome}</p>
            </Card>
          </div>
        </section>

        {/* Content Section */}
        <section className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-16">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)] mb-6">The Challenge</h2>
              <p className="text-lg leading-relaxed text-[color:var(--on_surface)]/70">
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)] mb-6">Design Approach</h2>
              <p className="text-lg leading-relaxed text-[color:var(--on_surface)]/70">
                {project.highlight}
              </p>
            </div>
            
            {/* Visual Placeholder for Project Imagery */}
            <Card surface="variant" className="w-full aspect-[16/9] mt-12 overflow-hidden group border border-[color:var(--outline)]/10">
               <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--surface_container_highest)] via-[color:var(--surface_container)] to-[color:var(--surface_container_low)]" />
               <div className="absolute inset-0 bg-[color:var(--primary)]/5 mix-blend-overlay group-hover:bg-[color:var(--primary)]/10 transition-colors duration-500" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-[color:var(--secondary)] font-mono text-sm tracking-widest opacity-40">ASSET_PENDING</p>
               </div>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <Card surface="variant" className="p-8 sticky top-32 border border-[color:var(--outline)]/10">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-6">Execution Links</p>
              <div className="space-y-4">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full justify-center group")}
                >
                  <span className="relative z-10 transition-transform group-hover:-translate-y-0.5">Live Prototype</span>
                </a>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full justify-center group")}
                >
                  <span className="transition-transform group-hover:-translate-y-0.5">Code & Context</span>
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-[color:var(--outline)]/20">
                <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-4">Architecture Tags</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </div>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  );
}
