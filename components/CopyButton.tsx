'use client';

import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Copy, Check } from 'lucide-react';

type CopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute top-2 right-2 p-2 rounded-md
        bg-background/60 backdrop-blur-sm border border-border
        hover:bg-accent transition-colors duration-200
        z-10"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
}

/**
 * Client-side hydrator for copy buttons
 * MDX outputs static HTML with placeholder buttons, this component
 * finds all placeholders and hydrates them with interactive React CopyButtons
 */
export function CopyButtonHydrator() {
  useEffect(() => {
    // Find all copy button placeholders added by the rehype plugin
    const placeholders = document.querySelectorAll<HTMLButtonElement>('[data-copy-button]');

    placeholders.forEach((placeholder) => {
      const code = placeholder.dataset.code;
      if (!code) return;

      // Create a container and render the actual React CopyButton
      const container = document.createElement('div');
      placeholder.replaceWith(container);
      const root = createRoot(container);
      root.render(<CopyButton text={code} />);
    });
  }, []);

  // This component doesn't render anything itself
  return null;
}
