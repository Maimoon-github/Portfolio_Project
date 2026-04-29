// src/components/portfolio/SkillSection.tsx
import type { Skill } from "@/types/api"

interface SkillSectionProps {
  categories: Array<{
    name: string
    skills: Skill[]
  }>
}

export function SkillSection({ categories }: SkillSectionProps) {
  return <div>Skills Section</div>
}