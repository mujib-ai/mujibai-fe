import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/atoms/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]"></div>
      <div className="z-10 flex w-full flex-col items-center justify-center gap-10">
        <Image
          src="/page-not-found.svg"
          alt="Page Not Found"
          width={500}
          height={500}
          className="h-[50%] w-[50%]"
          loading="lazy"
        />
        <Button>
          <Link className="text-foreground" href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
