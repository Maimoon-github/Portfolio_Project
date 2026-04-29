import { notFound } from "next/navigation"

interface Props { params: { slug: string } }

export default function ToolPage({ params }: Props) {
  return <div>Tool: {params.slug}</div>
}