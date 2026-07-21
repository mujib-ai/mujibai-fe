'use client';

import { useTranslations } from 'next-intl';

import { FormField } from '@/shared/components/atoms/FormField';
import { Button } from '@heroui/react';
import { Loader2 } from 'lucide-react';

import { useUploadSourceForm } from '../../hooks/forms';
import type { UploadSourceDialogProps } from '../../interfaces';
import { UploadProgressBar } from '../atoms';
import { ResponsiveFormDialog } from '../molecules/ResponsiveFormDialog';
import UploadDropzone from '../molecules/UploadDropzone';

const INPUT_CLASS =
  'border-input placeholder:text-muted-foreground h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
const BUTTON_OUTLINE_CLASS =
  'border-input hover:bg-accent inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md border bg-transparent px-4 py-2 text-sm shadow-xs disabled:pointer-events-none disabled:opacity-50';
const BUTTON_PRIMARY_CLASS =
  'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-50';

export default function UploadSourceDialog({
  open,
  onClose,
  onSubmit,
  isUploading,
  uploadProgress,
  maxFileSizeBytes,
  duplicateInfo,
  onClearDuplicateInfo,
  onViewExistingSource,
}: UploadSourceDialogProps) {
  const t = useTranslations('KnowledgeBase');
  const { form, file, name, close, submit } = useUploadSourceForm({
    open,
    onClose,
    onSubmit,
    onClearDuplicateInfo,
    maxFileSizeBytes,
  });
  const fileError = form.formState.errors.file?.message;

  return (
    <ResponsiveFormDialog
      open={open}
      onClose={close}
      title={t('upload.title')}
      description={t('upload.description')}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <UploadDropzone
          file={file ?? null}
          onFileSelected={selected =>
            form.setValue('file', selected, { shouldValidate: true })
          }
          onRemove={() => form.resetField('file')}
          disabled={isUploading}
        />

        {fileError && (
          <p className="text-destructive text-xs">{t(`errors.${fileError}`)}</p>
        )}

        {duplicateInfo && (
          <div className="border-border bg-muted/40 rounded-lg border p-3 text-sm">
            <p className="font-medium">{t('upload.duplicateTitle')}</p>
            {duplicateInfo.existingSourceName && (
              <p className="text-muted-foreground mt-1">
                {t('upload.duplicateMessage', {
                  name: duplicateInfo.existingSourceName,
                })}
              </p>
            )}
            {duplicateInfo.existingSourceId && (
              <Button
                onPress={() =>
                  onViewExistingSource(duplicateInfo.existingSourceId!)
                }
                className="text-primary h-auto cursor-pointer p-0 text-sm underline-offset-4 hover:underline"
              >
                {t('upload.viewExisting')}
              </Button>
            )}
          </div>
        )}

        <FormField label={t('upload.nameLabel')} htmlFor="source-name">
          <input
            id="source-name"
            placeholder={t('upload.namePlaceholder')}
            value={name ?? ''}
            onChange={event => form.setValue('name', event.target.value)}
            disabled={isUploading}
            className={INPUT_CLASS}
          />
        </FormField>

        {isUploading && (
          <UploadProgressBar
            value={uploadProgress}
            label={t('upload.uploading')}
          />
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            onPress={close}
            isDisabled={isUploading}
            className={BUTTON_OUTLINE_CLASS}
          >
            {t('upload.cancel')}
          </Button>
          <Button
            type="submit"
            isDisabled={isUploading}
            className={BUTTON_PRIMARY_CLASS}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                {t('upload.uploading')}
              </span>
            ) : (
              t('upload.submit')
            )}
          </Button>
        </div>
      </form>
    </ResponsiveFormDialog>
  );
}
