// src/app/projects/[slug]/ProjectDetailClient.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { ArrowLeft, ExternalLink, Code, Calendar, Users, Building2 } from 'lucide-react';
import type { Project } from '@/types/project';
import { projectsData } from '@/lib/data';

export function ProjectDetailClient({ project }: { project: Project }) {
  const categoryLabel = projectsData.categoryLabels[project.category] || project.category;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-on-background/60 hover:text-primary-light transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <ScrollReveal>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-mono">
              {categoryLabel}
            </span>
            {project.status === 'completed' && (
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-mono">
                Production
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-lg text-on-background/70 max-w-3xl">
            {project.fullDescription || project.shortDescription}
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-6 pt-4 border-t border-outline-variant/20">
            {project.client && (
              <div className="flex items-center gap-2 text-sm text-on-background/60">
                <Building2 className="w-4 h-4" />
                <span>{project.client}</span>
              </div>
            )}
            {project.industry && (
              <div className="flex items-center gap-2 text-sm text-on-background/60">
                <Users className="w-4 h-4" />
                <span>{project.industry}</span>
              </div>
            )}
            {project.timeline && (
              <div className="flex items-center gap-2 text-sm text-on-background/60">
                <Calendar className="w-4 h-4" />
                <span>{project.timeline}</span>
              </div>
            )}
            {project.role && (
              <div className="text-sm text-on-background/60">Role: {project.role}</div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Problem & Solution (2‑col) */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-primary-light mb-2">The Challenge</h2>
            <p className="text-on-background/70">{project.problemStatement || 'Not specified.'}</p>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-primary-light mb-2">The Solution</h2>
            <p className="text-on-background/70">{project.solution || project.fullDescription || project.shortDescription}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Architecture Highlights (if exists) */}
      {project.architectureHighlights && project.architectureHighlights.length > 0 && (
        <ScrollReveal>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Architecture Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.architectureHighlights.map((item, idx) => (
                <div key={idx} className="glass-card p-4">
                  <h3 className="text-lg font-semibold text-primary-light mb-1">{item.title}</h3>
                  <p className="text-sm text-on-background/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Technology Stack */}
      <ScrollReveal>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies.map(tech => (
              <span key={tech.name} className="px-4 py-2 glass rounded-full text-sm font-mono">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Key Features (staggered list) */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <ScrollReveal>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Key Features</h2>
            <StaggerList stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, idx) => (
                <div key={idx} className="glass-card p-4 flex items-start gap-3">
                  <span className="text-accent text-lg select-none">▹</span>
                  <span className="text-sm text-on-background/80">{feature}</span>
                </div>
              ))}
            </StaggerList>
          </div>
        </ScrollReveal>
      )}

      {/* Implementation Roadmap */}
      {project.implementationPhases && project.implementationPhases.length > 0 && (
        <ScrollReveal>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Implementation Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.implementationPhases.map((phase, idx) => (
                <div key={idx} className="glass-card p-5 relative">
                  <div className="absolute -top-3 left-4 px-2 py-0.5 bg-primary/20 text-primary-light text-[10px] font-mono rounded-full">
                    {phase.phase}
                  </div>
                  <h3 className="text-lg font-semibold text-primary-light mt-2 mb-1">
                    <Code className="w-5 h-5 group-hover:text-primary-light transition-colors" />{phase.title}
                  </h3>
                  {phase.duration && <p className="text-xs text-on-background/50 mb-2">{phase.duration}</p>}
                  <p className="text-sm text-on-background/70">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Metrics Dashboard */}
      {project.metrics && project.metrics.length > 0 && (
        <ScrollReveal>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Key Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{metric.value}</div>
                  <div className="text-xs text-on-background/60">{metric.label}</div>
                  {metric.trend && (
                    <div className={`text-[10px] mt-1 ${metric.trend === 'up' ? 'text-accent' : 'text-error'}`}>
                      {metric.trend === 'up' ? '↑' : '↓'} Trend
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <ScrollReveal>
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Outcomes & Impact</h2>
            <ul className="space-y-2">
              {project.results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent text-lg select-none">✦</span>
                  <span className="text-on-background/80">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      )}

      {/* Project Links */}
      {project.links && project.links.length > 0 && (
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {project.links.map(link => (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg hover:shadow-[0_0_12px_var(--color-primary)] transition-all"
              >
                {link.type === 'github' ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {link.label || (link.type === 'github' ? 'Source' : 'Live Demo')}
              </a>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* CTA */}
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-2xl glass p-8 text-center">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-3">Interested in a similar solution?</h2>
            <p className="text-on-background/70 max-w-xl mx-auto mb-6">
              Let’s discuss how we can bring this expertise to your AI initiatives.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-accent px-6 py-2 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </motion.div>
  );
}