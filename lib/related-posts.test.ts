import { describe, test, expect } from 'vitest';
import { getRelatedPosts } from './related-posts';
import type { Post } from 'contentlayer/generated';

function createMockPost(slug: string, tags: string[], date: string): Post {
  return {
    slug,
    tags,
    date,
    title: `Post ${slug}`,
    body: { raw: '' },
  } as Post;
}

describe('getRelatedPosts', () => {
  test('excludes current post from results', () => {
    const currentPost = createMockPost('current', ['tag1'], '2024-01-01');
    const allPosts = [
      currentPost,
      createMockPost('post1', ['tag1'], '2024-01-02'),
      createMockPost('post2', ['tag2'], '2024-01-03'),
    ];

    const result = getRelatedPosts(currentPost, allPosts);
    expect(result.find((p) => p.slug === 'current')).toBeUndefined();
    expect(result.length).toBe(2);
  });

  test('current post with no tags returns most recent posts', () => {
    const currentPost = createMockPost('current', [], '2024-01-01');
    const allPosts = [
      createMockPost('oldest', ['tag1'], '2024-01-01'),
      createMockPost('middle', ['tag2'], '2024-01-02'),
      currentPost,
      createMockPost('newest', ['tag3'], '2024-01-03'),
    ];

    const result = getRelatedPosts(currentPost, allPosts, 2);
    expect(result.length).toBe(2);
    expect(result[0].slug).toBe('newest');
    expect(result[1].slug).toBe('middle');
  });

  test('sorts posts by number of shared tags descending', () => {
    const currentPost = createMockPost('current', ['react', 'typescript', 'nextjs'], '2024-01-01');
    const allPosts = [
      currentPost,
      createMockPost('one-tag', ['react'], '2024-01-02'),
      createMockPost('three-tags', ['react', 'typescript', 'nextjs'], '2024-01-02'),
      createMockPost('two-tags', ['react', 'typescript'], '2024-01-02'),
    ];

    const result = getRelatedPosts(currentPost, allPosts);
    expect(result.length).toBe(3);
    expect(result[0].slug).toBe('three-tags');
    expect(result[1].slug).toBe('two-tags');
    expect(result[2].slug).toBe('one-tag');
  });

  test('for equal shared tags, sorts by date descending', () => {
    const currentPost = createMockPost('current', ['react'], '2024-01-01');
    const allPosts = [
      currentPost,
      createMockPost('old', ['react'], '2024-01-01'),
      createMockPost('new', ['react'], '2024-01-03'),
      createMockPost('middle', ['react'], '2024-01-02'),
    ];

    const result = getRelatedPosts(currentPost, allPosts);
    expect(result[0].slug).toBe('new');
    expect(result[1].slug).toBe('middle');
    expect(result[2].slug).toBe('old');
  });

  test('returns exactly limit posts', () => {
    const currentPost = createMockPost('current', ['tag1'], '2024-01-01');
    const allPosts = [
      currentPost,
      ...Array.from({ length: 10 }, (_, i) => createMockPost(`post${i}`, ['tag1'], `2024-01-${i + 1}`)),
    ];

    const result = getRelatedPosts(currentPost, allPosts, 3);
    expect(result.length).toBe(3);

    const result5 = getRelatedPosts(currentPost, allPosts, 5);
    expect(result5.length).toBe(5);
  });

  test('pads with recent posts when fewer matches than limit', () => {
    const currentPost = createMockPost('current', ['unique-tag'], '2024-01-01');
    const allPosts = [
      currentPost,
      createMockPost('matched', ['unique-tag'], '2024-01-02'),
      createMockPost('recent1', ['other'], '2024-01-03'),
      createMockPost('recent2', ['other'], '2024-01-04'),
      createMockPost('recent3', ['other'], '2024-01-05'),
    ];

    // Need 3 posts, only 1 matched → pad with 2 most recent unmatched
    const result = getRelatedPosts(currentPost, allPosts, 3);
    expect(result.length).toBe(3);
    expect(result[0].slug).toBe('matched');
    expect(result[1].slug).toBe('recent3');
    expect(result[2].slug).toBe('recent2');
  });

  test('handles undefined tags on other posts gracefully', () => {
    const currentPost = createMockPost('current', ['tag1'], '2024-01-01');
    const postWithoutTags = createMockPost('notags', [], '2024-01-02');
    // @ts-expect-error - intentionally undefined for test
    delete postWithoutTags.tags;

    const allPosts = [currentPost, postWithoutTags];

    const result = getRelatedPosts(currentPost, allPosts, 1);
    expect(result.length).toBe(1);
    // Should be found with 0 shared tags, which is correct
    expect(result[0].slug).toBe('notags');
  });
});
