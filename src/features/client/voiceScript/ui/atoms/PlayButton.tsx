'use client';

import { Play } from 'lucide-react';

import { Button } from '@/shared/components/atoms/ui/button';

export default function PlayButton({ locale }: { locale: string }) {
  return (
    <Button className="h-10 w-10 rounded-full">
      <Play className={`size-5 ${locale === 'ar' && 'rotate-180'}`} fill="#fff" />
    </Button>
  );
}
