import { NextRequest } from 'next/server';

import { beforeEach, describe, expect, it, vi } from 'vitest';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('tenant authentication route handlers', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.example.test');
    vi.stubEnv('AUTH_STATE_SECRET', 'test-secret-with-enough-entropy');
    vi.stubGlobal('fetch', vi.fn());
  });

  it('creates an authenticated HttpOnly session without exposing the token', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({
        message: 'Logged in successfully.',
        data: { accessToken: 'real-access-token' },
      })
    );
    const { POST } = await import('@/app/api/auth/login/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'tenant@example.com',
          password: 'password',
        }),
      })
    );

    expect(await response.json()).toMatchObject({ requires2FA: false });
    expect(response.headers.get('set-cookie')).toContain(
      'access_token=real-access-token'
    );
    expect(response.headers.get('set-cookie')).toContain('HttpOnly');
  });

  it('stores a temporary token only in an HttpOnly cookie when 2FA is required', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({
        message: 'A 2FA code is required to complete login.',
        data: { requires2FA: true, twoFactorToken: 'temporary-token' },
      })
    );
    const { POST } = await import('@/app/api/auth/login/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          Referer: 'http://localhost/login?from=%2Fdashboard%2Fsettings',
        },
        body: JSON.stringify({
          email: 'tenant@example.com',
          password: 'password',
        }),
      })
    );
    const body = await response.json();

    expect(body).toMatchObject({ requires2FA: true });
    expect(vi.mocked(fetch).mock.calls[0]?.[1]?.body).toBe(
      JSON.stringify({ email: 'tenant@example.com', password: 'password' })
    );
    expect(JSON.stringify(body)).not.toContain('temporary-token');
    expect(response.headers.get('set-cookie')).toContain(
      'two_factor_token=temporary-token'
    );
    expect(response.headers.get('set-cookie')).toContain('HttpOnly');
  });

  it('verifies 2FA, validates /tenants/me, and replaces temporary cookies', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        jsonResponse({
          accessToken: 'real-token',
          refreshToken: 'refresh-token',
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({ data: { id: 'tenant-1', role: 'admin' } })
      );
    const { POST } = await import('@/app/api/auth/verify-2fa/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/verify-2fa', {
        method: 'POST',
        headers: {
          Cookie:
            'two_factor_token=temporary-token; two_factor_redirect=%2Fdashboard%2Fsettings',
        },
        body: JSON.stringify({ code: '123456' }),
      })
    );
    const body = await response.json();

    expect(body.redirectTo).toBe('/dashboard/settings');
    expect(response.headers.get('set-cookie')).toContain(
      'access_token=real-token'
    );
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(2);
  });

  it('keeps the challenge for an incorrect code', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({ message: 'The provided 2FA code is invalid.' }, 401)
    );
    const { POST } = await import('@/app/api/auth/verify-2fa/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/verify-2fa', {
        method: 'POST',
        headers: { Cookie: 'two_factor_token=temporary-token' },
        body: JSON.stringify({ code: '000000' }),
      })
    );

    expect(await response.json()).toMatchObject({ reauthenticate: false });
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('requires a new login when the 2FA screen has no pending token', async () => {
    const { POST } = await import('@/app/api/auth/verify-2fa/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/verify-2fa', {
        method: 'POST',
        body: JSON.stringify({ code: '123456' }),
      })
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toMatchObject({ reauthenticate: true });
  });

  it('preserves the pending challenge after too many verification attempts', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse(
        { message: 'Too many requests. Please try again later.' },
        429
      )
    );
    const { POST } = await import('@/app/api/auth/verify-2fa/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/verify-2fa', {
        method: 'POST',
        headers: { Cookie: 'two_factor_token=temporary-token' },
        body: JSON.stringify({ code: '123456' }),
      })
    );

    expect(response.status).toBe(429);
    expect(await response.json()).toMatchObject({ reauthenticate: false });
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('forces a fresh login after the five-attempt 2FA lockout', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse(
        { message: 'Too many failed 2FA attempts. Please log in again.' },
        429
      )
    );
    const { POST } = await import('@/app/api/auth/verify-2fa/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/verify-2fa', {
        method: 'POST',
        headers: { Cookie: 'two_factor_token=locked-token' },
        body: JSON.stringify({ code: '123456' }),
      })
    );

    expect(await response.json()).toMatchObject({ reauthenticate: true });
    expect(response.headers.get('set-cookie')).toContain('two_factor_token=;');
  });

  it('clears temporary state for an expired or reused token', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse(
        {
          message: 'Invalid or expired 2FA session. Please log in again.',
        },
        401
      )
    );
    const { POST } = await import('@/app/api/auth/verify-2fa/route');
    const response = await POST(
      new NextRequest('http://localhost/api/auth/verify-2fa', {
        method: 'POST',
        headers: { Cookie: 'two_factor_token=expired-token' },
        body: JSON.stringify({ code: '123456' }),
      })
    );

    expect(await response.json()).toMatchObject({ reauthenticate: true });
    expect(response.headers.get('set-cookie')).toContain('two_factor_token=;');
  });

  it('clears real and temporary cookies on logout', async () => {
    const { POST } = await import('@/app/api/auth/logout/route');
    const response = await POST();
    const cookies = response.headers.get('set-cookie');

    expect(cookies).toContain('access_token=;');
    expect(cookies).toContain('two_factor_token=;');
    expect(cookies).toContain('tenant_auth_state=;');
  });
});
