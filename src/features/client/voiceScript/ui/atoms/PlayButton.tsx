'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import { Play } from 'lucide-react';

export default function PlayButton({ locale }: { locale: string }) {
  return (
    <Button className="h-10 w-10 rounded-full">
      <Play
        className={`size-5 ${locale === 'ar' && 'rotate-180'}`}
        fill="#fff"
      />
    </Button>
  );
}
