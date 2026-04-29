export const revalidate = 600; // ISR: 600

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  );
}
