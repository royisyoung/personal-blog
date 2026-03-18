import type { Post } from 'contentlayer/generated';
import { getAllPosts } from '@/lib/content';
import { getRelatedPosts } from '@/lib/related-posts';
import Link from 'next/link';
import { format } from 'date-fns';

type RelatedPostsProps = {
  currentPost: Post;
};

/**
 * Related Posts component for the end of article
 * Displays 2-3 related posts sorted by shared tags (more shared = higher), then by date
 * Each card shows title, description excerpt, and date
 */
export function RelatedPosts({ currentPost }: RelatedPostsProps) {
  const allPosts = getAllPosts();
  const related = getRelatedPosts(currentPost, allPosts, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-semibold mb-6">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group p-4 border border-border rounded-lg hover:border-accent transition-colors duration-200"
          >
            <h3 className="font-medium mb-2 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
            {post.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.description}</p>}
            <time dateTime={post.date} className="text-xs text-muted-foreground">
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </time>
          </Link>
        ))}
      </div>
    </section>
  );
}
