'use client';

import { useRef, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';
import { FileText, UploadCloud, X } from 'lucide-react';

import { ACCEPTED_UPLOAD_INPUT_ACCEPT } from '../../constants/supported-file-types';
import { formatFileSize } from '../../utils/format-file-size';

interface UploadDropzoneProps {
  file: File | null;
  onFileSelected: (file: File) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export default function UploadDropzone({
  file,
  onFileSelected,
  onRemove,
  disabled,
}: UploadDropzoneProps) {
  const t = useTranslations('KnowledgeBase.upload');
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(fileList: FileList | null) {
    const selected = fileList?.[0];
    if (selected) onFileSelected(selected);
  }

  if (file) {
    return (
      <div className="border-input flex items-center justify-between gap-3 rounded-lg border p-3">
        <div className="flex min-w-0 items-center gap-3">
          <FileText
            className="text-muted-foreground size-8 shrink-0"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium" title={file.name}>
              {file.name}
            </p>
            <p className="text-muted-foreground text-xs">
              {file.type || '—'} · {formatFileSize(file.size, locale)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label={t('remove')}
          className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring shrink-0 rounded-md p-1.5 focus-visible:ring-2 focus-visible:outline-none"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={t('dropzoneLabel')}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={event => {
        if (disabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={event => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={event => {
        event.preventDefault();
        setIsDragging(false);
        if (!disabled) handleFiles(event.dataTransfer.files);
      }}
      className={cn(
        'focus-visible:ring-ring flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors focus-visible:ring-2 focus-visible:outline-none',
        isDragging ? 'border-primary bg-primary/5' : 'border-border',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      <UploadCloud className="text-muted-foreground size-8" aria-hidden />
      <p className="text-sm font-medium">{t('dropzoneLabel')}</p>
      <p className="text-muted-foreground text-xs">{t('dropzoneHint')}</p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_UPLOAD_INPUT_ACCEPT}
        className="sr-only"
        disabled={disabled}
        onChange={event => handleFiles(event.target.files)}
      />
    </div>
  );
}
