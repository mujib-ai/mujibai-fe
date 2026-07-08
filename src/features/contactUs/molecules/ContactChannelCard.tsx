import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { ArrowRight } from 'lucide-react';

import type { ContactChannel } from '../constants';

export function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  const t = useTranslations('contact.channels');
  const Icon = channel.icon;

  return (
    <div className="w-full rounded-2xl bg-[#FFFFFFCC] p-8 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 dark:bg-[#06B6D40F]">
      <Link
        href={channel.href}
        className="group flex items-center gap-3.5 rounded-2xl bg-(--paper) p-4 no-underline transition-colors"
      >
        <span
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-xl text-white',
            channel.tintClass
          )}
        >
          <Icon className="size-[18px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-(--ink)">
            {t(`${channel.key}.name`)}
          </span>
          <span className="mt-0.5 block text-xs text-(--ink-3)">
            {t(`${channel.key}.desc`)}
          </span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-(--ink-3) transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      </Link>
    </div>
  );
}
