'use client';

import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import type { UploadSourceDialogProps } from '../../interfaces';
import {
  type UploadSourceFormData,
  createUploadSourceSchema,
} from '../../schemas/upload-source.schema';

type UseUploadSourceFormOptions = Pick<
  UploadSourceDialogProps,
  'open' | 'onClose' | 'onSubmit' | 'onClearDuplicateInfo' | 'maxFileSizeBytes'
>;

export function useUploadSourceForm({
  open,
  onClose,
  onSubmit,
  onClearDuplicateInfo,
  maxFileSizeBytes,
}: UseUploadSourceFormOptions) {
  const schema = useMemo(
    () => createUploadSourceSchema(maxFileSizeBytes),
    [maxFileSizeBytes]
  );

  const form = useForm<UploadSourceFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', chunkingStrategy: '' },
  });
  const file = useWatch({ control: form.control, name: 'file' });
  const name = useWatch({ control: form.control, name: 'name' });

  useEffect(() => {
    if (!open) form.reset();
  }, [form, open]);

  const close = () => {
    form.reset();
    onClearDuplicateInfo();
    onClose();
  };

  const submit = form.handleSubmit(values =>
    onSubmit({
      file: values.file,
      name: values.name || undefined,
      chunkingStrategy: values.chunkingStrategy || undefined,
    })
  );

  return {
    form,
    file,
    name,
    close,
    submit,
  };
}
