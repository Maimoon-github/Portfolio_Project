// src/components/portfolio/SkillBadge.tsx
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  proficiency: number // 1-5
  iconName?: string
  className?: string
}

export function SkillBadge({ name, proficiency, iconName, className }: SkillBadgeProps) {
  const percentage = (proficiency / 5) * 100

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Badge variant="outline" className="px-4 py-2 font-medium text-sm flex-1 justify-start">
        {iconName && <span className="mr-2 text-[#ffc68b]">{iconName}</span>}
        {name}
      </Badge>

      {/* Ring indicator */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#201f1f"
            strokeWidth="4"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ffc68b"
            strokeWidth="4"
            strokeDasharray={`${percentage}, 100`}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
          {proficiency}
        </div>
      </div>
    </div>
  )
}