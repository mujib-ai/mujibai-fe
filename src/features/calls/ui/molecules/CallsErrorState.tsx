import { ErrorState } from '@/shared/components/molecules/ErrorState';

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
    <ErrorState
      title={errorPrefix}
      description={message}
      retryLabel={retryText}
      onRetry={onRetry}
    />
  );
}
