import { Skill } from "@/lib/api/portfolio";
import SkillBadge from "./SkillBadge";

interface SkillSectionProps {
  skills: Skill[];
}

export default function SkillSection({ skills }: SkillSectionProps) {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-semibold mb-8">Skills &amp; Technologies</h2>
      {Object.entries(grouped).map(([category, categorySkills]) => (
        <div key={category} className="mb-10">
          <h3 className="uppercase text-xs tracking-widest text-zinc-500 mb-4">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {categorySkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}