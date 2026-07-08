import { NextResponse } from 'next/server';

const COOKIES_TO_CLEAR = [
  'app_session',
  'token',
  'refresh_token',
  'access_token',
  'session',
];

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  for (const name of COOKIES_TO_CLEAR) {
    res.cookies.set(name, '', { path: '/', maxAge: 0 });
  }
  return res;
}

export async function GET() {
  return POST();
}
