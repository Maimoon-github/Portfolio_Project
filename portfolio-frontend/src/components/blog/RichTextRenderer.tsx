import { PostDetail } from "@/lib/api/blog";

interface RichTextRendererProps {
  content: any; // StreamField JSON from Wagtail
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="prose prose-zinc max-w-none">
      {content.map((block: any, index: number) => {
        if (block.type === "paragraph") {
          return (
            <div
              key={index}
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: block.value }}
            />
          );
        }
        if (block.type === "image") {
          return (
            <div key={index} className="my-10">
              <img
                src={block.value.url}
                alt={block.value.alt || ""}
                className="rounded-2xl w-full"
              />
              {block.value.caption && (
                <p className="text-center text-sm text-zinc-500 mt-3">
                  {block.value.caption}
                </p>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}