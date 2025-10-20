# API Integration Guide

Dokumentasi untuk integrasi dengan backend `sq-backend`.

## 🔌 Base Configuration

### Environment Setup

**Development** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost/sq-backend/public/api/v1',
  apiVersion: 'v1'
};
```

**Production** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-domain.com/api/v1',
  apiVersion: 'v1'
};
```

## 🔐 Authentication Endpoints

### 1. Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "user_id": "USR-001",
      "name": "John Doe",
      "email": "john@example.com",
      "username": "john",
      "role": "guru",
      "is_active": true
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Usage in Service:**
```typescript
login(credentials: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
    `${environment.apiUrl}/auth/login`,
    credentials
  );
}
```

### 2. Logout
```
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 3. Forgot Password
```
POST /auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

### 4. Reset Password
```
POST /auth/reset-password
```

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "email": "user@example.com",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

## 👤 User Endpoints

### Get User Profile
```
GET /user/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": "USR-001",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "john",
    "role": "guru",
    "is_active": true
  }
}
```

## 📚 Service Implementation Examples

### Auth Service Pattern

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      credentials
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  getUserProfile(): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/user/profile`)
      .pipe(map(response => response.data));
  }
}
```

### Generic API Service Pattern

```typescript
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // GET request
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${endpoint}`, { params });
  }

  // POST request
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${endpoint}`, body);
  }

  // PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}${endpoint}`, body);
  }

  // DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${endpoint}`);
  }
}
```

## 🛡️ Error Handling

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["Validation error message"]
  }
}
```

### Interceptor Error Handling

```typescript
catchError((error: HttpErrorResponse) => {
  if (error.status === 401) {
    // Unauthorized - logout and redirect
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  if (error.status === 422) {
    // Validation error
    console.error('Validation errors:', error.error.errors);
  }

  if (error.status === 500) {
    // Server error
    console.error('Server error:', error.message);
  }

  return throwError(() => error);
})
```

## 📊 Future Endpoints (To Be Implemented)

### Hafalan Management
```
GET    /hafalan                    # List hafalan
POST   /hafalan                    # Create hafalan
GET    /hafalan/{id}               # Get hafalan detail
PUT    /hafalan/{id}               # Update hafalan
DELETE /hafalan/{id}               # Delete hafalan
```

### Siswa Management
```
GET    /siswa                      # List siswa
POST   /siswa                      # Create siswa
GET    /siswa/{id}                 # Get siswa detail
PUT    /siswa/{id}                 # Update siswa
DELETE /siswa/{id}                 # Delete siswa
```

### Guru Management
```
GET    /guru                       # List guru
POST   /guru                       # Create guru
GET    /guru/{id}                  # Get guru detail
PUT    /guru/{id}                  # Update guru
DELETE /guru/{id}                  # Delete guru
```

### Kelas Management
```
GET    /kelas                      # List kelas
POST   /kelas                      # Create kelas
GET    /kelas/{id}                 # Get kelas detail
PUT    /kelas/{id}                 # Update kelas
DELETE /kelas/{id}                 # Delete kelas
```

## 🔄 Pagination Pattern

```typescript
interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
```

**Usage:**
```typescript
getHafalanList(page: number = 1): Observable<PaginatedResponse<Hafalan>> {
  return this.http.get<PaginatedResponse<Hafalan>>(
    `${environment.apiUrl}/hafalan?page=${page}`
  );
}
```

## 🔍 Filtering & Searching

```typescript
// With query parameters
searchSiswa(params: {
  search?: string;
  kelas_id?: number;
  tahun_ajaran_id?: number;
}): Observable<ApiResponse<Siswa[]>> {
  let httpParams = new HttpParams();
  
  Object.keys(params).forEach(key => {
    if (params[key]) {
      httpParams = httpParams.append(key, params[key]);
    }
  });

  return this.http.get<ApiResponse<Siswa[]>>(
    `${environment.apiUrl}/siswa`,
    { params: httpParams }
  );
}
```

## 📤 File Upload Pattern

```typescript
uploadFile(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file, file.name);

  return this.http.post(
    `${environment.apiUrl}/upload`,
    formData
  );
}
```

## 🧪 Testing APIs

### Using Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Perform action (login, etc.)
4. Inspect request/response

### Using Postman

Collection available in backend: `postman_collection.json`

### Using curl

```bash
# Login
curl -X POST http://localhost/sq-backend/public/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Get profile (with token)
curl -X GET http://localhost/sq-backend/public/api/v1/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔐 Security Notes

1. **Always use HTTPS in production**
2. **Never commit tokens or credentials**
3. **Validate data on both client and server**
4. **Implement rate limiting on backend**
5. **Use environment variables for sensitive config**

## 📝 Rate Limiting

Backend implements rate limiting:
- Auth endpoints: 10 requests per minute
- Public endpoints: 60 requests per minute
- Authenticated endpoints: Based on role

Handle 429 (Too Many Requests):
```typescript
if (error.status === 429) {
  this.uiService.showError('Terlalu banyak request. Silakan coba lagi nanti.');
}
```

## 🌐 CORS Configuration

Ensure backend CORS is configured:

```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:8100'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

---

**Happy Coding! 🚀**
