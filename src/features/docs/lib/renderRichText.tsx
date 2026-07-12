import type { ReactNode } from 'react';

import Link from 'next/link';

import { InlineCode } from '@/features/docs/components/content/DocText';

const TOKEN_PATTERN = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\((\/[^)]+)\)/g;

/**
 * Lightweight markdown-lite renderer for translated doc strings.
 * Supports `code`, **bold**, and [label](/internal-link) — kept intentionally
 * small so translated JSON stays simple instead of depending on raw HTML.
 */
export function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, code, bold, linkLabel, linkHref] = match;

    if (code !== undefined) {
      nodes.push(<InlineCode key={key++}>{code}</InlineCode>);
    } else if (bold !== undefined) {
      nodes.push(
        <strong key={key++} className="text-foreground">
          {bold}
        </strong>
      );
    } else if (linkLabel !== undefined && linkHref !== undefined) {
      nodes.push(
        <Link
          key={key++}
          href={linkHref}
          className="text-primary underline-offset-4 hover:underline"
        >
          {linkLabel}
        </Link>
      );
    }

    lastIndex = TOKEN_PATTERN.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
