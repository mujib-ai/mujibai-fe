'use client';

import { PageLayout } from '@/shared/components/templates/PageLayout';

interface SettingsPageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SettingsPageTemplate({
  title,
  subtitle,
  children,
}: SettingsPageTemplateProps) {
  return (
    <PageLayout title={title} subtitle={subtitle}>
      {children}
    </PageLayout>
  );
}
