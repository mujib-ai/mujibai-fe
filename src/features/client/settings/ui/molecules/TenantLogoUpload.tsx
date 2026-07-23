'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/atoms/ui/avatar';
import { Button } from '@/shared/components/atoms/ui/button';
import { getApiAssetUrl } from '@/shared/utils/getApiAssetUrl';
import { Spinner } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImagePlus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { TenantSettingsService } from '../../services/tenant-settings.service';

const MAX_LOGO_SIZE = 2 * 1024 * 1024;
const ACCEPTED_LOGO_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];
const ACCEPTED_LOGO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

interface TenantLogoUploadProps {
  currentLogoUrl?: string;
  tenantName?: string;
}

export function TenantLogoUpload({
  currentLogoUrl,
  tenantName = '',
}: TenantLogoUploadProps) {
  const t = useTranslations('settings.accountSettings.logo');
  const queryClient = useQueryClient();
  const resolvedCurrentLogoUrl = getApiAssetUrl(currentLogoUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const uploadMutation = useMutation({
    mutationFn: TenantSettingsService.uploadLogo,
    onSuccess: logoUrl => {
      setSelectedFile(null);
      setPreviewUrl(logoUrl);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success(t('success'));
    },
    onError: () => toast.error(t('uploadFailed')),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (
      !ACCEPTED_LOGO_TYPES.includes(file.type) ||
      !ACCEPTED_LOGO_EXTENSIONS.includes(extension)
    ) {
      toast.error(t('invalidType'));
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      toast.error(t('tooLarge'));
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(undefined);
  };

  return (
    <section className="col-span-full flex flex-col gap-4 rounded-2xl border border-dashed p-4 sm:flex-row sm:items-center">
      <Avatar className="size-24 shrink-0 rounded-2xl">
        <AvatarImage
          src={previewUrl ?? resolvedCurrentLogoUrl}
          alt={t('previewAlt', { name: tenantName })}
          className="object-contain p-2"
        />
        <AvatarFallback className="rounded-2xl">
          <ImagePlus className="text-muted-foreground size-8" aria-hidden />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h2 className="font-semibold">{t('title')}</h2>
          <p className="text-muted-foreground text-sm">{t('description')}</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_LOGO_EXTENSIONS.join(',')}
          onChange={handleFileChange}
          className="sr-only"
          aria-label={t('choose')}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => inputRef.current?.click()}
            disabled={uploadMutation.isPending}
          >
            <ImagePlus className="size-4" />
            {t('choose')}
          </Button>
          {selectedFile && (
            <>
              <Button
                type="button"
                className="rounded-full"
                onClick={() => uploadMutation.mutate(selectedFile)}
                disabled={uploadMutation.isPending}
              >
                {uploadMutation.isPending && (
                  <Spinner size="sm" color="current" />
                )}
                {uploadMutation.isPending ? t('uploading') : t('upload')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSelection}
                disabled={uploadMutation.isPending}
                aria-label={t('removeSelection')}
              >
                <Trash2 className="size-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
