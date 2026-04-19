import { redirect } from "next/navigation";

interface ToolAliasSlugPageProps {
  params: {
    slug: string;
  };
}

export default function ToolAliasSlugPage({ params }: ToolAliasSlugPageProps) {
  redirect(`/tools/${params.slug}`);
}

