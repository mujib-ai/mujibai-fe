'use client';

import type {
  AnalyticsOverview,
  AnalyticsTrendPoint,
  TopKeywordItem,
} from '@/features/client/analytics/types';

import DailyAICalls from './DailyAICalls';
import IntentDetectionAccuracy from './IntentDetectionAccuracy';

export default function DailyAICallsAnalytics({
  t,
  points,
  overview,
  topKeywords,
}: {
  t: (key: string) => string;
  points: AnalyticsTrendPoint[];
  overview: AnalyticsOverview | null;
  topKeywords: TopKeywordItem[];
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <DailyAICalls t={t} points={points} />
      <IntentDetectionAccuracy
        t={t}
        intentDetectionRatePercentage={
          overview?.intentDetectionRatePercentage ?? null
        }
        topKeywords={topKeywords}
      />
    </div>
  );
}
