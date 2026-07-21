import { AxiosAPI } from '@/shared/utils/axiosInstance';
import { act, renderHook, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { createQueryTestWrapper } from './queryTestWrapper';
import useUploadKnowledgeSource from './useUploadKnowledgeSource';

jest.mock('@/shared/utils/axiosInstance', () => ({
  AxiosAPI: { post: jest.fn(), defaults: { baseURL: 'http://api.test' } },
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const mockPost = AxiosAPI.post as jest.Mock;

function makeFile() {
  const file = new File([new Uint8Array(1024)], 'policy.pdf', {
    type: 'application/pdf',
  });
  return file;
}

describe('useUploadKnowledgeSource', () => {
  beforeEach(() => {
    mockPost.mockReset();
    (toast.success as jest.Mock).mockReset();
    (toast.error as jest.Mock).mockReset();
  });

  it('uploads a file and surfaces a success toast', async () => {
    mockPost.mockResolvedValueOnce({
      data: { data: { id: 'src_1', name: 'policy.pdf' } },
    });
    const { Wrapper } = createQueryTestWrapper();
    const { result } = renderHook(() => useUploadKnowledgeSource('kb_1'), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await result.current.upload({ file: makeFile() });
    });

    expect(mockPost).toHaveBeenCalledWith(
      '/knowledge-bases/kb_1/sources/upload',
      expect.any(FormData),
      expect.any(Object)
    );
    expect(toast.success).toHaveBeenCalled();
    expect(result.current.duplicateInfo).toBeNull();
  });

  it('surfaces an error toast on a generic API failure', async () => {
    mockPost.mockRejectedValueOnce(new Error('network down'));
    const { Wrapper } = createQueryTestWrapper();
    const { result } = renderHook(() => useUploadKnowledgeSource('kb_1'), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await expect(
        result.current.upload({ file: makeFile() })
      ).rejects.toThrow();
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it('surfaces duplicate-source info instead of a generic error toast', async () => {
    const duplicateError = new AxiosError('Conflict');
    duplicateError.response = {
      status: 409,
      data: {
        code: 'DUPLICATE_SOURCE',
        existingSourceId: 'src_existing',
        existingSourceName: 'Refund Policy',
      },
    } as AxiosError['response'];
    mockPost.mockRejectedValueOnce(duplicateError);

    const { Wrapper } = createQueryTestWrapper();
    const { result } = renderHook(() => useUploadKnowledgeSource('kb_1'), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await expect(
        result.current.upload({ file: makeFile() })
      ).rejects.toThrow();
    });

    await waitFor(() => {
      expect(result.current.duplicateInfo).toEqual({
        existingSourceId: 'src_existing',
        existingSourceName: 'Refund Policy',
      });
    });
    expect(toast.error).not.toHaveBeenCalled();
  });
});
