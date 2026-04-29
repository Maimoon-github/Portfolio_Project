export function CategoryFilter({ 
  categories = [], 
  currentCategory 
}: { 
  categories: { slug: string; name: string }[]; 
  currentCategory?: string;
}) {
  return <div>Category Filter</div>;
}