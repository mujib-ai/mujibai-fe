import { Card, CardContent } from '@/shared/components/atoms/ui/card';

import SatisfactionCell from '../atoms/SatisfactionCell';

export type AiOutboundItem = {
  label: string;
  phone: string;
  duration: string;
  scenario: string;
  satisfaction: number;
};

export default function AiOutboundCardList({
  items,
  t,
}: {
  items: AiOutboundItem[];
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className="border-0 bg-[#FFFFFF73] shadow-none dark:bg-[#00143473]"
        >
          <CardContent className="flex flex-col gap-3 p-4">
            <span className="text-foreground text-base font-semibold">
              {item.label}
            </span>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">{t('phone')}</p>
                <p className="text-foreground font-medium">{item.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('duration')}</p>
                <p className="text-foreground font-medium">{item.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('scenario')}</p>
                <p className="text-foreground font-medium">{item.scenario}</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                {t('satisfaction')}
              </p>
              <SatisfactionCell value={item.satisfaction} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
