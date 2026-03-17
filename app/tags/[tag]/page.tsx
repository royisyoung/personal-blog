import { getAllPosts } from '@/lib/content';
import Container from '@/components/Container';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { calculatePagination, getPaginatedPosts, postsPerPage } from '@/lib/pagination';
import { capitalize } from 'lodash';

type TagPageProps = {
  params: Promise<{
    tag: string;
    page?: string;
  }>;
};

/**
 * Generate static params for all tags and pages
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const params: Array<{ tag: string; page?: string }> = [];

  for (const tag of tags) {
    const filteredPosts = posts.filter((post) => post.tags.includes(tag));
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Add first page without page param
    params.push({ tag });

    // Add additional pages
    for (let i = 2; i <= totalPages; i++) {
      params.push({ tag, page: i.toString() });
    }
  }

  return params;
}

/**
 * Tag page showing all posts with a specific tag
 */
export default async function TagPage({ params }: TagPageProps) {
  const { tag, page } = await params;
  const posts = getAllPosts();
  const currentPage = page ? parseInt(page, 10) : 1;

  // Filter posts by tag
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));
  const paginatedPosts = getPaginatedPosts(filteredPosts, currentPage);
  const pagination = calculatePagination(filteredPosts.length, currentPage);

  const displayName = capitalize(tag.replace(/-/g, ' '));

  return (
    <Container>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Tag: {displayName}</h1>
        <p className="text-muted-foreground mt-2">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} with this tag
        </p>
      </header>

      <PostList posts={paginatedPosts} />

      <Pagination pagination={pagination} basePath={`/tags/${tag}`} />
    </Container>
  );
}
