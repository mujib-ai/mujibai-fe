import Image from 'next/image';

export default function KeywordInsightItem({ text }: { text: string }) {
  return (
    <li className="flex items-center justify-center gap-1">
      <Image
        src="/landingPage/about-star-image.png"
        alt="stars"
        loading="lazy"
        width={10}
        height={10}
      />
      {text}
    </li>
  );
}
