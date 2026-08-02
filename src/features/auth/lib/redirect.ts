const ALLOWED_REDIRECT_PREFIXES = ['/dashboard'];

export function getAllowedRedirectFrom(from: string | null): string | null {
  if (!from || typeof from !== 'string') return null;
  const path = from.startsWith('/') ? from : `/${from}`;
  const isAllowed = ALLOWED_REDIRECT_PREFIXES.some(
    prefix => path === prefix || path.startsWith(`${prefix}/`)
  );
  return isAllowed ? path : null;
}
