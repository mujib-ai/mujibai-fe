import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mirrorCookieForAppDomain(setCookieValue: string): string {
  const parts = setCookieValue.split(';').map(p => p.trim());
  const nameValue = parts[0];
  if (!nameValue || !nameValue.includes('=')) return '';

  const safeParts = ['Path=/', 'SameSite=Lax'];
  const hasHttpOnly = parts.some(p => p.toLowerCase() === 'httponly');
  if (hasHttpOnly) safeParts.push('HttpOnly');
  const maxAge = parts.find(p => p.toLowerCase().startsWith('max-age='));
  if (maxAge) safeParts.push(maxAge);
  const expires = parts.find(p => p.toLowerCase().startsWith('expires='));
  if (expires) safeParts.push(expires);

  return [nameValue, ...safeParts].join('; ');
}

export async function POST(request: NextRequest) {
  if (!API_URL) {
    return NextResponse.json(
      { message: 'Server misconfiguration: API URL not set' },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const backendUrl = `${API_URL.replace(/\/$/, '')}/tenants/login`;
  let backendRes: Response;
  try {
    backendRes = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('Login proxy error:', err);
    return NextResponse.json(
      { message: 'Unable to reach auth service' },
      { status: 502 }
    );
  }

  const responseData = await backendRes.json().catch(() => ({}));
  const status = backendRes.status;

  const nextRes = NextResponse.json(responseData, { status });

  const getSetCookie = (headers: Headers): string[] => {
    if (
      'getSetCookie' in headers &&
      typeof (headers as Headers & { getSetCookie?: () => string[] })
        .getSetCookie === 'function'
    ) {
      return (
        headers as Headers & { getSetCookie: () => string[] }
      ).getSetCookie();
    }
    const single = headers.get('set-cookie');
    return single ? [single] : [];
  };

  const setCookieValues = getSetCookie(backendRes.headers);
  const isSuccess = status >= 200 && status < 300;

  if (isSuccess) {
    const data = responseData?.data;
    if (data?.accessToken) {
      nextRes.cookies.set('access_token', data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }
    if (data?.refreshToken) {
      nextRes.cookies.set('refresh_token', data.refreshToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    if (setCookieValues.length === 0 && !data?.accessToken) {
      nextRes.cookies.set('app_session', 'authenticated', {
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
        httpOnly: true,
      });
    }
    if (setCookieValues.length > 0) {
      for (const raw of setCookieValues) {
        const mirrored = mirrorCookieForAppDomain(raw);
        if (mirrored) {
          const [nameValue] = mirrored.split(';');
          const eq = nameValue.indexOf('=');
          const name = nameValue.slice(0, eq).trim();
          const value = nameValue.slice(eq + 1).trim();
          nextRes.cookies.set(name, value, {
            path: '/',
            sameSite: 'lax',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      }
      for (const raw of setCookieValues) {
        nextRes.headers.append('Set-Cookie', raw);
      }
    }
  }

  return nextRes;
}
