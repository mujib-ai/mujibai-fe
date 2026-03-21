export const API_KEYS_CONSTANTS = {
  SECRET_KEY_PREFIX: 'sk',
  MASK_CHAR: '*',
  MASK_LENGTH: 4,
  PERMISSIONS: {
    ALL: 'All',
    READ_ONLY: 'Read Only',
    WRITE: 'Write',
  } as const,
  DEFAULT_PERMISSION: 'All',
  DEFAULT_KEY_NAME: 'New API Key',
  LAST_USED_TEXTS: { NEVER: 'Never' } as const,
  LOADING_TEXT: 'Loading...',
  ERROR_PREFIX: 'Error: ',
  CREATE_DELAY_MS: 1000,
  UPDATE_DELAY_MS: 500,
  DELETE_DELAY_MS: 500,
} as const;
