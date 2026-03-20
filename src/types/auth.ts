export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
}

export enum VendorStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  isActive: boolean;
}

export interface AuthSession {
  user: AuthUser;
  iat: number;
  exp: number;
  jti: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}
