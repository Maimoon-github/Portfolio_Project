import { Badge } from "@/components/ui/badge";
import { Skill } from "@/lib/api/portfolio";

interface SkillBadgeProps {
  skill: Skill;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {skill.icon && <span className="text-base">{skill.icon}</span>}
      <span>{skill.name}</span>
      <span className="text-xs text-muted-foreground ml-auto">{skill.proficiency}%</span>
    </Badge>
  );
}