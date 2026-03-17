'use client';

import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn('max-w-[70ch] mx-auto px-4 py-12', className)}>{children}</div>;
}
