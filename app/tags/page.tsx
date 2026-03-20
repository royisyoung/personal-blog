import { getAllPosts, getAllTags } from '@/lib/content';
import Container from '@/components/Container';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags - MyClaudes',
  description: 'Browse all tags on this blog',
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();

  // Calculate post count per tag
  const tagCounts = tags.map((tag) => {
    const count = posts.filter((post) => post.tags.includes(tag)).length;
    return { name: tag, count };
  });

  // Sort tags by post count descending
  tagCounts.sort((a, b) => b.count - a.count);

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-semibold mb-8">Tags</h1>
        <div className="flex flex-wrap gap-3">
          {tagCounts.map(({ name, count }) => (
            <Link
              key={name}
              href={`/tags/${name}`}
              className="group px-4 py-2 rounded-full border border-border bg-card hover:bg-accent transition-colors"
            >
              <span className="font-medium group-hover:text-accent-foreground">{name}</span>
              <span className="ml-2 text-sm text-muted-foreground">({count})</span>
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
