export const revalidate = 300; // ISR: 300

export default function BlogTagPage({ params }: { params: { tag: string } }) {
  return (
    <div>
      <h1>Tag: {params.tag}</h1>
    </div>
  );
}
