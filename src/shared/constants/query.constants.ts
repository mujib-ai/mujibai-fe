export const QUERY_CONSTANTS = {
  KEYS: {
    PLANS: 'plans',
    API_KEYS: 'apiKeys',
    USER: 'user',
    SETTINGS: 'settings',
    USAGE: 'usage',
    CALLS: 'calls',
    TICKETS: 'tickets',
    PERFORMANCE: 'performance',
    AI_OUTBOUND: 'aiOutbound',
  } as const,
  
  CACHE_TIMES: {
    SHORT: 5 * 60 * 1000,
    MEDIUM: 15 * 60 * 1000,
    LONG: 60 * 60 * 1000,
    VERY_LONG: 24 * 60 * 60 * 1000,
  } as const,
  
  STALE_TIMES: {
    IMMEDIATE: 0,
    SHORT: 2 * 60 * 1000,
    MEDIUM: 10 * 60 * 1000,
    LONG: 30 * 60 * 1000,
  } as const,
  
  RETRY: {
    DEFAULT_COUNT: 3,
    DEFAULT_DELAY: 1000,
    EXPONENTIAL_BACKOFF: true,
  } as const,
} as const;

export type QueryKey = typeof QUERY_CONSTANTS.KEYS[keyof typeof QUERY_CONSTANTS.KEYS];
export type CacheTime = typeof QUERY_CONSTANTS.CACHE_TIMES[keyof typeof QUERY_CONSTANTS.CACHE_TIMES];
export type StaleTime = typeof QUERY_CONSTANTS.STALE_TIMES[keyof typeof QUERY_CONSTANTS.STALE_TIMES];
