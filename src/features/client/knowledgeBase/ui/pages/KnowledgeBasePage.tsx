'use client';

import { useTranslations } from 'next-intl';

import { useKnowledgeBasePageController } from '../../hooks/useKnowledgeBasePageController';
import { KnowledgeBaseContent } from '../organisms/KnowledgeBaseContent';
import { KnowledgeBaseDialogs } from '../organisms/KnowledgeBaseDialogs';
import KnowledgeBaseHeader from '../organisms/KnowledgeBaseHeader';
import { KnowledgeBasePageTemplate } from '../templates';

export default function KnowledgeBasePage() {
  const t = useTranslations('KnowledgeBase');
  const controller = useKnowledgeBasePageController();

  return (
    <KnowledgeBasePageTemplate title={t('title')} subtitle={t('subTitle')}>
      <KnowledgeBaseHeader
        stats={controller.stats}
        can={controller.can}
        onUpload={() => controller.actions.setUploadDialogOpen(true)}
        onAddManualText={() => controller.actions.setManualTextDialogOpen(true)}
      />

      <KnowledgeBaseContent controller={controller} />
      <KnowledgeBaseDialogs controller={controller} />
    </KnowledgeBasePageTemplate>
  );
}
