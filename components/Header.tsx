'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            MyClaudes
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors px-2 py-1 rounded-md',
                      isActive
                        ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <SearchModal />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
