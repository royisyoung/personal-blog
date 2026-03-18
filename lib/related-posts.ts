import type { Post } from 'contentlayer/generated';

/**
 * Get related posts based on shared tags
 * If no tags, returns most recent posts
 * Posts sorted by number of shared tags (descending), then by date (descending)
 * @param currentPost Current post that we're finding related posts for
 * @param allPosts All posts in the blog
 * @param limit Maximum number of related posts to return (default: 3)
 * @returns Array of related posts
 */
export function getRelatedPosts(currentPost: Post, allPosts: Post[], limit: number = 3): Post[] {
  // Filter out current post
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);

  // If current post has no tags, return most recent posts
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return otherPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
  }

  // Calculate shared tag count for each post
  const postsWithScore = otherPosts.map((post) => {
    const sharedTags = post.tags?.filter((tag) => currentPost.tags.includes(tag)).length || 0;
    return {
      post,
      sharedTags,
      date: new Date(post.date).getTime(),
    };
  });

  // Sort by shared tags descending, then by date descending
  postsWithScore.sort((a, b) => {
    if (b.sharedTags !== a.sharedTags) {
      return b.sharedTags - a.sharedTags;
    }
    return b.date - a.date;
  });

  // Get top N posts
  let result = postsWithScore.map((item) => item.post).slice(0, limit);

  // If we don't have enough posts with shared tags, pad with most recent posts not already included
  if (result.length < limit) {
    const existingSlugs = new Set(result.map((p) => p.slug));
    const remainingPosts = otherPosts
      .filter((p) => !existingSlugs.has(p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    result = [...result, ...remainingPosts.slice(0, limit - result.length)];
  }

  return result;
}
