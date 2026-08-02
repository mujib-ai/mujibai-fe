import { Badge } from '@/shared/components/atoms/ui/badge';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/atoms/ui/tooltip';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Eye } from 'lucide-react';

import { TICKET_STATUS_BADGE_VARIANT } from '../../constants';
import type { TicketItem } from '../../types';

export default function TicketsCardList({
  items,
  t,
}: {
  items: TicketItem[];
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map(item => (
        <Card
          key={item.id}
          className="border-0 bg-[#FFFFFFBF] shadow-none dark:bg-[#001434A6]"
        >
          <CardContent className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-foreground text-base font-semibold">
                {item.customer}
              </span>
              <div className="flex items-center gap-2">
                <Badge variant={TICKET_STATUS_BADGE_VARIANT[item.status]}>
                  {t(`statuses.${item.status}`)}
                </Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]"
                    >
                      <Eye className="text-primary size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{t('viewReceipt')}</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">{t('phone')}</dt>
                <dd className="text-foreground font-medium">
                  {formatPhoneNumber(item.phone)}
                </dd>
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
