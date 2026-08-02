'use client';

import { Progress } from '@/shared/components/atoms/ui/progress';

export default function SatisfactionCell({ value }: { value: number }) {
  return (
    <div className="w-full">
      <p className="text-[#000000BF] dark:text-[#FFFFFFBF]">{value}%</p>
      <Progress value={value} />
    </div>
  );
}
