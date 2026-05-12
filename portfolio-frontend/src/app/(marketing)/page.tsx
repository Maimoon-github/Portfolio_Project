// src/app/page.tsx — lazy‑load below‑the‑fold sections
import { Hero } from '@/components/sections/Hero';
import dynamic from 'next/dynamic';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const About = dynamic(() => import('@/components/sections/About').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Skills = dynamic(() => import('@/components/sections/Skills').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const AgenticWorkflow = dynamic(() => import('@/components/sections/AgenticWorkflow').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Projects = dynamic(() => import('@/components/sections/Projects').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});
const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => mod.default), {
  loading: () => <SectionSkeleton />,
});


export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <AgenticWorkflow />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}




// inside a page (e.g., src/app/(marketing)/page.tsx or AgenticWorkflow section)
import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';

export default function AgenticWorkflowSection() {
  return (
    <section className="h-screen w-full relative">
      <CanvasWrapper>
        <Scene>
          <CameraRig enableOrbit autoRotate autoRotateSpeed={0.8} />
          <ModelCard
            framework="langgraph"
            title="LangGraph"
            description="Durable, stateful orchestration framework for long-running agents."
            features={['StateGraph abstraction', 'Human‑in‑the‑loop', 'Persistent memory']}
            icon={<></>}
            position={[-2.5, 0, 0]}
          />
          <ModelCard
            framework="autogen"
            title="AutoGen"
            description="Multi‑agent conversation framework with dynamic task graphs."
            features={['Modular agent design', 'Interruptible flows', 'Event‑driven']}
            icon={<></>}
            position={[0, 0, 0]}
          />
          <ModelCard
            framework="crewai"
            title="CrewAI"
            description="Role‑based multi‑agent collaboration platform."
            features={['Task decomposition', 'Execution pipelines', 'Observability']}
            icon={<></>}
            position={[2.5, 0, 0]}
          />
        </Scene>
      </CanvasWrapper>
    </section>
  );
}