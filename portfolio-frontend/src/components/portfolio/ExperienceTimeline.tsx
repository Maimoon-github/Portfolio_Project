// src/components/portfolio/ExperienceTimeline.tsx
// Vertical timeline of work history entries (Server Component)
interface Experience {
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
  isCurrent?: boolean
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l border-[rgba(84,68,52,0.15)] pl-8 space-y-12">
      {experiences.map((exp, index) => (
        <div key={index} className="relative">
          {/* Timeline dot */}
          <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#ffc68b]" />
          
          <div className="flex flex-col md:flex-row md:items-baseline gap-4">
            <div className="w-40">
              <div className="text-sm font-medium text-muted-foreground">
                {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-xl">{exp.role}</h4>
              <p className="text-[#ffc68b] text-sm mb-3">{exp.company}</p>
              <p className="text-muted-foreground">{exp.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}