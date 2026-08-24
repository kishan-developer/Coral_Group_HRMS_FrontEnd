export type UserRole = 'superadmin' | 'hr_manager' | 'accounts' | 'support' | 'employee';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  employeeId?: string;
  employeeCode?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  avatar?: string;
  isActive?: boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
  registrationStep: number;
  registrationEmail: string | null;
}

export interface LoginPayload {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

export interface CompleteRegistrationPayload {
  email: string;
  otp: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword?: string;
  confirmPassword?: string;
}
