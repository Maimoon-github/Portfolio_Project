// src/components/portfolio/SkillSection.tsx
// Skills grouped by category with animated reveal
import { SkillBadge } from "./SkillBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Skill {
  name: string
  proficiency: number
  iconName?: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

interface SkillSectionProps {
  categories: SkillCategory[]
}

export function SkillSection({ categories }: SkillSectionProps) {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <Card key={category.name} className="bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-[#ffc68b]">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {category.skills.map((skill) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  proficiency={skill.proficiency}
                  iconName={skill.iconName}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}