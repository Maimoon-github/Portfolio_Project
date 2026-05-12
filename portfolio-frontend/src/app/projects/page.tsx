// src/app/projects/page.tsx
'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';
import { ParticleField } from '@/components/3d/elements/ParticleField';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { projectsData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, X, ExternalLink, Code } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface ProjectCardProps {
  title: string;
  shortDescription: string;
  tags: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

function ProjectCard({
  title,
  shortDescription,
  tags,
  category,
  demoUrl,
  githubUrl,
  featured,
}: ProjectCardProps) {
  const categoryLabel = projectsData.categoryLabels[category as keyof typeof projectsData.categoryLabels] || category;

  return (
    <motion.div
      variants={itemVariants}
      className="glass-card overflow-hidden group hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-500 h-full flex flex-col"
    >
      {/* Optional: Thumbnail placeholder — replace with actual image if needed */}
      <div className="relative h-40 overflow-hidden bg-surface-container">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-mono font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-h3 font-semibold text-primary-light mb-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-xs font-mono text-on-background/50 mb-2">{categoryLabel}</p>
        <p className="text-sm text-on-background/70 leading-relaxed mb-4">{shortDescription}</p>

        {/* Tag cloud */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] font-mono border border-outline-variant/40 rounded-sm text-on-background/50"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-[10px] font-mono text-outline">+{tags.length - 3}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          {demoUrl && demoUrl !== '#' && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-primary-light transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          {githubUrl && githubUrl !== '#' && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-on-background/60 hover:text-primary-light transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              Source
            </a>
          )}
          {(!demoUrl || demoUrl === '#') && (!githubUrl || githubUrl === '#') && (
            <span className="text-xs text-on-background/40">Case study available on request</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });

  // Extract unique categories from projects data
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projectsData.projects.forEach((p) => cats.add(p.category));
    return Array.from(cats);
  }, []);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    let results = projectsData.projects;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.shortDescription.toLowerCase().includes(query) ||
          (project.tags || []).some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (activeCategory) {
      results = results.filter((project) => project.category === activeCategory);
    }

    return results;
  }, [searchQuery, activeCategory]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveCategory(null);
  }, []);

  const showNoResults = filteredProjects.length === 0 && (searchQuery !== '' || activeCategory !== null);

  // Header animation variants
  const headerContentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-section-gap"
    >
      {/* Hero Section with 3D Background */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden rounded-2xl glass">
        <div className="absolute inset-0 z-0 opacity-40">
          <CanvasWrapper>
            <Scene ambientIntensity={0.3}>
              <CameraRig
                enableOrbit={false}
                autoRotate
                autoRotateSpeed={0.4}
                cameraPosition={[0, 1, 8]}
                enableZoom={false}
                enablePan={false}
              />
              <ParticleField />
            </Scene>
          </CanvasWrapper>
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 glass-card text-xs font-mono tracking-wider text-primary-light mb-6">
              PORTFOLIO ARCHIVE
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-4"
          >
            {projectsData.introTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-body-lg text-on-background/70 max-w-2xl mx-auto"
          >
            {projectsData.introDescription}
          </motion.p>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-6"
      >
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-background/40" />
          <input
            type="text"
            placeholder="Search projects by title, description, or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects"
            className="w-full glass bg-surface-container rounded-xl px-10 py-3 text-sm border border-outline-variant/20 focus:border-primary transition-all outline-none placeholder:text-on-background/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-background/40 hover:text-primary-light transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200',
              !activeCategory
                ? 'bg-primary text-on-primary shadow-[0_0_8px_var(--color-primary)]'
                : 'bg-surface-container-high text-on-background/70 hover:bg-primary/20 hover:text-primary-light'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200',
                activeCategory === cat
                  ? 'bg-primary text-on-primary shadow-[0_0_8px_var(--color-primary)]'
                  : 'bg-surface-container-high text-on-background/70 hover:bg-primary/20 hover:text-primary-light'
              )}
            >
              {projectsData.categoryLabels[cat as keyof typeof projectsData.categoryLabels] || cat}
            </button>
          ))}
          {(searchQuery || activeCategory) && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-full text-xs font-mono text-accent hover:text-primary-light transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </motion.div>

      {/* Project Grid */}
      <ScrollReveal>
        {showNoResults ? (
          <div className="glass-card p-12 text-center">
            <p className="text-body-lg text-on-background/60 mb-2">No projects match your criteria</p>
            <button
              onClick={clearFilters}
              className="text-accent hover:text-primary-light text-sm transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <StaggerList stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} tags={project.tags || []} />
            ))}
          </StaggerList>
        )}
      </ScrollReveal>

      {/* Call to Action */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-2xl glass p-10 text-center">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-10">
            <h2 className="text-h2 font-semibold mb-4">{projectsData.cta.heading}</h2>
            <p className="text-body-lg text-on-background/70 max-w-2xl mx-auto mb-8">
              {projectsData.cta.description}
            </p>
            <a
              href={projectsData.cta.href}
              className="inline-flex items-center rounded-lg bg-accent px-8 py-3 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
            >
              {projectsData.cta.buttonText}
            </a>
          </div>
        </section>
      </ScrollReveal>
    </motion.div>
  );
}