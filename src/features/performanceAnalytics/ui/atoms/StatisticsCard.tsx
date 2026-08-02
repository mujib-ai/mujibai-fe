import Image from 'next/image';

export default function StatisticsCard({
  icon,
  number,
  title,
}: {
  icon: string;
  number: string;
  title: string;
}) {
  return (
    <div className="flex min-h-[129px] min-w-[182px] flex-col gap-[12px] rounded-xl bg-[#FFFFFFBF] p-[16px] dark:bg-[#FFFFFF0F]">
      <Image src={icon} alt="icon" width={24} height={24} loading="lazy" />
      <h2 className="text-3xl font-semibold">{number}</h2>
      <p className="text-gray-400">{title}</p>
    </div>
  );
}
