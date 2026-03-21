import Image from 'next/image';

export default function VoiceScriptHint({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-2">
      <Image
        src="/about-star-image.png"
        alt="Feature"
        width={10}
        height={10}
        className="h-[10px] w-[10px] md:h-[20px] md:w-[20px]"
        loading="lazy"
      />
      <span>{text}</span>
    </p>
  );
}
