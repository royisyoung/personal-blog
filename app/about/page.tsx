import Container from '@/components/Container';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About - MyClaudes',
    description: 'About the author of MyClaudes - a personal technology blog.',
    openGraph: {
      title: 'About - MyClaudes',
      description: 'About the author of MyClaudes - a personal technology blog.',
      url: `${siteUrl}/about/`,
    },
  };
}

export default function AboutPage() {
  return (
    <Container className="pt-12">
      <h1 className="text-[28px] font-semibold mb-6 text-zinc-900 dark:text-zinc-100">About</h1>
      <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <p>
          Author name and bio goes here. This is a personal technical blog about software development, programming, and
          technology.
        </p>
        <p>
          I write about practical experiences, lessons learned, and interesting technical challenges I encounter in my
          daily work.
        </p>
      </div>
    </Container>
  );
}
