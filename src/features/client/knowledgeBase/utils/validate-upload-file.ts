import { getSourceTypeForFile } from '../constants/supported-file-types';

export type UploadFileErrorKey =
  | 'emptyFile'
  | 'fileTooLarge'
  | 'unsupportedType';

export function validateUploadFile(
  file: File,
  maxFileSizeBytes: number
): UploadFileErrorKey | null {
  if (file.size <= 0) return 'emptyFile';
  if (file.size > maxFileSizeBytes) return 'fileTooLarge';
  if (getSourceTypeForFile(file) === null) return 'unsupportedType';
  return null;
}
