// src/components/sections/AgenticWorkflow.tsx
'use client';

import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';
import { ModelCard } from '@/components/3d/elements/ModelCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function AgenticWorkflow() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background 3D scene - full viewport */}
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
            {/* Left card - LangGraph: Durable State + HITL + Memory */}
            <ModelCard
              framework="langgraph"
              title="LangGraph"
              description="Low-level orchestration framework for building long-running, stateful agents."
              features={[
                'Durable execution — survives failures',
                'Human-in-the-loop with state inspection',
                'Short-term + long-term memory',
                'Production-ready deployment platform'
              ]}
              position={[-2.8, 0, 0]}
            />

            {/* Center card - AutoGen: Multi-party Conversational */}
            <ModelCard
              framework="autogen"
              title="AutoGen"
              description="Multi-agent conversational framework with event‑driven architecture."
              features={[
                'Group chat — multi-party conversations',
                'Asynchronous event‑driven core',
                'Visual prototyping (AutoGen Studio)',
                'Two-agent setups cover 60% of production'
              ]}
              position={[0, 0, 0]}
            />

            {/* Right card - CrewAI: Role‑playing Teams */}
            <ModelCard
              framework="crewai"
              title="CrewAI"
              description="Lean, standalone framework for role‑playing autonomous agent teams."
              features={[
                'Built from scratch — independent framework',
                'Tracing & metrics → real‑time observability',
                'Used by nearly half of Fortune 500',
                'Event‑driven orchestration (Crews + Flows)'
              ]}
              position={[2.8, 0, 0]}
            />
          </Scene>
        </CanvasWrapper>
      </div>

      {/* Foreground content overlay with glassmorphism */}
      <div className="container mx-auto px-6 py-32 text-center relative z-10">
        <ScrollReveal>
          <span className="inline-block px-4 py-2 glass-card text-xs font-mono tracking-wider text-primary-light mb-6">
            CORE EXPERTISE
          </span>
          <h2 className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-6">
            Multi-Agent<br />Orchestration
          </h2>
          <p className="text-body-lg text-on-background/70 max-w-2xl mx-auto">
            Specialized in building production-grade agentic systems across the three leading frameworks.
            Each represents a distinct approach to multi-agent collaboration — from stateful graphs to
            conversational teams and role‑based orchestration.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}