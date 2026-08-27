import type { AuthenticationState } from '../server/auth-state';
import { isProtectedPath } from './redirect';

export type AuthRouteAction =
  | 'allow'
  | 'redirect_login'
  | 'redirect_2fa'
  | 'redirect_dashboard';

export function getAuthRouteAction(
  state: AuthenticationState,
  pathname: string
): AuthRouteAction {
  const isLoginRoute = pathname === '/login';
  const isTwoFactorRoute = pathname === '/verify-2fa';
  const isProtectedRoute = isProtectedPath(pathname);

  if (state === 'unauthenticated') {
    if (isTwoFactorRoute || isProtectedRoute) return 'redirect_login';
    return 'allow';
  }

  if (state === 'pending_2fa') {
    if (isTwoFactorRoute) return 'allow';
    if (isLoginRoute || isProtectedRoute) return 'redirect_2fa';
    return 'allow';
  }

  if (isLoginRoute || isTwoFactorRoute) return 'redirect_dashboard';
  return 'allow';
}
