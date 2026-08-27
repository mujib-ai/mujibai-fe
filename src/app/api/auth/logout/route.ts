import { NextResponse } from 'next/server';

import { AUTH_COOKIE_NAMES } from '@/features/auth/server/auth-cookies';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  for (const name of AUTH_COOKIE_NAMES) {
    response.cookies.set(name, '', { path: '/', maxAge: 0 });
  }
  return response;
}

export async function GET() {
  return POST();
}
