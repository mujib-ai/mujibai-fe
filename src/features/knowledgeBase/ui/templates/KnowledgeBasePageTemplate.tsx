'use client';

import type { ReactNode } from 'react';

import { PageLayout } from '@/shared/components/templates/PageLayout';

interface KnowledgeBasePageTemplateProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function KnowledgeBasePageTemplate({
  title,
  subtitle,
  children,
}: KnowledgeBasePageTemplateProps) {
  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      contentClassName="flex flex-col gap-6"
    >
      {children}
    </PageLayout>
  );
}
