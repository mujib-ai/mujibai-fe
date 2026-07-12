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
        'my-4 overflow-hidden rounded-lg border bg-muted/40 dark:bg-input/20',
        className
      )}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-2 dark:bg-input/30">
          <span className="font-mono text-xs text-muted-foreground">
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
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-4 text-primary" />
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
