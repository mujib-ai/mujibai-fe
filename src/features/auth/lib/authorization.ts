export interface TenantSession {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface AuthorizationSubject {
  role?: string;
  permissions?: readonly string[];
}

export function can(
  subject: AuthorizationSubject | null | undefined,
  permission: string
): boolean {
  return subject?.permissions?.includes(permission) === true;
}

export function hasRole(
  subject: AuthorizationSubject | null | undefined,
  role: string
): boolean {
  return subject?.role === role;
}
