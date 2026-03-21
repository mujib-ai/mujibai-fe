'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';

export default function EmptyScriptCard({
  title,
  heading,
  description,
  locale,
}: {
  title: string;
  heading: string;
  description: string;
  locale: string;
}) {
  return (
    <Card className="my-10 border-none p-0 dark:bg-[#00143473]">
      <CardHeader className="py-2 dark:bg-[#00143473]">
        <CardTitle
          className={`${
            locale === 'ar'
              ? 'text-right text-xl font-semibold'
              : 'text-left text-xl font-semibold'
          }`}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-xl font-semibold">{heading}</h3>
          <p className="text-base font-normal">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
