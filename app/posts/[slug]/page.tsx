import { getAllPosts, getPostBySlug } from '@/lib/content';
import Container from '@/components/Container';
import { TableOfContents } from '@/components/TableOfContents';
import { format } from 'date-fns';
import { PostContent } from './PostContent';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { BackToTopButton } from '@/components/BackToTopButton';
import { CopyButtonHydrator } from '@/components/CopyButton';
import { RelatedPosts } from '@/components/RelatedPosts';
import type { Metadata } from 'next';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: { params: PostPageProps['params'] }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found - MyClaudes',
      description: 'The post you are looking for does not exist.',
    };
  }

  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${siteUrl}/posts/${post.slug}/`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Generate static params for all posts at build time
 * Must be exported from a server component
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Individual post page with full MDX content rendering
 * Server component that exports generateStaticParams and renders client component
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <PostContent code={post.body.code} />
        </div>

        <RelatedPosts currentPost={post} />

        <ReadingProgressBar />
        <BackToTopButton />
        <CopyButtonHydrator />
      </article>
    </Container>
  );
}
