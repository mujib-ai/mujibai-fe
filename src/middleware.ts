import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PREFIXES = ['/dashboard', '/admin-dashboard'] as const;

const DEFAULT_AUTH_COOKIE_NAMES = [
  'access_token',
  'token',
  'refresh_token',
  'app_session',
];

const AUTH_COOKIE_NAMES = [
  ...(process.env.AUTH_COOKIE_NAME ? [process.env.AUTH_COOKIE_NAME] : []),
  ...DEFAULT_AUTH_COOKIE_NAMES,
];

function hasAuthCookies(request: NextRequest): boolean {
  return AUTH_COOKIE_NAMES.some(name => request.cookies.has(name));
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isProtectedPath(pathname) && !hasAuthCookies(request)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin-dashboard/:path*'],
};
