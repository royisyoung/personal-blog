import { getAllPosts, getPostBySlug } from '@/lib/content';
import Container from '@/components/Container';
import { format } from 'date-fns';
import { MDXContent } from 'contentlayer/core';

type PostPageProps = {
  params: {
    slug: string;
  };
};

/**
 * Generate static params for all posts at build time
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Individual post page with full MDX content rendering
 */
export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <Container>
        <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
        <p className="text-muted-foreground">The post you&apos;re looking for does not exist.</p>
      </Container>
    );
  }

  return (
    <Container>
      <article className="py-8">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-[28px] font-semibold mb-3 leading-tight">{post.title}</h1>
          <div className="text-sm text-muted-foreground flex gap-2">
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
            <span>•</span>
            <span>{post.category}</span>
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <MDXContent code={post.body.code} />
        </div>
      </article>
    </Container>
  );
}
