// src/components/sections/AgenticWorkflow.tsx
'use client';

import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';
import { ModelCard } from '@/components/3d/elements/ModelCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { AgentFramework } from '@/lib/data';

interface AgenticWorkflowProps {
  heading: string;
  subheading: string;
  description: string;
  items: AgentFramework[];
}

export default function AgenticWorkflow({ heading, subheading, description, items }: AgenticWorkflowProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 h-screen">
        <CanvasWrapper>
          <Scene ambientIntensity={0.4}>
            <CameraRig
              enableOrbit
              autoRotate
              autoRotateSpeed={0.8}
              cameraPosition={[0, 1, 8]}
              enableZoom={false}
              enablePan={false}
            />
            {items.map((item) => (
              <ModelCard
                key={item.framework}
                framework={item.framework}
                title={item.title}
                description={item.description}
                features={item.features}
                position={item.position}
                icon={<></>}
              />
            ))}
          </Scene>
        </CanvasWrapper>
      </div>

      <div className="container mx-auto px-6 py-32 text-center relative z-10">
        <ScrollReveal>
          <span className="inline-block px-4 py-2 glass-card text-xs font-mono tracking-wider text-primary-light mb-6">
            {subheading}
          </span>
          <h2 className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-6">
            {heading}
          </h2>
          <p className="text-body-lg text-on-background/70 max-w-2xl mx-auto">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}