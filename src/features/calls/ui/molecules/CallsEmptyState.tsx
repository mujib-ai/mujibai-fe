import { EmptyState } from '@/shared/components/molecules/EmptyState';
import { PhoneOff } from 'lucide-react';

export default function CallsEmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <EmptyState icon={PhoneOff} title={text} />
    </div>
  );
}
