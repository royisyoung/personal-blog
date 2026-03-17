import { Post, allPosts } from 'contentlayer/generated';

/**
 * Get all posts sorted by date in descending order (newest first)
 * @returns Sorted array of all posts
 */
export function getAllPosts(): Post[] {
  return allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single post by its slug
 * @param slug The post slug (directory name from content/posts/{slug})
 * @returns Post object if found, undefined otherwise
 */
export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}
