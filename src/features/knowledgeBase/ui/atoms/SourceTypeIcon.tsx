import {
  FileSpreadsheet,
  FileText,
  Globe,
  MessageCircleQuestion,
  NotebookPen,
  Table,
  Webhook,
} from 'lucide-react';

import type { KnowledgeSourceType } from '../../types';

const SOURCE_TYPE_ICONS = {
  pdf: FileText,
  txt: FileText,
  csv: FileSpreadsheet,
  excel: Table,
  manual_text: NotebookPen,
  faq: MessageCircleQuestion,
  website: Globe,
  api: Webhook,
} satisfies Record<KnowledgeSourceType, typeof FileText>;

interface SourceTypeIconProps {
  sourceType: KnowledgeSourceType;
  className?: string;
}

export default function SourceTypeIcon({
  sourceType,
  className,
}: SourceTypeIconProps) {
  const Icon = SOURCE_TYPE_ICONS[sourceType] ?? FileText;
  return (
    <Icon className={className ?? 'text-muted-foreground size-4'} aria-hidden />
  );
}
