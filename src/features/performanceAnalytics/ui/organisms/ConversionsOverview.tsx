'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/atoms/ui/chart';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import ConversionMetric from '../molecules/ConversionMetric';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

export default function ConversionsOverview({
  t,
}: {
  t: (key: string) => string;
}) {
  const chartConfig = {
    desktop: {
      label: t('conversionRate'),
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  return (
    <Card className="gap-3 border-none bg-transparent shadow-none">
      <CardHeader className="p-2">
        <CardTitle className="text-xl font-semibold">
          {t('conversionsOverview')}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 rounded-2xl bg-[#FFFFFFBF] p-4 dark:bg-[#00143473]">
        <ConversionMetric value="43%" label={t('conversionRate')} />
        <ConversionMetric value="56" label={t('aiMissedIntents')} />
        <div className="col-span-2 my-5">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="col-span-2 my-5">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
