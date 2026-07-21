import { formatFileSize } from './format-file-size';

describe('formatFileSize', () => {
  it('returns an em dash for null/undefined', () => {
    expect(formatFileSize(null)).toBe('—');
    expect(formatFileSize(undefined)).toBe('—');
  });

  it('formats zero bytes', () => {
    expect(formatFileSize(0)).toBe('0 B');
  });

  it('formats kilobytes and megabytes', () => {
    expect(formatFileSize(2048)).toBe('2 KB');
    expect(formatFileSize(5 * 1024 * 1024)).toBe('5 MB');
  });
});
