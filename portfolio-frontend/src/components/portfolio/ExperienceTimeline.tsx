import { Experience } from "@/lib/api/portfolio";
import { Card, CardContent } from "@/components/ui/card";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <Card key={exp.id} className="border-l-4 border-l-primary pl-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-xl">{exp.position}</h3>
                  <a
                    href={exp.company_url || "#"}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {exp.company}
                  </a>
                  {exp.location && <p className="text-sm text-zinc-500">{exp.location}</p>}
                </div>
                <div className="text-sm text-right whitespace-nowrap">
                  <p>{exp.start_date} — {exp.current ? "Present" : exp.end_date}</p>
                </div>
              </div>
              <p className="mt-4 text-zinc-600">{exp.description}</p>
              {exp.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.tech_stack.map((tech) => (
                    <span key={tech} className="text-xs bg-zinc-100 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}