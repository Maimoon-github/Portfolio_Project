import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectListItem } from "@/lib/api/portfolio";

interface ProjectCardProps {
  project: ProjectListItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
            <span className="text-zinc-400 text-sm">No image</span>
          </div>
        )}
      </div>
      <CardContent className="flex-1 p-6">
        <h3 className="font-semibold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-600 text-sm line-clamp-3 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex gap-4 text-xs">
        {project.demo_url && (
          <Link
            href={project.demo_url}
            target="_blank"
            className="text-primary hover:underline flex items-center gap-1"
          >
            Live Demo →
          </Link>
        )}
        {project.github_url && (
          <Link
            href={project.github_url}
            target="_blank"
            className="text-primary hover:underline flex items-center gap-1"
          >
            GitHub →
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
