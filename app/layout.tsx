import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/lib/theme';
import Header from '@/components/Header';
import Container from '@/components/Container';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'MyClaudes - Personal Technology Blog',
  description: 'A clean, fast static technology blog',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    siteName: 'MyClaudes',
    title: 'MyClaudes - Personal Technology Blog',
    description: 'A clean, fast static technology blog',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyClaudes - Personal Technology Blog',
    description: 'A clean, fast static technology blog',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable, 'font-sans')}>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
        <ThemeProvider>
          <Header />
          <main>
            <Container>{children}</Container>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
