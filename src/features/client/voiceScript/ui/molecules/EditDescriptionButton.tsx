'use client';

import { Button } from '@/shared/components/atoms/ui/button';

export default function EditDescriptionButton({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <Button className="text-foreground w-40 rounded-full py-2 text-sm">
        {text}
      </Button>
    </div>
  );
}
