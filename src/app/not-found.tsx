import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/atoms/ui/button';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');
  return createNoIndexMetadata(t('title'), t('description'));
}

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="relative flex h-screen w-full justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]"></div>
      <div className="z-10 flex w-full flex-col items-center justify-center gap-10">
        <Image
          src="/page-not-found.svg"
          alt={t('title')}
          width={500}
          height={500}
          className="h-[50%] w-[50%]"
          loading="lazy"
        />
        <Button asChild>
          <Link className="text-foreground" href="/">
            {t('backHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
