'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full
        bg-background/80 backdrop-blur-sm border border-border shadow-sm
        hover:scale-105 transition-all duration-200
        flex items-center justify-center
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
    >
      <ArrowUp className="w-5 h-5 text-foreground" />
    </button>
  );
}
