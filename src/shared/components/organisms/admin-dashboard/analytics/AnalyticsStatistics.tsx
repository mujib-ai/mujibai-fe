import AnalyticsStatisticsCard from '@/shared/components/molecules/AnalyticsStatisticsCard';

export default function AnalyticsStatistics() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
      <AnalyticsStatisticsCard />
      <AnalyticsStatisticsCard />
      <AnalyticsStatisticsCard />
    </div>
  );
}
