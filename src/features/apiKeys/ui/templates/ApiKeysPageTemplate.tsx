'use client';

import React from 'react';

import { PageLayout } from '@/shared/components/templates/PageLayout';

interface ApiKeysPageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ApiKeysPageTemplate({
  title,
  subtitle,
  children,
}: ApiKeysPageTemplateProps) {
  return (
    <PageLayout title={title} subtitle={subtitle}>
      {children}
    </PageLayout>
  );
}
