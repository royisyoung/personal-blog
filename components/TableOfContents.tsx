'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Heading } from '@/lib/toc';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up IntersectionObserver to track which headings are in view
  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const callback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the first visible heading as active
        setActiveId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-80px 0% -80% 0%',
      threshold: 0.1,
    });

    observerRef.current = observer;

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile: collapsible block before content */}
      <div className="xl:hidden mb-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3 text-left"
        >
          <span className="text-sm font-medium">Table of Contents</span>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {!isCollapsed && (
          <nav className="mt-2 rounded-lg border border-border bg-background p-4">
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id} className={cn('transition-colors duration-200', heading.depth === 3 && 'ml-3')}>
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setIsCollapsed(true)}
                    className={cn(
                      'block hover:text-foreground',
                      activeId === heading.id ? 'font-semibold text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {heading.value}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky left sidebar */}
      <div className="hidden xl:block">
        <nav className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <h4 className="mb-3 text-sm font-semibold text-foreground">Table of Contents</h4>
          <ul className="space-y-2 text-sm">
            {headings.map((heading) => (
              <li key={heading.id} className={cn('transition-colors duration-200', heading.depth === 3 && 'ml-3')}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    'block hover:text-foreground hover:underline underline-offset-4',
                    activeId === heading.id ? 'font-semibold text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {heading.value}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
