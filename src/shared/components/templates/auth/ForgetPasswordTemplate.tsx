'use client';

import Image from 'next/image';
import Link from 'next/link';

const logoImage = '/logo.svg';

interface ForgetPasswordTemplateProps {
  children: React.ReactNode;
}

export default function ForgetPasswordTemplate({
  children,
}: ForgetPasswordTemplateProps) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]" />

      <div className="flex h-[50%] w-[100%] flex-col items-center justify-center gap-5 sm:w-[50%]">
        <Link
          href={'/'}
          className="transition-all duration-300 hover:scale-110"
        >
          <Image src={logoImage} alt="Logo" width={200} height={50} />
        </Link>
        {children}
      </div>
    </div>
  );
}
