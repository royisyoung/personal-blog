'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

type PostContentProps = {
  code: string;
};

/**
 * Client component that renders MDX content using useMDXComponent hook
 * Required because React Hooks cannot be called in server components
 */
export function PostContent({ code }: PostContentProps) {
  const MDXContent = useMDXComponent(code);
  return <MDXContent />;
}
