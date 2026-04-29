import { ReactNode } from "react";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/layout/JsonLd";

interface ToolShellProps {
  title: string;
  description: string;
  slug: string;
  schemaOrg?: Record<string, unknown>;
  children: ReactNode;
}

export function ToolShell({
  title,
  description,
  slug,
  schemaOrg,
  children,
}: ToolShellProps) {
  const shareUrl = `https://yourdomain.dev/tools/${slug}`;

  return (
    <div className="section max-w-4xl mx-auto px-6">
      {schemaOrg && <JsonLd schema={schemaOrg} />}

      <div className="flex items-start justify-between mb-12">
        <div className="max-w-2xl">
          <h1 className="display-lg tracking-tighter">{title}</h1>
          <p className="mt-4 text-xl text-on-surface-variant">{description}</p>
        </div>

        <Button variant="ghost" size="icon" asChild className="mt-2 text-on-surface hover:text-primary">
          <Link
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Share2 className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Glass container for calculator content */}
      <div className="glass rounded-3xl p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}