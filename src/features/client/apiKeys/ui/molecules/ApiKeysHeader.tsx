'use client';

import Link from 'next/link';

import { Button } from '@/shared/components/atoms/ui/button';
import { Plus } from 'lucide-react';

export default function ApiKeysHeader({
  onCreateNewKey,
  viewUsageText,
  usagePageText,
  createNewSecretKeyText,
}: {
  onCreateNewKey: () => void;
  viewUsageText: string;
  usagePageText: string;
  createNewSecretKeyText: string;
}) {
  return (
    <div className="flex items-center justify-between px-2">
      <h4>
        {viewUsageText}{' '}
        <Link
          href="/dashboard/usage"
          className="text-primary border-primary border-b-1 border-dashed"
        >
          {usagePageText}
        </Link>
      </h4>
      <Button className="rounded-full py-5" onClick={onCreateNewKey}>
        <Plus className="size-4" />
        {createNewSecretKeyText}
      </Button>
    </div>
  );
}
