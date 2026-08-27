import { NextRequest, NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_COOKIE,
  AUTH_STATE_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from '@/features/auth/server/auth-cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FORWARDED_RESPONSE_HEADERS = [
  'content-type',
  'content-disposition',
  'content-length',
  'etag',
  'last-modified',
] as const;

async function forward(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  if (!API_URL) {
    return NextResponse.json(
      { message: 'API service is unavailable.' },
      { status: 503 }
    );
  }

  const { path } = await context.params;
  const backendUrl = new URL(
    `${API_URL.replace(/\/$/, '')}/${path.map(encodeURIComponent).join('/')}`
  );
  backendUrl.search = request.nextUrl.search;

  const headers = new Headers();
  headers.set('Accept', request.headers.get('accept') ?? 'application/json');
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  let backendResponse: Response;
  try {
    backendResponse = await fetch(backendUrl, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
      redirect: 'manual',
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach API service.' },
      { status: 502 }
    );
  }

  const responseHeaders = new Headers();
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = backendResponse.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  responseHeaders.set('Cache-Control', 'no-store');

  const response = new NextResponse(await backendResponse.arrayBuffer(), {
    status: backendResponse.status,
    headers: responseHeaders,
  });

  if (backendResponse.status === 401) {
    for (const name of [
      AUTH_STATE_COOKIE,
      ACCESS_TOKEN_COOKIE,
      REFRESH_TOKEN_COOKIE,
    ]) {
      response.cookies.set(name, '', { path: '/', maxAge: 0 });
    }
  }

  return response;
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
