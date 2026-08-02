import type { LoginCredentials } from '../types';

interface PendingTwoFactorLogin {
  credentials: Omit<LoginCredentials, 'code'>;
  destination: string;
  createdAt: number;
}

const PENDING_LOGIN_TTL_MS = 5 * 60 * 1000;
let pendingLogin: PendingTwoFactorLogin | null = null;

export function setPendingTwoFactorLogin(
  credentials: Omit<LoginCredentials, 'code'>,
  destination: string
): void {
  pendingLogin = { credentials, destination, createdAt: Date.now() };
}

export function getPendingTwoFactorLogin(): PendingTwoFactorLogin | null {
  if (
    !pendingLogin ||
    Date.now() - pendingLogin.createdAt > PENDING_LOGIN_TTL_MS
  ) {
    pendingLogin = null;
    return null;
  }
  return pendingLogin;
}

export function clearPendingTwoFactorLogin(): void {
  pendingLogin = null;
}
