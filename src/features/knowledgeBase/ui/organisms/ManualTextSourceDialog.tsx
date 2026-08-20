'use client';

import { useTranslations } from 'next-intl';

import { FormField } from '@/shared/components/atoms/FormField';
import { Button } from '@/shared/components/atoms/ui/button';
import { Spinner } from '@/shared/components/atoms/ui/spinner';

import { useManualTextSourceForm } from '../../hooks/forms';
import type { ManualTextSourceDialogProps } from '../../interfaces';
import { ResponsiveFormDialog } from '../molecules/ResponsiveFormDialog';

const INPUT_CLASS =
  'border-input placeholder:text-muted-foreground h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
const TEXTAREA_CLASS =
  'border-input placeholder:text-muted-foreground min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

export default function ManualTextSourceDialog({
  open,
  onClose,
  onSubmit,
  isUploading,
}: ManualTextSourceDialogProps) {
  const t = useTranslations('KnowledgeBase');
  const { form, close, submit } = useManualTextSourceForm({
    open,
    onClose,
    onSubmit,
  });
  const { errors } = form.formState;

  return (
    <ResponsiveFormDialog
      open={open}
      onClose={close}
      title={t('manualText.title')}
      description={t('manualText.description')}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <FormField
          label={t('manualText.titleLabel')}
          htmlFor="manual-title"
          error={errors.title?.message && t(`errors.${errors.title.message}`)}
        >
          <input
            id="manual-title"
            placeholder={t('manualText.titlePlaceholder')}
            disabled={isUploading}
            className={INPUT_CLASS}
            {...form.register('title')}
          />
        </FormField>

        <FormField
          label={t('manualText.contentLabel')}
          htmlFor="manual-content"
          error={
            errors.content?.message && t(`errors.${errors.content.message}`)
          }
        >
          <textarea
            id="manual-content"
            placeholder={t('manualText.contentPlaceholder')}
            rows={6}
            disabled={isUploading}
            className={TEXTAREA_CLASS}
            {...form.register('content')}
          />
        </FormField>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={close}
            disabled={isUploading}
          >
            {t('manualText.cancel')}
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" />
                {t('manualText.submit')}
              </span>
            ) : (
              t('manualText.submit')
            )}
          </Button>
        </div>
      </form>
    </ResponsiveFormDialog>
  );
}
