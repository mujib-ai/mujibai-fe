import Link from 'next/link';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Cloud } from 'lucide-react';

const GAUGE_RADIUS = 90;
const GAUGE_STROKE = 16;
const GAUGE_PAD = GAUGE_STROKE / 2 + 4;
const GAUGE_START_ANGLE = 135;
const GAUGE_SWEEP = 270;
const GAUGE_CX = GAUGE_RADIUS + GAUGE_PAD;
const GAUGE_CY = GAUGE_RADIUS + GAUGE_PAD;
const GAUGE_VIEW_WIDTH = GAUGE_RADIUS * 2 + GAUGE_PAD * 2;
const GAUGE_VIEW_HEIGHT =
  GAUGE_CY + GAUGE_RADIUS * Math.sin((135 * Math.PI) / 180) + GAUGE_PAD;

function polarToCartesian(angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: GAUGE_CX + GAUGE_RADIUS * Math.cos(angleRad),
    y: GAUGE_CY + GAUGE_RADIUS * Math.sin(angleRad),
  };
}

function describeArc(startAngle: number, sweepAngle: number) {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(startAngle + sweepAngle);
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export default function DataUsageCard({
  used = 52.7,
  total = 100,
  title,
  upgradePlan,
  of,
  more,
  dataTitle,
  left,
}: {
  used: number;
  total: number;
  title: string;
  upgradePlan: string;
  of: string;
  more: string;
  dataTitle: string;
  left?: string;
}) {
  const remaining = total - used;
  const pct = total > 0 ? Math.min(Math.max(remaining / total, 0), 1) : 0;

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-foreground text-xl font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center rounded-2xl bg-[#FFFFFFBF] p-6 dark:bg-[#001434A6]">
        <div
          className="relative w-full max-w-55"
          style={{ aspectRatio: `${GAUGE_VIEW_WIDTH} / ${GAUGE_VIEW_HEIGHT}` }}
        >
          <svg
            viewBox={`0 0 ${GAUGE_VIEW_WIDTH} ${GAUGE_VIEW_HEIGHT}`}
            className="absolute inset-0 h-full w-full"
          >
            <path
              d={describeArc(GAUGE_START_ANGLE, GAUGE_SWEEP)}
              fill="none"
              stroke="#06B6D426"
              strokeWidth={GAUGE_STROKE}
              strokeLinecap="round"
            />
            <path
              d={describeArc(GAUGE_START_ANGLE, GAUGE_SWEEP * pct)}
              fill="none"
              stroke="#06B6D4"
              strokeWidth={GAUGE_STROKE}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
            <p className="text-primary flex items-center gap-1 text-sm leading-tight">
              <Cloud fill="#06B6D4" /> {dataTitle}
            </p>
            <h3 className="text-foreground text-3xl leading-none font-semibold">
              {remaining.toFixed(2)} GB
            </h3>
            <p className="text-foreground text-sm leading-tight">
              {of} {total} GB {left}
            </p>
            <Link
              href="#"
              className="text-foreground hover:text-primary text-sm underline transition-colors"
            >
              {more}
            </Link>
          </div>
        </div>
        <Button className="text-foreground mt-6 w-full rounded-full bg-cyan-400 py-4 font-semibold transition-colors hover:bg-cyan-300">
          {upgradePlan}
        </Button>
      </CardContent>
    </Card>
  );
}
