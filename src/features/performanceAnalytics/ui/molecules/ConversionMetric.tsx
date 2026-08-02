export default function ConversionMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-[#06B6D40F] p-4 dark:bg-[#FFFFFF0F]">
      <h4 className="text-2xl font-bold">{value}</h4>
      <p>{label}</p>
    </div>
  );
}
