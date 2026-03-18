import Link from 'next/link';
import { Rss } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-12">
      <div className="max-w-[70ch] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© {currentYear} MyClaudes. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link
              href="/rss.xml"
              rel="alternate"
              type="application/rss+xml"
              className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              title="Subscribe via RSS"
            >
              <Rss size={16} />
              <span>RSS</span>
            </Link>
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
