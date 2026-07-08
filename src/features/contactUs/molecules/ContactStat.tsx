export function ContactStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-3xl leading-none tracking-[-0.02em] text-(--ink)">
        {value}
      </div>
      <div className="mt-1.5 max-w-32.5 text-[10px] leading-[1.4] tracking-[0.08em] text-(--ink-3) uppercase">
        {label}
      </div>
    </div>
  );
}
