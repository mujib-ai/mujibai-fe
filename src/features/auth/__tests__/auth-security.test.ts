import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getLoginErrorTranslationKey,
  getVerificationErrorTranslationKey,
  requiresFreshLogin,
} from '../lib/auth-error';
import { can, hasRole } from '../lib/authorization';
import {
  createAuthenticationState,
  verifyAuthenticationState,
} from '../server/auth-state';
import { AuthRequestError } from '../services/auth.service';

describe('signed authentication state', () => {
  beforeEach(() => {
    vi.stubEnv('AUTH_STATE_SECRET', 'test-secret-with-enough-entropy');
  });

  it('verifies a signed state and rejects tampering', async () => {
    const value = await createAuthenticationState('authenticated', 60);
    expect(await verifyAuthenticationState(value)).toBe('authenticated');
    expect(await verifyAuthenticationState(`${value}tampered`)).toBe(
      'unauthenticated'
    );
  });

  it('rejects an expired access state', async () => {
    const value = await createAuthenticationState('authenticated', -1);
    expect(await verifyAuthenticationState(value)).toBe('unauthenticated');
  });
});

describe('authorization utilities', () => {
  const session = {
    role: 'admin',
    permissions: ['knowledge_base.view'],
  };

  it('checks permissions and roles independently', () => {
    expect(can(session, 'knowledge_base.view')).toBe(true);
    expect(can(session, 'billing.update')).toBe(false);
    expect(hasRole(session, 'admin')).toBe(true);
    expect(hasRole(session, 'owner')).toBe(false);
  });
});

describe('backend authentication error translations', () => {
  it('maps login errors without exposing raw fallback text', () => {
    expect(
      getLoginErrorTranslationKey(
        new AuthRequestError('Invalid email or password.', 401)
      )
    ).toBe('invalidCredentials');
    expect(
      getLoginErrorTranslationKey(
        new AuthRequestError('This tenant account is not active.', 403)
      )
    ).toBe('inactiveAccount');
    expect(
      getLoginErrorTranslationKey(new AuthRequestError('slowapi body', 429))
    ).toBe('tooManyRequests');
  });

  it('distinguishes retryable codes from dead 2FA sessions', () => {
    const incorrectCode = new AuthRequestError(
      'The provided 2FA code is invalid or has expired.',
      401
    );
    const expiredSession = new AuthRequestError(
      'Invalid or expired 2FA session. Please log in again.',
      401
    );
    const lockedSession = new AuthRequestError(
      'Too many failed 2FA attempts. Please log in again.',
      429
    );

    expect(getVerificationErrorTranslationKey(incorrectCode)).toBe(
      'twoFactorInvalidCode'
    );
    expect(requiresFreshLogin(incorrectCode)).toBe(false);
    expect(requiresFreshLogin(expiredSession)).toBe(true);
    expect(requiresFreshLogin(lockedSession)).toBe(true);
  });
});
