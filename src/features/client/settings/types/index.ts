export interface TabItem {
  value: string;
  label: string;
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
  location?: string;
  bio?: string;
  phone?: string;
  website?: string;
  size?: string;
  industry?: string;
  commercialRegister?: string;
  taxId?: string;
  domain?: string;
}

export interface ChangePasswordDto {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ChangeEmailDto {
  newEmail: string;
}

export interface VerifyOtpDto {
  otp: string;
}
