import { getAllPosts } from '@/lib/content';
import Container from '@/components/Container';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { calculatePagination, getPaginatedPosts, postsPerPage } from '@/lib/pagination';
import { capitalize } from 'lodash';
import type { Metadata } from 'next';

type CategoryPageProps = {
  params: Promise<{
    category: string;
    page?: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: { params: CategoryPageProps['params'] }): Promise<Metadata> {
  const { category } = await params;
  const displayName = capitalize(category.replace(/-/g, ' '));

  return {
    title: `Category: ${displayName} - MyClaudes`,
    description: `Browse all posts in the ${displayName} category.`,
    openGraph: {
      title: `Category: ${displayName} - MyClaudes`,
      description: `Browse all posts in the ${displayName} category.`,
      url: `${siteUrl}/categories/${category}/`,
    },
  };
}

/**
 * Generate static params for all categories and pages
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  const params: Array<{ category: string; page?: string }> = [];

  for (const category of categories) {
    const filteredPosts = posts.filter((post) => post.category === category);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Add first page without page param
    params.push({ category });

    // Add additional pages
    for (let i = 2; i <= totalPages; i++) {
      params.push({ category, page: i.toString() });
    }
  }

  return params;
}

/**
 * Category page showing all posts in a specific category
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, page } = await params;
  const posts = getAllPosts();
  const currentPage = page ? parseInt(page, 10) : 1;

  // Filter posts by category
  const filteredPosts = posts.filter((post) => post.category === category);
  const paginatedPosts = getPaginatedPosts(filteredPosts, currentPage);
  const pagination = calculatePagination(filteredPosts.length, currentPage);

  const displayName = capitalize(category.replace(/-/g, ' '));

  return (
    <Container>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Category: {displayName}</h1>
        <p className="text-muted-foreground mt-2">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} in this category
        </p>
      </header>

      <PostList posts={paginatedPosts} />

      <Pagination pagination={pagination} basePath={`/categories/${category}`} />
    </Container>
  );
}
