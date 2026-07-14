import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { Eye, Play } from 'lucide-react';

export type TicketItem = {
  customer: string;
  phone: string;
  duration: string;
  scenario: string;
  date: string;
};

export default function TicketsCardList({
  items,
  t,
}: {
  items: TicketItem[];
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
            <div className="flex items-center justify-between gap-2">
              <span className="text-foreground text-base font-semibold">
                {item.customer}
              </span>
              <div className="flex items-center gap-2">
                <button className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]">
                  <Play fill="#06B6D4" className="size-4" />
                </button>
                <button className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]">
                  <Eye className="text-primary size-4" />
                </button>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">{t('phone')}</dt>
                <dd className="text-foreground font-medium">{item.phone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t('duration')}</dt>
                <dd className="text-foreground font-medium">{item.duration}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t('scenario')}</dt>
                <dd className="text-foreground font-medium">{item.scenario}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t('date')}</dt>
                <dd className="text-foreground font-medium">{item.date}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
