interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent?: boolean;
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative pl-8 border-l border-[rgba(84,68,52,0.15)] space-y-16">
      {experiences.map((exp, index) => (
        <div key={index} className="relative">
          {/* Timeline node */}
          <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <div className="w-2 h-2 bg-surface rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline gap-x-8 gap-y-2">
            <div className="w-40 shrink-0">
              <div className="label-md text-secondary">
                {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="headline-lg">{exp.role}</h4>
              <div className="text-primary mb-3">{exp.company}</div>
              <p className="text-on-surface-variant">{exp.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}