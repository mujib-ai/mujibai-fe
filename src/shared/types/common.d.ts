export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface TabItem {
  value: string;
  label: string;
}

export interface MenuItem {
  key: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read?: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

export interface AuditTrail {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  oldValue?: any;
  newValue?: any;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}
