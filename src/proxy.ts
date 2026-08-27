import { NextRequest, NextResponse } from 'next/server';

import { getAuthRouteAction } from '@/features/auth/lib/auth-routing';
import { isProtectedPath } from '@/features/auth/lib/redirect';
import {
  ACCESS_TOKEN_COOKIE,
  AUTH_STATE_COOKIE,
  TWO_FACTOR_TOKEN_COOKIE,
} from '@/features/auth/server/auth-cookies';
import { verifyAuthenticationState } from '@/features/auth/server/auth-state';

const TWO_FACTOR_ROUTE = '/verify-2fa';

function redirect(request: NextRequest, pathname: string): NextResponse {
  return NextResponse.redirect(new URL(pathname, request.url));
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const signedState = await verifyAuthenticationState(
    request.cookies.get(AUTH_STATE_COOKIE)?.value
  );
  const state =
    signedState === 'pending_2fa' &&
    !request.cookies.has(TWO_FACTOR_TOKEN_COOKIE)
      ? 'unauthenticated'
      : signedState === 'authenticated' &&
          !request.cookies.has(ACCESS_TOKEN_COOKIE)
        ? 'unauthenticated'
        : signedState;

  const action = getAuthRouteAction(state, pathname);
  if (action === 'redirect_login') {
    const loginUrl = new URL('/login', request.url);
    if (isProtectedPath(pathname)) {
      loginUrl.searchParams.set('from', `${pathname}${request.nextUrl.search}`);
    }
    return NextResponse.redirect(loginUrl);
  }
  if (action === 'redirect_2fa') return redirect(request, TWO_FACTOR_ROUTE);
  if (action === 'redirect_dashboard') return redirect(request, '/dashboard');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/verify-2fa',
    '/dashboard/:path*',
    '/settings/:path*',
    '/billing/:path*',
    '/profile/:path*',
    '/tenant-management/:path*',
  ],
};
