import Image from 'next/image';

export default function Loading() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]" />
      <Image
        src="/loader-logo.svg"
        alt="Loader Logo"
        width={80}
        height={80}
        className="h-20 w-20 drop-shadow-lg"
        priority
      />
    </div>
  );
}
