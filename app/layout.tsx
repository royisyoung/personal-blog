import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/lib/theme';
import Header from '@/components/Header';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'MyClaudes - Personal Technology Blog',
  description: 'A clean, fast static technology blog',
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
