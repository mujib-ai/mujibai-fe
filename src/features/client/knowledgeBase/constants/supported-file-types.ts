import type { KnowledgeSourceType } from '../types';

export interface UploadableFileTypeConfig {
  sourceType: KnowledgeSourceType;
  extensions: string[];
  mimeTypes: string[];
}

export const UPLOADABLE_FILE_TYPES: UploadableFileTypeConfig[] = [
  {
    sourceType: 'pdf',
    extensions: ['.pdf'],
    mimeTypes: ['application/pdf'],
  },
  {
    sourceType: 'txt',
    extensions: ['.txt'],
    mimeTypes: ['text/plain'],
  },
  {
    sourceType: 'csv',
    extensions: ['.csv'],
    mimeTypes: ['text/csv', 'application/vnd.ms-excel'],
  },
  {
    sourceType: 'excel',
    extensions: ['.xls', '.xlsx'],
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
];

export const ACCEPTED_UPLOAD_EXTENSIONS = UPLOADABLE_FILE_TYPES.flatMap(
  type => type.extensions
);

export const ACCEPTED_UPLOAD_MIME_TYPES = UPLOADABLE_FILE_TYPES.flatMap(
  type => type.mimeTypes
);

export const ACCEPTED_UPLOAD_INPUT_ACCEPT = [
  ...ACCEPTED_UPLOAD_EXTENSIONS,
  ...ACCEPTED_UPLOAD_MIME_TYPES,
].join(',');

export const DEFAULT_MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export function getSourceTypeForFile(file: File): KnowledgeSourceType | null {
  const lowerName = file.name.toLowerCase();
  const match = UPLOADABLE_FILE_TYPES.find(
    type =>
      type.extensions.some(ext => lowerName.endsWith(ext)) ||
      (file.type && type.mimeTypes.includes(file.type))
  );
  return match?.sourceType ?? null;
}
