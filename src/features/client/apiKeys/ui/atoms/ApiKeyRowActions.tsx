'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import { Edit, Trash2 } from 'lucide-react';

import type { ApiKey } from '../../types';

export default function ApiKeyRowActions({
  apiKey,
  onEdit,
  onDelete,
}: {
  apiKey: ApiKey;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (apiKey: ApiKey) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary h-10 w-10 rounded-full"
        onClick={() => onEdit(apiKey)}
      >
        <Edit className="size-4" />
      </Button>
      <Button
        variant="ghost"
        className="h-10 w-10 rounded-full bg-red-500/20 text-red-700 hover:bg-red-500/20 hover:text-red-700"
        onClick={() => onDelete(apiKey)}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
