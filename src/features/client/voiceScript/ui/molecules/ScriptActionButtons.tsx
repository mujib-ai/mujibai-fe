'use client';

import { Button } from '@/shared/components/atoms/ui/button';

export default function ScriptActionButtons({
  addNewLineText,
  onAddNewLine,
}: {
  addNewLineText: string;
  onAddNewLine: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-center gap-2 py-8">
      <Button
        className="text-foreground w-40 rounded-full py-2 text-sm"
        onClick={onAddNewLine}
      >
        {addNewLineText}
      </Button>
    </div>
  );
}
