# User Model Documentation

## Overview
Model `User` dan interface terkait di frontend sekarang **100% sesuai** dengan backend Laravel API.

## Changes Made

### ❌ Removed Fields
Fields yang TIDAK dikembalikan oleh backend (UserResource):

- `user_id` - Field ini tidak ada di database/response
- `created_at` - Dihapus dari response untuk performa
- `updated_at` - Dihapus dari response untuk performa

### ✅ Updated Fields

#### User Interface
```typescript
export interface User {
  id: number;           // ✅ Primary key
  name: string;         // ✅ Full name
  username: string;     // ✅ Unique username
  email: string;        // ✅ Email address
  role: UserRole;       // ✅ User role (typed)
  is_active: boolean;   // ✅ Account status
}
```

#### Roles
Updated to match backend enum exactly (with hyphens, not underscores):

```typescript
export type UserRole = 
  | 'siswa'           // Student
  | 'orang-tua'       // Parent
  | 'guru'            // Teacher
  | 'wali-kelas'      // Homeroom teacher
  | 'kepala-sekolah'  // Principal
  | 'tata-usaha'      // Administration staff
  | 'yayasan'         // Foundation
  | 'admin'           // Admin
  | 'super-admin';    // Super admin
```

**Important:** Backend uses **hyphens** (`orang-tua`, `kepala-sekolah`), not underscores!

#### Login Response
Updated to match actual backend response:

```typescript
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;      // ✅ Changed from 'token'
    token_type: 'Bearer';      // ✅ Added
    expires_at: string | null; // ✅ Added
  };
}
```

### 🆕 Added Interfaces

#### RegisterRequest
```typescript
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: UserRole;
  username?: string;        // Optional
  is_active?: boolean;      // Optional (default: true)
}
```

#### ForgotPasswordRequest
```typescript
export interface ForgotPasswordRequest {
  email: string;
}
```

#### ResetPasswordRequest
```typescript
export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}
```

## Backend API Response Structure

### Login Success Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "siswa",
      "is_active": true
    },
    "access_token": "1|AbCdEf...",
    "token_type": "Bearer",
    "expires_at": "2025-10-21T10:30:00.000000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid login credentials"
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified_at TIMESTAMP NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM(
    'siswa',
    'orang-tua',
    'guru',
    'wali-kelas',
    'kepala-sekolah',
    'tata-usaha',
    'yayasan',
    'admin',
    'super-admin'
  ) DEFAULT 'siswa',
  is_active BOOLEAN DEFAULT TRUE,
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);
```

**Note:** `created_at` and `updated_at` exist in database but are NOT returned in API responses (for performance).

## Role Hierarchy

### Permission Levels (Highest to Lowest)
1. **super-admin** - Full system access
2. **admin** - Admin access
3. **yayasan** - Foundation management
4. **tata-usaha** - Can register new users
5. **kepala-sekolah** - Principal
6. **wali-kelas** - Homeroom teacher
7. **guru** - Teacher
8. **orang-tua** - Parent
9. **siswa** - Student (default role)

### Role Descriptions

| Role | Indonesian | Description |
|------|-----------|-------------|
| `super-admin` | Super Admin | Highest privilege level |
| `admin` | Administrator | System administrator |
| `yayasan` | Yayasan | Foundation management |
| `tata-usaha` | Tata Usaha | Administration staff, can register users |
| `kepala-sekolah` | Kepala Sekolah | School principal |
| `wali-kelas` | Wali Kelas | Homeroom teacher |
| `guru` | Guru | Teacher |
| `orang-tua` | Orang Tua | Parent/Guardian |
| `siswa` | Siswa | Student (default) |

## Usage Examples

### Type-Safe Role Checking
```typescript
import { User, UserRole } from '@core/models/user.model';

// Type-safe role checking
const user: User = getCurrentUser();

// Check specific role
if (user.role === 'siswa') {
  console.log('User is a student');
}

// Check multiple roles
const teacherRoles: UserRole[] = ['guru', 'wali-kelas'];
if (teacherRoles.includes(user.role)) {
  console.log('User is a teacher');
}

// Check admin roles
const adminRoles: UserRole[] = ['admin', 'super-admin', 'tata-usaha'];
if (adminRoles.includes(user.role)) {
  console.log('User has admin privileges');
}
```

### Role Display Names
```typescript
const roleNames: Record<UserRole, string> = {
  'siswa': 'Siswa',
  'orang-tua': 'Orang Tua',
  'guru': 'Guru',
  'wali-kelas': 'Wali Kelas',
  'kepala-sekolah': 'Kepala Sekolah',
  'tata-usaha': 'Tata Usaha',
  'yayasan': 'Yayasan',
  'admin': 'Administrator',
  'super-admin': 'Super Admin'
};

function getRoleDisplayName(role: UserRole): string {
  return roleNames[role];
}
```

### Login Flow
```typescript
const credentials: LoginRequest = {
  email: 'user@example.com',
  password: 'password123'
};

authService.login(credentials).subscribe({
  next: (response: LoginResponse) => {
    if (response.success) {
      const user = response.data.user;
      const token = response.data.access_token;
      const expiresAt = response.data.expires_at;
      
      console.log('Logged in as:', user.name);
      console.log('Role:', user.role);
      console.log('Token expires:', expiresAt);
    }
  },
  error: (error) => {
    console.error('Login failed:', error.message);
  }
});
```

## Best Practices ✅

### 1. Type Safety
```typescript
// ✅ Good - Type-safe
const role: UserRole = 'siswa';

// ❌ Bad - Allows typos
const role: string = 'siwa'; // Typo!
```

### 2. Role Checking
```typescript
// ✅ Good - Explicit check
if (user.role === 'guru' || user.role === 'wali-kelas') {
  // Teacher logic
}

// ✅ Better - Array includes
const teacherRoles: UserRole[] = ['guru', 'wali-kelas'];
if (teacherRoles.includes(user.role)) {
  // Teacher logic
}
```

### 3. Don't Assume Fields Exist
```typescript
// ❌ Bad - Assumes created_at exists
console.log(user.created_at); // Error! Field doesn't exist

// ✅ Good - Use only defined fields
console.log(user.name, user.email, user.role);
```

### 4. Handle Optional Fields
```typescript
// Registration with optional fields
const registerData: RegisterRequest = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirmation: 'password123',
  role: 'siswa',
  username: 'johndoe',     // Optional
  is_active: true          // Optional
};
```

## Common Pitfalls to Avoid

### ❌ Using Underscores Instead of Hyphens
```typescript
// ❌ Wrong - Backend uses hyphens!
if (user.role === 'orang_tua') { ... }
if (user.role === 'kepala_sekolah') { ... }

// ✅ Correct - Use hyphens
if (user.role === 'orang-tua') { ... }
if (user.role === 'kepala-sekolah') { ... }
```

### ❌ Accessing Non-Existent Fields
```typescript
// ❌ Wrong - These fields don't exist in API response
console.log(user.user_id);
console.log(user.created_at);
console.log(user.updated_at);

// ✅ Correct - Use only defined fields
console.log(user.id);          // Primary key
console.log(user.name);
console.log(user.is_active);
```

### ❌ Wrong Token Field
```typescript
// ❌ Wrong - Old field name
const token = response.data.token;

// ✅ Correct - New field name
const token = response.data.access_token;
```

## Testing

### Mock User Data
```typescript
const mockUser: User = {
  id: 1,
  name: 'Test User',
  username: 'testuser',
  email: 'test@example.com',
  role: 'siswa',
  is_active: true
};

const mockLoginResponse: LoginResponse = {
  success: true,
  message: 'Login successful',
  data: {
    user: mockUser,
    access_token: '1|mock-token-string',
    token_type: 'Bearer',
    expires_at: '2025-10-21T10:30:00.000000Z'
  }
};
```

## Migration Guide

### If You Have Old Code

Replace:
- `user.user_id` → `user.id`
- `user.created_at` → Remove (not available)
- `user.updated_at` → Remove (not available)
- `response.data.token` → `response.data.access_token`
- Role `'kepala_sekolah'` → `'kepala-sekolah'` (hyphen!)
- Role `'orang_tua'` → `'orang-tua'` (hyphen!)

## Summary

✅ **Model is now 100% accurate** with backend
✅ **All roles match** database enum
✅ **Type-safe** with TypeScript
✅ **No missing/extra fields**
✅ **Best practices implemented**
✅ **Comprehensive documentation**

The user model is now production-ready and will not cause any type errors! 🎉
