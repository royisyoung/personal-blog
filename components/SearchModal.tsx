'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePagefindSearch, type PagefindSearchResultWithData } from '@/lib/search';

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = usePagefindSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      // Small delay to wait for modal transition
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Reset query when closed
      setQuery('');
    }
  }, [open]);

  const handleSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 min-h-[44px] min-w-[44px]"
        aria-label="Open search"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="text-2xl font-semibold mb-4">Search Posts</DialogTitle>

          <div className="mb-4">
            <input
              ref={inputRef}
              type="search"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 text-base border rounded-md bg-background border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim().length < 2 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Enter at least 2 characters to search</p>
            ) : results.length === 0 ? (
              <div className="py-6 text-center">
                <p className="font-medium text-base mb-1">No results found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search terms or check your spelling.</p>
              </div>
            ) : (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {results.map((result) => (
                  <li key={result.id} className="py-2">
                    <button
                      onClick={() => handleSelect(result.url)}
                      className="w-full text-left px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 min-h-[44px] transition-colors"
                    >
                      <div className="text-lg font-semibold text-foreground">
                        {result.excerpt || result.content.split('\n')[0] || 'Untitled'}
                      </div>
                      {result.excerpt && result.content && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {result.content.slice(0, 150)}...
                        </p>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchModal;
