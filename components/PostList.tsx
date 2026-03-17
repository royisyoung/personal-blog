import { Post } from 'contentlayer/generated';
import PostListItem from './PostListItem';

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">No posts yet</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Blog posts will appear here once created. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </div>
  );
}
