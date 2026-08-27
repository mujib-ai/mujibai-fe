import { NextRequest, NextResponse } from 'next/server';

import { getAllowedRedirectFrom } from '@/features/auth/lib/redirect';
import {
  ACCESS_TOKEN_COOKIE,
  AUTHENTICATED_MAX_AGE_SECONDS,
  AUTH_STATE_COOKIE,
  PENDING_TWO_FACTOR_MAX_AGE_SECONDS,
  REFRESH_TOKEN_COOKIE,
  TWO_FACTOR_REDIRECT_COOKIE,
  TWO_FACTOR_TOKEN_COOKIE,
} from '@/features/auth/server/auth-cookies';
import { createAuthenticationState } from '@/features/auth/server/auth-state';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginRequestBody {
  email?: unknown;
  password?: unknown;
}

interface BackendLoginResponse {
  message?: string;
  detail?: string;
  requires2FA?: boolean;
  twoFactorToken?: string;
  accessToken?: string;
  refreshToken?: string;
  data?: {
    requires2FA?: boolean;
    twoFactorToken?: string;
    accessToken?: string;
    refreshToken?: string;
    [key: string]: unknown;
  } | null;
}

const secure = process.env.NODE_ENV === 'production';

function clearCookie(response: NextResponse, name: string): void {
  response.cookies.set(name, '', { path: '/', maxAge: 0 });
}

export async function POST(request: NextRequest) {
  if (!API_URL) {
    return NextResponse.json(
      { message: 'Authentication service is unavailable.' },
      { status: 503 }
    );
  }

  let body: LoginRequestBody;
  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  if (typeof body.email !== 'string' || typeof body.password !== 'string') {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  const referer = request.headers.get('referer');
  let redirectTo: string | null = null;
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.origin === request.nextUrl.origin) {
        redirectTo = getAllowedRedirectFrom(
          refererUrl.searchParams.get('from')
        );
      }
    } catch {
      redirectTo = null;
    }
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(
      `${API_URL.replace(/\/$/, '')}/tenants/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: body.email, password: body.password }),
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
    | BackendLoginResponse
    | undefined;

  if (!backendResponse.ok) {
    return NextResponse.json(
      {
        message:
          responseData?.detail ??
          responseData?.message ??
          'Unable to sign in with those credentials.',
      },
      { status: backendResponse.status }
    );
  }

  const requiresTwoFactor =
    responseData?.requires2FA === true ||
    responseData?.data?.requires2FA === true;

  if (requiresTwoFactor) {
    const twoFactorToken =
      responseData?.twoFactorToken ?? responseData?.data?.twoFactorToken;
    if (!twoFactorToken) {
      return NextResponse.json(
        { message: 'Unable to start two-factor verification.' },
        { status: 502 }
      );
    }

    let signedState: string;
    try {
      signedState = await createAuthenticationState(
        'pending_2fa',
        PENDING_TWO_FACTOR_MAX_AGE_SECONDS
      );
    } catch {
      return NextResponse.json(
        { message: 'Authentication service is not configured.' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      requires2FA: true,
      message: responseData?.message,
    });
    response.cookies.set(TWO_FACTOR_TOKEN_COOKIE, twoFactorToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: PENDING_TWO_FACTOR_MAX_AGE_SECONDS,
    });
    response.cookies.set(
      TWO_FACTOR_REDIRECT_COOKIE,
      redirectTo ?? '/dashboard',
      {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge: PENDING_TWO_FACTOR_MAX_AGE_SECONDS,
      }
    );
    response.cookies.set(AUTH_STATE_COOKIE, signedState, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: PENDING_TWO_FACTOR_MAX_AGE_SECONDS,
    });
    clearCookie(response, ACCESS_TOKEN_COOKIE);
    clearCookie(response, REFRESH_TOKEN_COOKIE);
    return response;
  }

  const accessToken =
    responseData?.accessToken ?? responseData?.data?.accessToken;
  const refreshToken =
    responseData?.refreshToken ?? responseData?.data?.refreshToken;
  if (!accessToken) {
    return NextResponse.json(
      { message: 'Authentication response did not include a session.' },
      { status: 502 }
    );
  }

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
    requires2FA: false,
    message: responseData?.message,
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
  clearCookie(response, TWO_FACTOR_TOKEN_COOKIE);
  clearCookie(response, TWO_FACTOR_REDIRECT_COOKIE);
  return response;
}
