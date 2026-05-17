'use client';

import { SERVICES } from '@/app/data';
import { Brain, GitBranch, BarChart2, Server } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={20} className="text-accent" />,
  GitBranch: <GitBranch size={20} className="text-accent" />,
  BarChart2: <BarChart2 size={20} className="text-accent" />,
  Server: <Server size={20} className="text-accent" />,
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="mb-12">
          <div className="eyebrow-label mb-2">Services</div>
          <h2 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-on-background">What I Do</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="glass-card group relative rounded-xl p-6 flex flex-col gap-4 overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center glass">
                {iconMap[service.icon] || <Brain size={20} className="text-accent" />}
              </div>
              <h3 className="text-[0.95rem] font-semibold text-on-background leading-tight">{service.title}</h3>
              <p className="text-sm leading-relaxed text-outline">{service.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}