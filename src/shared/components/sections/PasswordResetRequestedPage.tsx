'use client';

import { PasswordResetContent, PasswordResetHeader } from '@/shared/components/molecules/PasswordResetComponents';

import { usePasswordResetRequested } from '@/features/auth';

export default function PasswordResetRequested() {
  const { loading, handleSendAgain, getTranslations } = usePasswordResetRequested();

  const { title, description, button, sending } = getTranslations();

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]"></div>

      <div className="flex h-[50%] w-[90%] flex-col items-center justify-center gap-5 sm:w-[50%]">
        <PasswordResetHeader />
        
        <PasswordResetContent
          title={title}
          description={description}
          buttonText={button}
          sendingText={sending}
          onSendAgain={handleSendAgain}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
