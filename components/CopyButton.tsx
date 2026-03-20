'use client';

import { useEffect } from 'react';

/**
 * Client-side hydrator for copy buttons
 * Creates the copy buttons directly using DOM API to avoid React hydration issues
 */
export function CopyButtonHydrator() {
  useEffect(() => {
    // Delay to ensure MDX content is fully rendered in DOM
    const timer = setTimeout(() => {
      // Find all copy button placeholders added by the rehype plugin
      const placeholders = document.querySelectorAll<HTMLButtonElement>('[data-copy-button]');

      placeholders.forEach((placeholder) => {
        const code = placeholder.dataset.code;
        if (!code) {
          console.warn('Copy button has no code data');
          return;
        }

        // Create the actual button with vanilla JS
        const button = document.createElement('button');
        button.setAttribute('aria-label', 'Copy code');
        button.className =
          'absolute top-2 right-2 p-2 rounded-md bg-background/60 backdrop-blur-sm border border-border hover:bg-accent transition-colors duration-200 z-10 text-muted-foreground hover:text-accent-foreground';
        button.textContent = 'Copy';

        // Add click handler for copy
        let copied = false;
        button.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(code);
            copied = true;
            button.textContent = 'Copied!';
            button.classList.add('text-green-500');

            setTimeout(() => {
              copied = false;
              button.textContent = 'Copy';
              button.classList.remove('text-green-500');
            }, 2000);
          } catch (error) {
            console.error('Failed to copy text:', error);
          }
        });

        // Replace placeholder with the actual button
        placeholder.replaceWith(button);
      });

      console.log(`Hydrated ${placeholders.length} copy button placeholders`);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything itself
  return null;
}
