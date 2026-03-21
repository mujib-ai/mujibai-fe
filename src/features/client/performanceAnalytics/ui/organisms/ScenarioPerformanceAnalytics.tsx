'use client';

import ConversionsOverview from './ConversionsOverview';
import ScenarioPerformance from './ScenarioPerformance';

export default function ScenarioPerformanceAnalytics({
  t,
}: {
  t: (key: string) => string;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ScenarioPerformance t={t} />
      <ConversionsOverview t={t} />
    </div>
  );
}
