import Container from '@/components/Container';
import PostList from '@/components/PostList';
import { getAllPosts } from '@/lib/content';

export default function Home() {
  const posts = getAllPosts();

  return (
    <Container className="pt-12">
      <div className="mb-10">
        <h1 className="text-[28px] font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Personal Tech Blog</h1>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          A minimalist technical blog about software development.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-[20px] font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Recent Posts</h2>
        <PostList posts={posts} />
      </div>
    </Container>
  );
}
