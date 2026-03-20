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

/**
 * Get all unique categories from all posts
 * @returns Array of unique category names sorted alphabetically
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  allPosts.forEach((post) => {
    categories.add(post.category);
  });
  return Array.from(categories).sort();
}

/**
 * Get all unique tags from all posts
 * @returns Array of unique tag names sorted alphabetically
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return Array.from(tags).sort();
}
