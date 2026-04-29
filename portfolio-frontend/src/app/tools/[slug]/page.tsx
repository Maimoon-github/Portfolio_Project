// SSG shell + CSR logic
export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Tool: {params.slug}</h1>
    </div>
  );
}
