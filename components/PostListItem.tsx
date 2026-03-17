import Link from 'next/link';
import { Post } from 'contentlayer/generated';

type PostListItemProps = {
  post: Post;
};

export default function PostListItem({ post }: PostListItemProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <article className="mb-8">
      <h2 className="text-[20px] font-semibold mb-2">
        <Link
          href={`/posts/${post.slug}`}
          className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 space-x-2">
        <time dateTime={post.date}>{formattedDate}</time>
        <span>•</span>
        <span>{post.category}</span>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{post.description}</p>
    </article>
  );
}
