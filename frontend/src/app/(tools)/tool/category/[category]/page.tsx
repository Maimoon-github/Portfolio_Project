import { redirect } from "next/navigation";

interface ToolAliasCategoryPageProps {
  params: {
    category: string;
  };
}

export default function ToolAliasCategoryPage({ params }: ToolAliasCategoryPageProps) {
  redirect(`/tools/category/${params.category}`);
}

