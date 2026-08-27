export type AuthenticationState =
  | 'unauthenticated'
  | 'pending_2fa'
  | 'authenticated';

const encoder = new TextEncoder();

function getSigningSecret(): string | null {
  return process.env.AUTH_STATE_SECRET ?? process.env.NEXTAUTH_SECRET ?? null;
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(value)
  );
  return Array.from(new Uint8Array(signature), byte =>
    byte.toString(16).padStart(2, '0')
  ).join('');
}

function safeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export async function createAuthenticationState(
  state: Exclude<AuthenticationState, 'unauthenticated'>,
  maxAgeSeconds: number
): Promise<string> {
  const secret = getSigningSecret();
  if (!secret) throw new Error('AUTH_STATE_SECRET is not configured');

  const expiresAt = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload = `${state}.${expiresAt}`;
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifyAuthenticationState(
  value: string | undefined
): Promise<AuthenticationState> {
  if (!value) return 'unauthenticated';
  const secret = getSigningSecret();
  if (!secret) return 'unauthenticated';

  const [state, expiresAtValue, signature, ...rest] = value.split('.');
  if (rest.length > 0 || !state || !expiresAtValue || !signature) {
    return 'unauthenticated';
  }
  if (state !== 'pending_2fa' && state !== 'authenticated') {
    return 'unauthenticated';
  }

  const expiresAt = Number(expiresAtValue);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() / 1000) {
    return 'unauthenticated';
  }

  const expectedSignature = await sign(`${state}.${expiresAtValue}`, secret);
  return safeEqual(signature, expectedSignature) ? state : 'unauthenticated';
}
