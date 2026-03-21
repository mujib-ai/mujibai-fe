import Image from 'next/image';

export default function AnalyticsStatisticsCard() {
  return (
    <div className="h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#FFFFFF0F]">
      <p className="text-sm">Lorem Ipsum</p>
      <div className="flex items-center justify-between">
        <div className="my-2 flex items-end justify-start gap-2">
          <h5 className="text-4xl font-semibold">1245</h5>
          <span className="text-xl font-semibold text-green-500">+12%</span>
        </div>
        <Image
          src={'/dashboard-images/call.svg'}
          alt="call"
          width={24}
          height={24}
          loading="lazy"
        />
      </div>
    </div>
  );
}
