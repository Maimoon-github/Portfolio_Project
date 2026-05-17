'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { PROFILE } from '@/app/data';
import { TypingText } from '@/app/components/shared/TypingText';
import { TerminalPanel } from '@/app/components/shared/TerminalPanel';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-accent opacity-40 animate-ping" />
                <span className="relative block w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="text-[0.7rem] font-mono tracking-wide text-accent">Available for new projects — Q2 2025</span>
            </div>
          </div>

          <h1 className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight text-on-background max-w-[560px]">
            {PROFILE.name}<br />
            <TypingText texts={['AI Agent Architect', 'MLOps Engineer', 'Data Scientist', 'Agentic Workflow Designer']} />
          </h1>

          <p className="text-[clamp(0.93rem,1.35vw,1.05rem)] leading-relaxed text-outline max-w-[470px] mt-6 mb-10">
            {PROFILE.tagline} Specializing in multi-agent systems, production MLOps pipelines, and end-to-end AI workflow automation — from research to scale.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/projects" className="glass-btn bg-accent text-on-accent font-bold inline-flex items-center gap-2 px-6 py-3 rounded-lg">
              View Projects <ArrowRight size={16} />
            </Link>
            <Link href="/blog" className="glass-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg text-accent border border-glass-border hover:bg-accent/10">
              Read the Blog
            </Link>
          </div>

          <div className="w-9 h-px bg-accent/25 mb-6" />

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-outline">Find me on</span>
            {[
              { href: PROFILE.github, icon: Github, label: 'GitHub' },
              { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: PROFILE.twitter, icon: Twitter, label: 'Twitter' },
            ].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-accent transition-all hover:-translate-y-0.5">
                <social.icon size={16} />
              </a>
            ))}
          </div>

          <div className="flex gap-7 items-center mt-12 pt-8 border-t border-accent/10">
            {[
              { value: '15+', label: 'AI Systems' },
              { value: '40+', label: 'Models Deployed' },
              { value: '5+', label: 'Years Production AI' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[clamp(1.3rem,2vw,1.6rem)] font-bold text-accent leading-none">{stat.value}</span>
                <span className="text-[0.67rem] font-mono text-outline">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-accent/25 rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-7 -left-4 w-16 h-16 border-b border-l border-accent/25 rounded-bl-lg pointer-events-none" />
          <TerminalPanel />
          <div className="flex justify-end gap-2 mt-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-[0.6rem] font-mono text-outline">Production Ready</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
              <span className="w-1.5 h-1.5 rounded-full bg-outline" />
              <span className="text-[0.6rem] font-mono text-outline">Open to Collab</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-xs font-mono tracking-[0.1em] text-outline">scroll</span>
        <ChevronDown size={14} className="text-outline animate-bounce" />
      </div>
    </section>
  );
}