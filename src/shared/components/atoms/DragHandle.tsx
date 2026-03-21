'use client';

import * as React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';

import { Button } from '@/shared/components/atoms/ui/button';

type Props = { id: number | string };

export default function DragHandle({ id }: Props) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
      aria-label="Drag to reorder"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}
