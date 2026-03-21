'use client';

import DailyAICalls from './DailyAICalls';
import IntentDetectionAccuracy from './IntentDetectionAccuracy';

export default function DailyAICallsAnalytics({
  t,
}: {
  t: (key: string) => string;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <DailyAICalls t={t} />
      <IntentDetectionAccuracy t={t} />
    </div>
  );
}
