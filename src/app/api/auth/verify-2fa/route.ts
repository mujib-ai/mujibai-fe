import { NextRequest, NextResponse } from 'next/server';

import { getAllowedRedirectFrom } from '@/features/auth/lib/redirect';
import {
  ACCESS_TOKEN_COOKIE,
  AUTHENTICATED_MAX_AGE_SECONDS,
  AUTH_STATE_COOKIE,
  REFRESH_TOKEN_COOKIE,
  TWO_FACTOR_REDIRECT_COOKIE,
  TWO_FACTOR_TOKEN_COOKIE,
} from '@/features/auth/server/auth-cookies';
import { createAuthenticationState } from '@/features/auth/server/auth-state';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const VERIFY_PATH = process.env.TENANT_2FA_VERIFY_PATH ?? '/tenants/login/2fa';
const secure = process.env.NODE_ENV === 'production';

interface BackendVerificationResponse {
  message?: string;
  detail?: string;
  accessToken?: string;
  refreshToken?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    [key: string]: unknown;
  } | null;
}

function clearPendingCookies(response: NextResponse): void {
  for (const name of [
    TWO_FACTOR_TOKEN_COOKIE,
    TWO_FACTOR_REDIRECT_COOKIE,
    AUTH_STATE_COOKIE,
  ]) {
    response.cookies.set(name, '', { path: '/', maxAge: 0 });
  }
}

function temporaryTokenIsInvalid(
  status: number,
  response: BackendVerificationResponse | undefined
): boolean {
  const message = response?.detail ?? response?.message ?? '';
  return (
    status === 410 ||
    message === 'Invalid or expired 2FA session. Please log in again.' ||
    message === 'Too many failed 2FA attempts. Please log in again.' ||
    /(?:temporary|two[- ]factor).*token.*(?:expired|invalid|reused)|(?:expired|invalid|reused).*(?:temporary|two[- ]factor).*token/i.test(
      message
    )
  );
}

export async function POST(request: NextRequest) {
  if (!API_URL) {
    return NextResponse.json(
      { message: 'Authentication service is unavailable.' },
      { status: 503 }
    );
  }

  const twoFactorToken = request.cookies.get(TWO_FACTOR_TOKEN_COOKIE)?.value;
  if (!twoFactorToken) {
    const response = NextResponse.json(
      {
        message: 'Your verification session has expired.',
        reauthenticate: true,
      },
      { status: 401 }
    );
    clearPendingCookies(response);
    return response;
  }

  let body: { code?: unknown };
  try {
    body = (await request.json()) as { code?: unknown };
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  if (typeof body.code !== 'string' || !/^\d{6}$/.test(body.code)) {
    return NextResponse.json(
      { message: 'Enter a valid six-digit code.' },
      { status: 400 }
    );
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(
      `${API_URL.replace(/\/$/, '')}${VERIFY_PATH.startsWith('/') ? VERIFY_PATH : `/${VERIFY_PATH}`}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ code: body.code, twoFactorToken }),
        cache: 'no-store',
      }
    );
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach authentication service.' },
      { status: 502 }
    );
  }

  const responseData = (await backendResponse.json().catch(() => ({}))) as
    | BackendVerificationResponse
    | undefined;

  if (!backendResponse.ok) {
    const reauthenticate = temporaryTokenIsInvalid(
      backendResponse.status,
      responseData
    );
    const response = NextResponse.json(
      {
        message:
          responseData?.detail ??
          responseData?.message ??
          'Unable to verify the authentication code.',
        reauthenticate,
      },
      { status: backendResponse.status }
    );
    if (reauthenticate) clearPendingCookies(response);
    return response;
  }

  const accessToken =
    responseData?.accessToken ?? responseData?.data?.accessToken;
  const refreshToken =
    responseData?.refreshToken ?? responseData?.data?.refreshToken;
  if (!accessToken) {
    return NextResponse.json(
      { message: 'Verification response did not include a session.' },
      { status: 502 }
    );
  }

  let meResponse: Response;
  try {
    meResponse = await fetch(`${API_URL.replace(/\/$/, '')}/tenants/me`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to validate the authenticated session.' },
      { status: 502 }
    );
  }

  if (!meResponse.ok) {
    return NextResponse.json(
      { message: 'Unable to validate the authenticated session.' },
      { status: 401 }
    );
  }

  const tenant = await meResponse.json().catch(() => null);
  const requestedRedirect = request.cookies.get(
    TWO_FACTOR_REDIRECT_COOKIE
  )?.value;
  const redirectTo =
    getAllowedRedirectFrom(requestedRedirect ?? null) ?? '/dashboard';

  let signedState: string;
  try {
    signedState = await createAuthenticationState(
      'authenticated',
      AUTHENTICATED_MAX_AGE_SECONDS
    );
  } catch {
    return NextResponse.json(
      { message: 'Authentication service is not configured.' },
      { status: 500 }
    );
  }

  const response = NextResponse.json({
    message: responseData?.message,
    data: tenant,
    redirectTo,
  });
  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: AUTHENTICATED_MAX_AGE_SECONDS,
  });
  if (refreshToken) {
    response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  response.cookies.set(AUTH_STATE_COOKIE, signedState, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: AUTHENTICATED_MAX_AGE_SECONDS,
  });
  response.cookies.set(TWO_FACTOR_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
  response.cookies.set(TWO_FACTOR_REDIRECT_COOKIE, '', {
    path: '/',
    maxAge: 0,
  });
  return response;
}
