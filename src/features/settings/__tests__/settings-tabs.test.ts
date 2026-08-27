import { describe, expect, it } from 'vitest';

import {
  getSettingsTabFromQuery,
  getSettingsTabQueryValue,
} from '../constants';

describe('settings tab query parameters', () => {
  it('maps readable query values to settings tabs', () => {
    expect(getSettingsTabFromQuery('account')).toBe('accountSettings');
    expect(getSettingsTabFromQuery('integrations')).toBe('integrationSettings');
    expect(getSettingsTabFromQuery('notifications')).toBe(
      'notificationPreference'
    );
  });

  it('supports previous internal tab values', () => {
    expect(getSettingsTabFromQuery('integrationSettings')).toBe(
      'integrationSettings'
    );
  });

  it('falls back safely for missing or invalid values', () => {
    expect(getSettingsTabFromQuery(null)).toBe('accountSettings');
    expect(getSettingsTabFromQuery('unknown')).toBe('accountSettings');
  });

  it('creates stable query values for tab changes', () => {
    expect(getSettingsTabQueryValue('accountSettings')).toBe('account');
    expect(getSettingsTabQueryValue('integrationSettings')).toBe(
      'integrations'
    );
    expect(getSettingsTabQueryValue('notificationPreference')).toBe(
      'notifications'
    );
  });
});
