'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import { Filter } from 'lucide-react';

export default function FilterButton() {
  return (
    <Button>
      <Filter className="h-5 w-5 text-white" />
    </Button>
  );
}
