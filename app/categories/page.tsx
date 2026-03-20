import { getAllPosts, getAllCategories } from '@/lib/content';
import Container from '@/components/Container';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories - MyClaudes',
  description: 'Browse all categories on this blog',
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const posts = getAllPosts();

  // Calculate post count per category
  const categoryCounts = categories.map((category) => {
    const count = posts.filter((post) => post.category === category).length;
    return { name: category, count };
  });

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-semibold mb-8">Categories</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryCounts.map(({ name, count }) => (
            <Link
              key={name}
              href={`/categories/${name}`}
              className="group p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-xl font-medium mb-2 group-hover:text-accent-foreground">{name}</h2>
              <p className="text-muted-foreground text-sm">
                {count} {count === 1 ? 'post' : 'posts'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export function generateStaticParams() {
  return [{}];
}
