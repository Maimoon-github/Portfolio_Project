import { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { CanvasWrapper } from "@/components/3d/core/CanvasWrapper";
import { Scene } from "@/components/3d/core/Scene";
import { CameraRig } from "@/components/3d/core/CameraRig";
import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "Contact | Alex Kern | Data Scientist & AI Agent Architect",
  description:
    "Get in touch with Alex Kern for collaborations, speaking engagements, or to discuss AI agent architectures, MLOps, and data science projects.",
};

export default function ContactPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section with 3D Globe */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden rounded-2xl glass md:min-h-[50vh]">
        <div className="absolute inset-0 z-0 opacity-60">
          <CanvasWrapper>
            <Scene ambientIntensity={0.3}>
              <CameraRig
                enableOrbit={false}
                autoRotate
                autoRotateSpeed={0.4}
                cameraPosition={[0, 0, 4]}
                enableZoom={false}
                enablePan={false}
              />
              <mesh>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                  color="#5f2da6"
                  emissive="#2dd4bf"
                  emissiveIntensity={0.3}
                  wireframe
                />
              </mesh>
            </Scene>
          </CanvasWrapper>
        </div>
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <span className="glass-card inline-block px-4 py-2 text-xs font-mono tracking-wider text-primary-light">
            LET'S CONNECT
          </span>
          <h1 className="mt-4 text-h1 font-bold md:text-5xl lg:text-6xl">
            Start a{" "}
            <span className="bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="mt-4 text-body-lg text-on-background/70">
            Have a project in mind or just want to chat about AI agents, MLOps,
            or data science? I'm always open to new opportunities and ideas.
          </p>
        </div>
      </section>

      {/* Contact Form & Information Section */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-h3 font-semibold text-primary-light">
              Direct Reach
            </h3>
            <div className="mt-4 space-y-4">
              <a
                href="mailto:hello@alexkern.dev"
                className="flex items-center gap-3 text-on-background/70 transition-colors hover:text-primary-light"
              >
                📧 hello@alexkern.dev
              </a>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://github.com/alexkern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-sm transition-colors hover:bg-primary/20 hover:text-primary-light"
                >
                  <span>GitHub</span>
                  <span className="text-xs text-accent">/alexkern</span>
                </a>
                <a
                  href="https://linkedin.com/in/alexkern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-sm transition-colors hover:bg-primary/20 hover:text-primary-light"
                >
                  <span>LinkedIn</span>
                  <span className="text-xs text-accent">/in/alexkern</span>
                </a>
                <a
                  href="https://x.com/alexkern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-sm transition-colors hover:bg-primary/20 hover:text-primary-light"
                >
                  <span>X (Twitter)</span>
                  <span className="text-xs text-accent">@alexkern</span>
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-h3 font-semibold text-primary-light">
              Availability
            </h3>
            <div className="mt-4 space-y-3 text-on-background/70">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span>Open for freelance collaborations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span>Speaking engagements & workshops</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span>Technical advisory roles</span>
              </div>
            </div>
            <div className="mt-4 text-sm italic text-on-background/50">
              Average response time: <strong>24 hours</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}