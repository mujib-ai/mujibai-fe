import Image from 'next/image';
import Link from 'next/link';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/atoms/ui/alert';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';

const logoImage = '/logo.svg';

interface LoginAlertProps {
  alert: {
    type?: 'success' | 'error' | null;
    title: string;
    description: string;
  };
}

export function LoginAlert({ alert }: LoginAlertProps) {
  if (!alert.type) return null;

  return (
    <Alert
      variant={alert.type === 'error' ? 'destructive' : 'default'}
      className={`${alert.type === 'error' ? 'border-red-200 bg-red-50/20' : 'border-green-200 bg-green-50/20'}`}
    >
      {alert.type === 'success' ? <CheckCircle2Icon /> : <AlertCircleIcon />}
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.description}</AlertDescription>
    </Alert>
  );
}

export function LoginHeader() {
  return (
    <Link href="/" className="transition-all duration-300 hover:scale-110">
      <Image src={logoImage} alt="Logo" width={200} height={50} />
    </Link>
  );
}

interface ForgotPasswordLinkProps {
  href: string;
  label: string;
  disabled?: boolean;
}

export function ForgotPasswordLink({
  href,
  label,
  disabled = false,
}: ForgotPasswordLinkProps) {
  return (
    <div className="flex w-full items-center justify-end">
      <Link
        href={href}
        className={`text-primary font-semibold capitalize hover:underline ${
          disabled ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        {label}
      </Link>
    </div>
  );
}
