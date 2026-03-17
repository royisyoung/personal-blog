import { useEffect, useState } from 'react';

// Type definitions for Pagefind
export interface PagefindSearchResult {
  id: string;
  score: number;
  words: number[];
  data: () => Promise<PagefindResultData>;
}

export interface PagefindSearchResponse {
  results: PagefindSearchResult[];
  totalFilters: number;
  totalResults: number;
}

export interface PagefindIndex {
  search: (query: string) => Promise<PagefindSearchResponse>;
}

export interface PagefindResultData {
  content: string;
  excerpt: string;
  url: string;
}

export interface PagefindSearchResultWithData extends PagefindResultData {
  id: string;
  score: number;
  words: number[];
}

declare global {
  interface Window {
    pagefind: {
      init: () => Promise<PagefindIndex>;
    };
  }
}

// Alias for backward compatibility with our own types
type Index = PagefindIndex;
type SearchResult = PagefindSearchResult;

export function usePagefindSearch(query: string): PagefindSearchResultWithData[] {
  const [results, setResults] = useState<PagefindSearchResultWithData[]>([]);
  const [index, setIndex] = useState<PagefindIndex | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Pagefind script is loaded automatically from /pagefind/pagefind.js
    if (!window.pagefind) {
      // Script not loaded yet - dynamically load it
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind.js';
      script.async = true;
      script.onload = () => {
        if (window.pagefind) {
          window.pagefind.init().then((pagefindIndex) => {
            setIndex(pagefindIndex);
          });
        }
      };
      document.body.appendChild(script);
      cleanup = () => document.body.removeChild(script);
    } else {
      // Script already loaded
      window.pagefind.init().then((pagefindIndex) => {
        setIndex(pagefindIndex);
      });
      cleanup = undefined;
    }

    return cleanup;
  }, []);

  useEffect(() => {
    if (!index || !query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    async function performSearch() {
      if (!index) return;
      const searchResponse = await index.search(query.trim());
      const resultsWithContent = await Promise.all(
        searchResponse.results.map(async (result: SearchResult) => {
          const content = await result.data();
          return {
            ...content,
            id: result.id,
            score: result.score,
            words: result.words,
          };
        }),
      );
      setResults(resultsWithContent);
    }

    performSearch();
  }, [query, index]);

  return results;
}
