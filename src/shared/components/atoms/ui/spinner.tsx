import { cn } from '@/shared/lib/utils';
import { LoaderCircle } from 'lucide-react';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn('size-5 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
