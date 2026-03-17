import { Post } from 'contentlayer/generated';

/**
 * Number of posts to display per page
 */
export const postsPerPage = 10;

/**
 * Pagination calculation result
 */
export type PaginationInfo = {
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  pages: number[];
};

/**
 * Calculate pagination information
 * @param totalPosts Total number of posts
 * @param currentPage Current page number (1-indexed)
 * @returns Pagination information with totalPages, currentPage, prevPage, nextPage, and pages array
 */
export function calculatePagination(totalPosts: number, currentPage: number): PaginationInfo {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Ensure currentPage is within bounds
  const clampedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // Calculate previous and next page numbers
  const prevPage = clampedCurrentPage > 1 ? clampedCurrentPage - 1 : null;
  const nextPage = clampedCurrentPage < totalPages ? clampedCurrentPage + 1 : null;

  // Generate page numbers to display
  // Show all pages when there are 7 or fewer pages
  // For more pages, show first, current neighborhood, and last
  let pages: number[];

  if (totalPages <= 7) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (clampedCurrentPage <= 3) {
      // Near the start: show 1 2 3 ... last
      pages = [1, 2, 3, 4, 5, -1, totalPages];
    } else if (clampedCurrentPage >= totalPages - 2) {
      // Near the end: show 1 ... last-2 last-1 last
      pages = [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      // Middle: show 1 ... current-1 current current+1 ... last
      pages = [1, -1, clampedCurrentPage - 1, clampedCurrentPage, clampedCurrentPage + 1, -1, totalPages];
    }
  }

  return {
    totalPages,
    currentPage: clampedCurrentPage,
    prevPage,
    nextPage,
    pages,
  };
}

/**
 * Get the paginated slice of posts for the given page
 * @param posts Array of all posts
 * @param page Page number (1-indexed)
 * @returns Sliced array of posts for the current page
 */
export function getPaginatedPosts(posts: Post[], page: number): Post[] {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return posts.slice(startIndex, endIndex);
}
