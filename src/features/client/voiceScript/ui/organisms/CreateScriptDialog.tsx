'use client';

import { useState } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { TextFormField } from '@/shared/components/molecules/TextFormField';
import { TextareaFormField } from '@/shared/components/molecules/TextareaFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import useCreateVoiceScript from '../../hooks/useCreateVoiceScript';
import useUpdateVoiceScript from '../../hooks/useUpdateVoiceScript';
import {
  VoiceScript
} from '../../services/voiceScript.service';

interface CreateScriptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: (key: string) => string;
  mode?: 'create' | 'edit';
  initialValues?: VoiceScript | null;
}

export default function CreateScriptDialog({
  open,
  onOpenChange,
  t,
  mode = 'create',
  initialValues,
}: CreateScriptDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: updateScript } = useUpdateVoiceScript();

  const { mutateAsync: createScript } = useCreateVoiceScript();

  const createScriptSchema = z.object({
    question: z.string().min(1, t('customerMessageRequired')),
    answer: z.string().min(1, t('aiResponseRequired')),
    keywords: z.string().optional(),
    questionVariants: z.string().optional(),
    priority: z.number().min(0),
  });

  type CreateScriptFormValues = z.infer<typeof createScriptSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateScriptFormValues>({
    resolver: zodResolver(createScriptSchema),
    values: initialValues
      ? {
          question: initialValues.question,
          answer: initialValues.answer,
          keywords: initialValues.keywords.join(', '),
          questionVariants: initialValues.questionVariants.join(', '),
          priority: initialValues.priority,
        }
      : {
          question: '',
          answer: '',
          keywords: '',
          questionVariants: '',
          priority: 0,
        },
  });

  const onSubmit = async (values: CreateScriptFormValues) => {
    setIsLoading(true);
    try {
      const payload = {
        question: values.question,
        answer: values.answer,
        questionVariants: values.questionVariants
          ? values.questionVariants
              .split(',')
              .map(k => k.trim())
              .filter(Boolean)
          : [],
        keywords: values.keywords
          ? values.keywords
              .split(',')
              .map(k => k.trim())
              .filter(Boolean)
          : [],
        priority: values.priority,
      };

      if (mode === 'edit' && initialValues?.id) {
        await updateScript({ id: initialValues.id, values: payload });
        toast.success(t('scriptUpdatedSuccessfully'));
      } else {
        await createScript(payload);
        toast.success(t('scriptCreatedSuccessfully'));
      }
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create script:', error);
      toast.error(t('failedToCreateScript'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md border-none bg-[#001434E0] p-0 text-white shadow-2xl backdrop-blur-xl dark:bg-[#001434CC]"
      >
        <div className="relative p-6">
          <div className="flex items-center justify-between pb-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                {mode === 'edit'
                  ? t('editConversationScript')
                  : t('createNewConversation')}
              </DialogTitle>
            </DialogHeader>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer text-white/70 transition-all hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex">
              <TextareaFormField
                name="question"
                label={t('customerMessage')}
                placeholder={t('customerMessagePlaceholder')}
                register={register}
                error={errors.question}
                className="w-[50%] text-white [&_label]:text-white [&_textarea]:min-h-[80px] [&_textarea]:border-none [&_textarea]:bg-[#00244F] [&_textarea]:text-white [&_textarea]:focus-visible:ring-cyan-500"
              />
            </div>
            <div className="flex justify-end">
              <TextareaFormField
                name="answer"
                label={t('aiResponseLabel')}
                placeholder={t('aiResponsePlaceholder')}
                register={register}
                error={errors.answer}
                className="w-[50%] text-white [&_label]:text-white [&_textarea]:min-h-[80px] [&_textarea]:border-none [&_textarea]:bg-[#00244F] [&_textarea]:text-white [&_textarea]:focus-visible:ring-cyan-500"
              />
            </div>
            <TextFormField
              name="keywords"
              label={t('triggerKeyword')}
              placeholder={t('triggerKeywordPlaceholder')}
              register={register}
              error={errors.keywords}
              inputClassName="h-12"
              className="text-white [&_input]:border-none [&_input]:bg-[#00244F] [&_input]:text-white [&_input]:focus-visible:ring-cyan-500 [&_label]:text-white"
            />
            <TextFormField
              name="questionVariants"
              label={t('questionVariants')}
              placeholder={t('questionVariantsPlaceholder')}
              register={register}
              error={errors.questionVariants}
              inputClassName="h-12"
              className="text-white [&_input]:border-none [&_input]:bg-[#00244F] [&_input]:text-white [&_input]:focus-visible:ring-cyan-500 [&_label]:text-white"
            />

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full rounded-full border-cyan-500 bg-transparent text-cyan-500 hover:bg-cyan-500/10"
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-cyan-500 text-white hover:bg-cyan-600"
              >
                {isLoading
                  ? '...'
                  : mode === 'edit'
                    ? t('editConversationScript')
                    : t('createConversation')}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
