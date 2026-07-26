import { Badge } from '@/shared/components/atoms/ui/badge';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Eye, Play } from 'lucide-react';

import { CALL_STATUS_BADGE_VARIANT } from '../../constants';
import type { CallItem } from '../../types';

export default function CallsCardList({
  items,
  t,
}: {
  items: CallItem[];
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
                {formatPhoneNumber(item.phone)}
              </span>
              <div className="flex items-center gap-2">
                <Badge variant={CALL_STATUS_BADGE_VARIANT[item.status]}>
                  {t(`callStatuses.${item.status}`)}
                </Badge>
                <button
                  type="button"
                  aria-label={t('playRecording')}
                  className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]"
                >
                  <Play fill="#06B6D4" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={t('viewReceipt')}
                  className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]"
                >
                  <Eye className="text-primary size-4" />
                </button>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
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
