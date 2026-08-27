import { describe, expect, it } from 'vitest';

import { getAuthRouteAction } from '../lib/auth-routing';

describe('authentication route matrix', () => {
  it('allows unauthenticated users on login', () => {
    expect(getAuthRouteAction('unauthenticated', '/login')).toBe('allow');
  });

  it('redirects unauthenticated users away from 2FA and protected routes', () => {
    expect(getAuthRouteAction('unauthenticated', '/verify-2fa')).toBe(
      'redirect_login'
    );
    expect(getAuthRouteAction('unauthenticated', '/dashboard/settings')).toBe(
      'redirect_login'
    );
  });

  it('allows pending users only on the 2FA route', () => {
    expect(getAuthRouteAction('pending_2fa', '/verify-2fa')).toBe('allow');
    expect(getAuthRouteAction('pending_2fa', '/login')).toBe('redirect_2fa');
    expect(getAuthRouteAction('pending_2fa', '/dashboard')).toBe(
      'redirect_2fa'
    );
  });

  it('redirects authenticated users away from login and 2FA', () => {
    expect(getAuthRouteAction('authenticated', '/login')).toBe(
      'redirect_dashboard'
    );
    expect(getAuthRouteAction('authenticated', '/verify-2fa')).toBe(
      'redirect_dashboard'
    );
    expect(getAuthRouteAction('authenticated', '/dashboard')).toBe('allow');
  });
});
