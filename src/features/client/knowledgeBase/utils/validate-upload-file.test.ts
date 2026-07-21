import { validateUploadFile } from './validate-upload-file';

const ONE_MB = 1024 * 1024;

function makeFile(name: string, sizeBytes: number, type = ''): File {
  const file = new File([new Uint8Array(Math.max(sizeBytes, 0))], name, {
    type,
  });
  Object.defineProperty(file, 'size', { value: sizeBytes });
  return file;
}

describe('validateUploadFile', () => {
  it('accepts a supported, non-empty file within the size limit', () => {
    const file = makeFile('policy.pdf', ONE_MB, 'application/pdf');
    expect(validateUploadFile(file, 10 * ONE_MB)).toBeNull();
  });

  it('rejects an empty file', () => {
    const file = makeFile('empty.pdf', 0, 'application/pdf');
    expect(validateUploadFile(file, 10 * ONE_MB)).toBe('emptyFile');
  });

  it('rejects a file exceeding the backend-provided max size', () => {
    const file = makeFile('big.pdf', 20 * ONE_MB, 'application/pdf');
    expect(validateUploadFile(file, 10 * ONE_MB)).toBe('fileTooLarge');
  });

  it('rejects an unsupported file type', () => {
    const file = makeFile('archive.zip', ONE_MB, 'application/zip');
    expect(validateUploadFile(file, 10 * ONE_MB)).toBe('unsupportedType');
  });

  it('accepts every documented supported extension', () => {
    const supported = [
      ['a.pdf', 'application/pdf'],
      ['a.txt', 'text/plain'],
      ['a.csv', 'text/csv'],
      ['a.xls', 'application/vnd.ms-excel'],
      [
        'a.xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
    ] as const;

    for (const [name, type] of supported) {
      const file = makeFile(name, ONE_MB, type);
      expect(validateUploadFile(file, 10 * ONE_MB)).toBeNull();
    }
  });
});
