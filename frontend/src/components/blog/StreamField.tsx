/**
 * Renders Wagtail StreamField blocks to React components.
 * Add new block types here as you expand the CMS schema.
 */
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { StreamFieldBlock } from "@/lib/api/types";

interface StreamFieldProps {
  blocks: StreamFieldBlock[];
  className?: string;
}

export function StreamField({ blocks, className }: StreamFieldProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block) => (
        <StreamFieldBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function StreamFieldBlock({ block }: { block: StreamFieldBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="scroll-mt-20 text-2xl font-semibold tracking-tight">
          {block.value}
        </h2>
      );

    case "paragraph":
      return (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    case "image":
      return (
        <figure className="my-8">
          <Image
            src={block.value.url}
            alt={block.value.title}
            width={block.value.width}
            height={block.value.height}
            className="rounded-lg"
          />
        </figure>
      );

    case "code":
      return (
        <div className="overflow-hidden rounded-lg border">
          <div className="flex items-center justify-between bg-muted px-4 py-2">
            <span className="text-xs text-muted-foreground font-mono">
              {block.value.language}
            </span>
          </div>
          <pre className="overflow-x-auto p-4">
            <code className={`language-${block.value.language} font-mono text-sm`}>
              {block.value.code}
            </code>
          </pre>
        </div>
      );

    case "callout":
      const calloutStyles = {
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
        tip: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
      };
      return (
        <div
          className={cn(
            "rounded-lg border p-4 text-sm",
            calloutStyles[block.value.type]
          )}
          dangerouslySetInnerHTML={{ __html: block.value.text }}
        />
      );

    default:
      return null;
  }
}
