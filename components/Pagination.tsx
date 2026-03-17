import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PaginationInfo } from '@/lib/pagination';

type PaginationProps = {
  pagination: PaginationInfo;
  basePath: string;
};

/**
 * Pagination component for navigating through pages of posts
 * Displays Previous/Next buttons and page number links
 */
export default function Pagination({ pagination, basePath }: PaginationProps) {
  const { totalPages, currentPage, prevPage, nextPage, pages } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  // Ensure basePath doesn't end with a slash
  const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  const getPageHref = (page: number) => {
    if (page === 1) {
      return normalizedBasePath;
    }
    return `${normalizedBasePath}/page/${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      {/* Previous button */}
      <Button variant="outline" size="sm" asChild disabled={!prevPage}>
        {prevPage ? <Link href={getPageHref(prevPage)}>Previous</Link> : <span>Previous</span>}
      </Button>

      {/* Page numbers */}
      {pages.map((page, i) => {
        if (page === -1) {
          return (
            <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
              ...
            </span>
          );
        }

        return (
          <Button key={page} variant={page === currentPage ? 'default' : 'outline'} size="sm" asChild>
            <Link href={getPageHref(page)}>{page}</Link>
          </Button>
        );
      })}

      {/* Next button */}
      <Button variant="outline" size="sm" asChild disabled={!nextPage}>
        {nextPage ? <Link href={getPageHref(nextPage)}>Next</Link> : <span>Next</span>}
      </Button>
    </nav>
  );
}
