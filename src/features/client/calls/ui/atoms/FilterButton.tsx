'use client';

import { Filter } from 'lucide-react';

import { Button } from '@/shared/components/atoms/ui/button';

export default function FilterButton() {
  return (
    <Button>
      <Filter className="h-5 w-5 text-white" />
    </Button>
  );
}
