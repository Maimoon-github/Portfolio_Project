export const revalidate = 300; // ISR: 300

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
    </div>
  );
}
