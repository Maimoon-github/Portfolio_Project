// src/app/tools/[slug]/page.tsx
interface Props {
  params: { slug: string }
}

export default function ToolPage({ params }: Props) {
  return <div>Tool: {params.slug}</div>
}