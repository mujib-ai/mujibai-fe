'use client';

import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { Button } from '@/shared/components/atoms/ui/button';

export default function FilterButton() {
  return (
    <Button>
      <ThemedIcon name="filters" size={20} className="h-5 w-5" />
    </Button>
  );
}
