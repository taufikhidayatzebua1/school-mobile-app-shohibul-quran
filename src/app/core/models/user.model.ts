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

/**
 * Kelas interface for Siswa
 */
export interface Kelas {
  id: number;
  nama: string;
  ruangan: string | null;
  tingkat: number | null;
}

/**
 * Siswa profile data
 */
export interface SiswaProfile {
  id: number;
  nis: string;
  nama: string;
  jenis_kelamin: 'L' | 'P' | null;
  jenis_kelamin_text: string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  alamat: string | null;
  no_hp: string | null;
  tahun_masuk: number | null;
  url_photo: string | null;
  url_cover: string | null;
  is_active: boolean;
  kelas: Kelas | null;
}

/**
 * Guru profile data
 */
export interface GuruProfile {
  id: number;
  nip: string | null;
  nama: string;
  jenis_kelamin: 'L' | 'P' | null;
  jenis_kelamin_text: string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  alamat: string | null;
  no_hp: string | null;
  url_photo: string | null;
  url_cover: string | null;
  is_active: boolean;
}

/**
 * Orang Tua profile data
 */
export interface OrangTuaProfile {
  id: number;
  nama: string;
  jenis_kelamin: 'L' | 'P' | null;
  jenis_kelamin_text: string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  alamat: string | null;
  no_hp: string | null;
  pendidikan: string | null;
  pekerjaan: string | null;
  penghasilan: number | null;
  penghasilan_formatted: string | null;
  url_photo: string | null;
  url_cover: string | null;
  is_active: boolean;
}

/**
 * User profile interface matching backend UserProfileResource
 * Includes role-specific data and timestamps
 */
export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
  // Role-specific data (conditional based on role)
  siswa?: SiswaProfile | null;
  guru?: GuruProfile | null;
  orang_tua?: OrangTuaProfile | null;
}

/**
 * Profile response from backend
 */
export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}
