import { createUploadSourceSchema } from './upload-source.schema';

const ONE_MB = 1024 * 1024;

function makeFile(name: string, sizeBytes: number, type: string): File {
  const file = new File([new Uint8Array(Math.max(sizeBytes, 0))], name, {
    type,
  });
  Object.defineProperty(file, 'size', { value: sizeBytes });
  return file;
}

describe('createUploadSourceSchema', () => {
  it('validates a supported file within the backend-provided size limit', () => {
    const schema = createUploadSourceSchema(10 * ONE_MB);
    const result = schema.safeParse({
      file: makeFile('policy.pdf', ONE_MB, 'application/pdf'),
    });
    expect(result.success).toBe(true);
  });

  it('fails with "fileTooLarge" using the exact backend-provided limit, not a hard-coded one', () => {
    const schema = createUploadSourceSchema(2 * ONE_MB);
    const tooBig = schema.safeParse({
      file: makeFile('policy.pdf', 3 * ONE_MB, 'application/pdf'),
    });
    expect(tooBig.success).toBe(false);
    expect(tooBig.error?.issues[0]?.message).toBe('fileTooLarge');

    const withinLimit = schema.safeParse({
      file: makeFile('policy.pdf', 2 * ONE_MB, 'application/pdf'),
    });
    expect(withinLimit.success).toBe(true);
  });

  it('fails with "emptyFile" for a zero-byte file', () => {
    const schema = createUploadSourceSchema(10 * ONE_MB);
    const result = schema.safeParse({
      file: makeFile('empty.pdf', 0, 'application/pdf'),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe('emptyFile');
  });

  it('fails with "unsupportedType" for an unsupported extension', () => {
    const schema = createUploadSourceSchema(10 * ONE_MB);
    const result = schema.safeParse({
      file: makeFile('archive.zip', ONE_MB, 'application/zip'),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe('unsupportedType');
  });
});
