'use client';

import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

import useAuth from './useAuth';

export function usePasswordResetRequested() {
  const { handleForgotPassword, loading } = useAuth();
  const t = useTranslations('passwordResetRequested');

  const resetEmail = Cookies.get('resetEmail');

  const handleSendAgain = async () => {
    const res = await handleForgotPassword(resetEmail || '');
    if (res) {
      Cookies.remove('resetEmail');
    }
  };

  const getTranslations = () => ({
    title: t('title'),
    description: t('description'),
    button: t('button'),
    sending: t('sending'),
  });

  return {
    resetEmail,
    loading,
    handleSendAgain,
    getTranslations,
  };
}
