export type UserRole = 'ADMIN' | 'CLIENT';

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  logoUrl?: string;
  phone?: string;
  address?: string;
  description?: string;
  website?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  browserNotifications?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  phone?: string;
  address?: string;
  preferences: import('./settings').UserPreferences;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: 'admin' | 'user' | 'client';
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  logoUrl?: string;
  role?: 'admin' | 'user' | 'client';
  isActive?: boolean;
}

export interface UserFilters {
  search?: string;
  role?: 'admin' | 'user' | 'client';
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedUsersResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
