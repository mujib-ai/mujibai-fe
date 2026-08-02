'use client';

import type { AnalyticsTrendPoint } from '@/features/analytics/types';
import {
  buildTrendChartConfig,
  getTrendSeriesKeys,
  getTrendXKey,
} from '@/features/analytics/utils/analytics-chart-mappers';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/atoms/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

export default function DailyAICalls({
  t,
  points,
}: {
  t: (key: string) => string;
  points: AnalyticsTrendPoint[];
}) {
  const xKey = getTrendXKey(points);
  const seriesKeys = getTrendSeriesKeys(points, xKey);
  const chartConfig = buildTrendChartConfig(seriesKeys);

  return (
    <Card className="col-span-2 gap-3 border-none bg-transparent shadow-none">
      <CardHeader className="p-2">
        <CardTitle className="text-xl font-semibold">
          {t('dailyAICalls')}
        </CardTitle>
      </CardHeader>
      <CardContent className="rounded-2xl bg-[#FFFFFFBF] p-4 dark:bg-[#00143473]">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={points}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {seriesKeys.map(key => (
                <linearGradient
                  key={key}
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            {seriesKeys.map(key => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
