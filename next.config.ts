import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  outputFileTracingRoot: __dirname,
  outputFileTracingExcludes: {
    '**': ['pagefind/**'],
  },
  // Use Turbopack for building - fixes contentlayer compatibility issues with Next.js 15
  turbopack: {
    // Turbopack handles binary files and dynamic imports correctly
  },
};

export default withContentlayer(nextConfig);
