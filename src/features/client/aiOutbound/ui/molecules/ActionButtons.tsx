'use client';

import { Download, Plus } from 'lucide-react';

import { Button } from '@/shared/components/atoms/ui/button';

export default function ActionButtons({
  addCallTaskText,
  importCsvText,
}: {
  addCallTaskText: string;
  importCsvText: string;
}) {
  return (
    <div className="my-6 flex w-full items-center justify-end gap-3">
      <Button className="rounded-full py-5">
        <Plus className="size-4" />
        {addCallTaskText}
      </Button>
      <Button className="border-primary text-primary rounded-full border-2 bg-transparent py-5 hover:bg-transparent">
        <Download className="size-4" /> {importCsvText}
      </Button>
    </div>
  );
}
