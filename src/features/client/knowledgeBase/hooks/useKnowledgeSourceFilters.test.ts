import { act, renderHook } from '@testing-library/react';

import useKnowledgeSourceFilters from './useKnowledgeSourceFilters';

const mockReplace = jest.fn();
let mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/dashboard/knowledge-base',
  useSearchParams: () => mockSearchParams,
}));

describe('useKnowledgeSourceFilters', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockSearchParams = new URLSearchParams();
  });

  it('defaults to page 1 with no filters applied', () => {
    const { result } = renderHook(() => useKnowledgeSourceFilters());
    expect(result.current.filters.page).toBe(1);
    expect(result.current.filters.status).toBeUndefined();
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('resets the page to 1 when a status filter changes', () => {
    mockSearchParams = new URLSearchParams('page=3');
    const { result } = renderHook(() => useKnowledgeSourceFilters());

    act(() => {
      result.current.setStatusFilter('failed');
    });

    expect(mockReplace).toHaveBeenCalledWith(
      '/dashboard/knowledge-base?page=1&status=failed',
      { scroll: false }
    );
  });

  it('debounces search input before writing it to the URL', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useKnowledgeSourceFilters());

    act(() => {
      result.current.setSearchInput('refund');
    });
    expect(mockReplace).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(mockReplace).toHaveBeenCalledWith(
      '/dashboard/knowledge-base?search=refund&page=1',
      { scroll: false }
    );
    jest.useRealTimers();
  });

  it('clears all filters and search text on reset', () => {
    mockSearchParams = new URLSearchParams('status=failed&search=refund');
    const { result } = renderHook(() => useKnowledgeSourceFilters());

    act(() => {
      result.current.resetFilters();
    });

    expect(mockReplace).toHaveBeenCalledWith('/dashboard/knowledge-base', {
      scroll: false,
    });
  });
});
