import {
  FileSpreadsheet,
  FileText,
  FileType,
  Globe,
  MessageCircleQuestion,
  Plug,
} from 'lucide-react';

import type { KnowledgeSourceType } from '../../types';

const SOURCE_TYPE_ICONS = {
  pdf: FileText,
  txt: FileType,
  csv: FileSpreadsheet,
  excel: FileSpreadsheet,
  manual_text: FileType,
  faq: MessageCircleQuestion,
  website: Globe,
  api: Plug,
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
