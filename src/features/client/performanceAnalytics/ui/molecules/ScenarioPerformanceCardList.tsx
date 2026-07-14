import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { Progress } from '@/shared/components/atoms/ui/progress';

export type ScenarioPerformanceItem = {
  scenarioName: string;
  calls: number;
  duration: number;
  satisfaction: number;
};

export default function ScenarioPerformanceCardList({
  items,
  t,
}: {
  items: ScenarioPerformanceItem[];
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className="border-0 bg-[#FFFFFFBF] shadow-none dark:bg-[#001434A6]"
        >
          <CardContent className="flex flex-col gap-3 p-4">
            <span className="text-foreground text-base font-semibold">
              {item.scenarioName}
            </span>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">{t('calls')}</p>
                <p className="text-foreground font-medium">{item.calls}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('duration')}</p>
                <p className="text-foreground font-medium">{item.duration}</p>
              </div>
            </div>

            <div className="w-full">
              <p className="text-muted-foreground text-sm">
                {t('satisfaction')}
              </p>
              <p className="text-[#000000BF] dark:text-[#FFFFFFBF]">
                {item.satisfaction}%
              </p>
              <Progress value={item.satisfaction} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
