import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/atoms/ui/button';

const logoImage = '/logo.svg';

export function PasswordResetHeader() {
  return (
    <Link
      href={'/'}
      className="transition-all duration-300 hover:scale-110"
    >
      <Image src={logoImage} alt="Logo" width={200} height={50} />
    </Link>
  );
}

interface PasswordResetContentProps {
  title: string;
  description: string;
  buttonText: string;
  sendingText: string;
  onSendAgain: () => void;
  isLoading: boolean;
}

export function PasswordResetContent({
  title,
  description,
  buttonText,
  sendingText,
  onSendAgain,
  isLoading,
}: PasswordResetContentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-t-1 border-b-1 border-white bg-[#FFFFFF80] p-10 text-center sm:w-[100%] md:w-[80%] lg:w-[60%] dark:bg-[#06B6D40F]">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src="/dashboard-images/password-reset-requested.svg"
          alt={title}
          width={300}
          height={300}
          className="h-40 w-40"
        />
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="m-auto w-full text-sm sm:w-[80%]">
          {description}
        </p>
      </div>
      <Button
        className="text-foreground w-full rounded-full py-5 capitalize"
        onClick={onSendAgain}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            {sendingText}
          </span>
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
}
