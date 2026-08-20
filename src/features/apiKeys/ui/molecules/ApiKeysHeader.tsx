'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import { Plus } from 'lucide-react';

export default function ApiKeysHeader({
  onCreateNewKey,
  createNewSecretKeyText,
}: {
  onCreateNewKey: () => void;
  createNewSecretKeyText: string;
}) {
  return (
    <div className="flex items-center justify-end px-2">
      <Button className="rounded-full py-5" onClick={onCreateNewKey}>
        <Plus className="size-4" />
        {createNewSecretKeyText}
      </Button>
    </div>
  );
}
