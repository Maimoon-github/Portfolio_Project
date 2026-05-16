import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  proficiency?: number; // 1-5 (made optional to match API)
  iconName?: string;
  className?: string;
}

export function SkillBadge({ name, proficiency = 0, iconName, className }: SkillBadgeProps) {
  const percentage = (proficiency / 5) * 100;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="chip flex-1 flex items-center justify-between">
        {iconName && <span className="text-secondary mr-2">{iconName}</span>}
        <span className="font-medium">{name}</span>
      </div>

      {/* Proficiency ring */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#353534"
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
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-on-surface">
          {proficiency}
        </div>
      </div>
    </div>
  );
}