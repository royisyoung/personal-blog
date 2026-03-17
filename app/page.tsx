import { getAllPosts } from '@/lib/content';
import Container from '@/components/Container';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { calculatePagination, getPaginatedPosts, postsPerPage } from '@/lib/pagination';

type HomePageProps = {
  params: Promise<{
    page?: string;
  }>;
};

/**
 * Generate static params for all pages of posts
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const params: Array<{ page?: string }> = [];

  // Add first page without page param
  params.push({});

  // Add additional pages
  for (let i = 2; i <= totalPages; i++) {
    params.push({ page: i.toString() });
  }

  return params;
}

/**
 * Home page with paginated list of recent posts
 */
export default async function HomePage({ params }: HomePageProps) {
  const { page } = await params;
  const posts = getAllPosts();
  const currentPage = page ? parseInt(page, 10) : 1;
  const paginatedPosts = getPaginatedPosts(posts, currentPage);
  const pagination = calculatePagination(posts.length, currentPage);

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
        <PostList posts={paginatedPosts} />
        <Pagination pagination={pagination} basePath="" />
      </div>
    </Container>
  );
}
