'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Spinner } from '@/shared/components/atoms/ui/spinner';

export default function SlackIntegrationErrorState({
  title,
  message,
  onRetry,
  isRetrying,
  retryLabel,
}: {
  title: string;
  message: string;
  onRetry: () => void;
  isRetrying: boolean;
  retryLabel: string;
}) {
  return (
    <Card className="border-0 bg-[#FFFFFFBF] shadow-none dark:bg-[#001434A6]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-3">
        <p className="text-destructive text-sm">{message}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          disabled={isRetrying}
        >
          {isRetrying ? (
            <span className="flex items-center gap-2">
              <Spinner />
              {retryLabel}
            </span>
          ) : (
            retryLabel
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
