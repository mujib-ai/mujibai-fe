import * as z from 'zod';

export const manualTextSourceSchema = z.object({
  title: z.string().min(1, 'titleRequired').max(255, 'titleTooLong'),
  content: z.string().min(1, 'contentRequired').max(50000, 'contentTooLong'),
  category: z.string().max(100).optional(),
  language: z.string().max(20).optional(),
});

export type ManualTextSourceFormData = z.infer<typeof manualTextSourceSchema>;
