import type { LucideIcon } from 'lucide-react';

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="relative rounded-lg border-1 border-gray-200 bg-[#06B6D40F] p-6 shadow-md dark:border-gray-700 dark:bg-transparent">
      <div className="z-50 flex h-full w-full flex-col items-center gap-4">
        <div className="rounded-xl bg-[#06B6D40F] p-5 dark:bg-white/5">
          <Icon aria-hidden="true" className="text-primary size-15" />
        </div>

        <hr className="w-full border-gray-300 dark:border-gray-700" />

        <div className="flex w-full flex-col text-start">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
