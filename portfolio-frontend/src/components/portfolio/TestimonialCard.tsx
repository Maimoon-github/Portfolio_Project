import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  avatar?: string;
}

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorCompany,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="glass rounded-3xl p-8 h-full flex flex-col">
      <div className="flex-1">
        <p className="text-2xl leading-relaxed italic text-on-surface-variant">
          “{quote}”
        </p>
      </div>
      <div className="flex items-center gap-4 mt-10 pt-8 border-t border-[rgba(84,68,52,0.15)]">
        {avatar && (
          <div className="w-12 h-12 rounded-2xl overflow-hidden">
            <Image
              src={avatar}
              alt={authorName}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        )}
        <div>
          <div className="font-medium text-on-surface">{authorName}</div>
          <div className="text-sm text-secondary">
            {authorRole}, {authorCompany}
          </div>
        </div>
      </div>
    </div>
  );
}