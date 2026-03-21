export const PLAN_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 0,

  PLAN_TYPES: {
    monthly: 'monthly',
    yearly: 'yearly',
  } as const,

  SORT_OPTIONS: {
    NAME: 'name',
    CREATED_AT: 'createdAt',
    PRICE: 'price',
  } as const,

  SORT_DIRECTIONS: {
    ASC: 'asc',
    DESC: 'desc',
  } as const,

  SEARCH_DEBOUNCE_MS: 500,
} as const;

export type PlanType =
  (typeof PLAN_CONSTANTS.PLAN_TYPES)[keyof typeof PLAN_CONSTANTS.PLAN_TYPES];
export type SortOption =
  (typeof PLAN_CONSTANTS.SORT_OPTIONS)[keyof typeof PLAN_CONSTANTS.SORT_OPTIONS];
export type SortDirection =
  (typeof PLAN_CONSTANTS.SORT_DIRECTIONS)[keyof typeof PLAN_CONSTANTS.SORT_DIRECTIONS];
