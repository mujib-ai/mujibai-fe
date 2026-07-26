export default function CallsEmptyState({ text }: { text: string }) {
  return (
    <div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
      {text}
    </div>
  );
}
