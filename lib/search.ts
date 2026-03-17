import { useEffect, useState } from 'react';
import type { Index, SearchResult } from 'pagefind';

declare global {
  interface Window {
    pagefind: {
      init: () => Promise<Index>;
    };
  }
}

export interface PagefindSearchResult {
  id: string;
  score: number;
  words: number[];
  content: string;
  excerpt: string;
  url: string;
}

export function usePagefindSearch(query: string): PagefindSearchResult[] {
  const [results, setResults] = useState<PagefindSearchResult[]>([]);
  const [index, setIndex] = useState<Index | null>(null);

  useEffect(() => {
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
      return () => document.body.removeChild(script);
    } else {
      // Script already loaded
      window.pagefind.init().then((pagefindIndex) => {
        setIndex(pagefindIndex);
      });
    }
  }, []);

  useEffect(() => {
    if (!index || !query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    async function performSearch() {
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
