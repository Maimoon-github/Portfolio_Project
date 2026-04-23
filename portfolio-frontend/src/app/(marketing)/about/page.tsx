// src/app/(marketing)/about/page.tsx
// [SSG] About page: bio, skills, experience timeline, testimonials
import { SkillSection } from "@/components/portfolio/SkillSection"
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline"
import { TestimonialCard } from "@/components/portfolio/TestimonialCard"

export const dynamic = "force-static"

export default function AboutPage() {
  // Static content (API fetch optional in Phase 1)
  const skillCategories = [
    {
      name: "AI / ML",
      skills: [
        { name: "LLM Fine-tuning", proficiency: 5 },
        { name: "RAG Pipelines", proficiency: 4 },
      ],
    },
  ]

  const experiences = [
    {
      company: "Scale AI",
      role: "Senior AI Engineer",
      startDate: "2023",
      endDate: "Present",
      description: "Leading production LLM deployment and MLOps infrastructure.",
      isCurrent: true,
    },
  ]

  const testimonials = [
    {
      quote: "Alex transformed our RAG system from prototype to production-grade.",
      authorName: "Sarah Chen",
      authorRole: "CTO",
      authorCompany: "Vanguard Labs",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="prose prose-invert max-w-none mb-16">
        <h1 className="text-5xl font-medium tracking-[-0.03em]">About Alex Reeves</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Senior AI/ML Engineer with a passion for building systems that scale. I specialize in large language models, retrieval-augmented generation, and production MLOps.
        </p>
      </div>

      <SkillSection categories={skillCategories} />

      <div className="my-20">
        <h2 className="text-3xl font-medium mb-8">Experience</h2>
        <ExperienceTimeline experiences={experiences} />
      </div>

      <div>
        <h2 className="text-3xl font-medium mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </div>
  )
}