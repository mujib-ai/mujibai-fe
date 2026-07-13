'use client';

import * as React from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { cn } from '@/shared/lib/utils';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CopyButtonProps {
  value: string;
  className?: string;
  copiedMessage?: string;
  errorMessage?: string;
}

export function CopyButton({
  value,
  className,
  copiedMessage = 'Copied to clipboard',
  errorMessage = 'Could not copy to clipboard',
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(copiedMessage);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      className={cn('text-muted-foreground hover:text-foreground', className)}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="text-primary size-4" />
      ) : (
        <Copy className="size-4" />
      )}
    </Button>
  );
}
