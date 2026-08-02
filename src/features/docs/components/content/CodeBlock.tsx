'use client';

import * as React from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { cn } from '@/shared/lib/utils';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
};

export function CodeBlock({
  code,
  language,
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  return (
    <div
      className={cn(
        'bg-muted/40 dark:bg-input/20 my-4 overflow-hidden rounded-lg border',
        className
      )}
    >
      {(filename || language) && (
        <div className="bg-muted/60 dark:bg-input/30 flex items-center justify-between border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">
            {filename ?? language}
          </span>
        </div>
      )}
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground absolute top-2 right-2"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="text-primary size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
        <pre className="overflow-x-auto p-4 pr-12 text-sm leading-relaxed">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}
