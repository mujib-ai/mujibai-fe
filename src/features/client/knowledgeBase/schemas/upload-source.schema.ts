import * as z from 'zod';

import {
  ACCEPTED_UPLOAD_EXTENSIONS,
  getSourceTypeForFile,
} from '../constants/supported-file-types';

export function createUploadSourceSchema(maxFileSizeBytes: number) {
  return z.object({
    file: z
      .instanceof(File, { message: 'noFileSelected' })
      .refine(file => file.size > 0, { message: 'emptyFile' })
      .refine(file => file.size <= maxFileSizeBytes, {
        message: 'fileTooLarge',
      })
      .refine(file => getSourceTypeForFile(file) !== null, {
        message: 'unsupportedType',
      }),
    name: z.string().max(255).optional(),
    chunkingStrategy: z.string().optional(),
  });
}

export type UploadSourceFormData = z.infer<
  ReturnType<typeof createUploadSourceSchema>
>;

export { ACCEPTED_UPLOAD_EXTENSIONS };
