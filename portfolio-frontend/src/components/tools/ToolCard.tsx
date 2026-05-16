import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface ToolCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export function ToolCard({ slug, title, description, category, icon }: ToolCardProps) {
  return (
    <Link href={`/tools/${slug}`} className="group block">
      <Card className="card h-full transition-all hover:-translate-y-1">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Icon with amber glow */}
          <div className="text-5xl mb-6 text-primary drop-shadow-sm">{icon}</div>
          
          {/* Category chip */}
          <span className="chip w-fit mb-4 text-xs">{category}</span>
          
          <h3 className="headline-lg group-hover:text-primary transition-colors mb-3">
            {title}
          </h3>
          
          <p className="text-on-surface-variant text-sm flex-1 line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}