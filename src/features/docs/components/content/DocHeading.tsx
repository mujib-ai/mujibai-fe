import * as React from 'react';

import { slugify } from '@/features/docs/lib/slugify';
import { cn } from '@/shared/lib/utils';
import { Link as LinkIcon } from 'lucide-react';

type DocHeadingProps = {
  level: 2 | 3;
  children: string;
  className?: string;
};

export function DocHeading({ level, children, className }: DocHeadingProps) {
  const id = slugify(children);
  const Tag = level === 2 ? 'h2' : 'h3';

  return (
    <Tag
      id={id}
      className={cn(
        'group relative scroll-mt-24 font-semibold tracking-tight text-foreground',
        level === 2 && 'mt-10 mb-4 border-b pb-2 text-2xl first:mt-0',
        level === 3 && 'mt-8 mb-3 text-lg',
        className
      )}
    >
      <a
        href={`#${id}`}
        className="absolute -left-5 inline-flex h-full items-center opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={`Link to ${children}`}
      >
        <LinkIcon className="size-4 text-muted-foreground" />
      </a>
      {children}
    </Tag>
  );
}
