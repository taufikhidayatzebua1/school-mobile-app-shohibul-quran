/**
 * User roles available in the system
 * Must match backend enum values
 */
export type UserRole = 
  | 'siswa'
  | 'orang-tua'
  | 'guru'
  | 'wali-kelas'
  | 'kepala-sekolah'
  | 'tata-usaha'
  | 'yayasan'
  | 'admin'
  | 'super-admin';

/**
 * User interface matching backend UserResource
 * Fields returned from API login/profile endpoints
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  // Note: created_at and updated_at are NOT returned by UserResource
  // They are excluded for lighter API responses
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response from backend
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;
    token_type: 'Bearer';
    expires_at: string | null;
  };
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

/**
 * User registration request (admin only)
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: UserRole;
  username?: string;
  is_active?: boolean;
}

/**
 * Forgot password request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Reset password request
 */
export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}
