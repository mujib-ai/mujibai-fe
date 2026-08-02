import { Button } from '@/shared/components/atoms/ui/button';

export default function CallsErrorState({
  message,
  errorPrefix,
  retryText,
  onRetry,
}: {
  message: string;
  errorPrefix: string;
  retryText: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-40 flex-col items-center justify-center gap-3">
      <p className="text-destructive text-sm">
        {errorPrefix}
        {message}
      </p>
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>
        {retryText}
      </Button>
    </div>
  );
}
