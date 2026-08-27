export const PROTECTED_ROUTE_PREFIXES = [
  '/dashboard',
  '/settings',
  '/billing',
  '/profile',
  '/tenant-management',
] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function getAllowedRedirectFrom(from: string | null): string | null {
  if (!from || typeof from !== 'string' || !from.startsWith('/')) return null;
  if (from.startsWith('//') || from.includes('\\')) return null;

  try {
    const url = new URL(from, 'https://internal.invalid');
    if (url.origin !== 'https://internal.invalid') return null;
    return isProtectedPath(url.pathname)
      ? `${url.pathname}${url.search}${url.hash}`
      : null;
  } catch {
    return null;
  }
}
