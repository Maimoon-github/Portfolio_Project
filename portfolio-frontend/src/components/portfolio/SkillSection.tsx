import type { Skill } from "@/types/api";
import { SkillBadge } from "./SkillBadge";

interface SkillSectionProps {
  categories: Array<{
    name: string;
    skills: Skill[];
  }>;
}

export function SkillSection({ categories }: SkillSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {categories.map((category) => (
        <div key={category.name} className="tonal-shift rounded-3xl p-8">
          <h3 className="label-md text-secondary mb-6">{category.name}</h3>
          <div className="space-y-6">
            {category.skills.map((skill) => (
              <SkillBadge
                key={skill.name}
                name={skill.name}
                proficiency={skill.proficiency}
                iconName={skill.iconName} // optional in Skill type
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}