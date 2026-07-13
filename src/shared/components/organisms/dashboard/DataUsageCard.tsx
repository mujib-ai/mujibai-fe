import Link from 'next/link';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Cloud } from 'lucide-react';

export default function DataUsageCard({
  used = 52.7,
  total = 100,
  title,
  upgradePlan,
  of,
  more,
  dataTitle,
}: {
  used: number;
  total: number;
  title: string;
  upgradePlan: string;
  of: string;
  more: string;
  dataTitle: string;
}) {
  const remaining = total - used;
  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-foreground text-xl font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center rounded-2xl bg-[#FFFFFFBF] p-6 dark:bg-[#001434A6]">
        <div className="relative flex h-[140px] w-[220px] items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
            <p className="text-primary flex items-center gap-1 text-sm leading-tight">
              <Cloud fill="#06B6D4" /> {dataTitle}
            </p>
            <h3 className="text-foreground text-3xl leading-none font-semibold">
              {remaining.toFixed(2)} GB
            </h3>
            <p className="text-foreground text-sm leading-tight">
              {of} {total} GB
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
