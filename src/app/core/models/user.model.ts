export interface User {
  id: number;
  user_id: string;
  name: string;
  email: string;
  username: string;
  role: 'admin' | 'kepala_sekolah' | 'guru' | 'orang_tua' | 'siswa';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}
