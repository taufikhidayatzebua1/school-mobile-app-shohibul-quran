# Environment Configuration Guide

## Overview
Konfigurasi environment digunakan untuk memisahkan pengaturan antara development dan production. Ini adalah **best practice** untuk menghindari hardcoded URL dan memudahkan deployment.

## File Struktur

### Development Environment
**File:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  apiVersion: 'v1'
};
```

### Production Environment
**File:** `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-domain.com/api',
  apiVersion: 'v1'
};
```

## Konfigurasi Backend URL

### Development (Local)
- **URL Backend:** `http://localhost:8000/api`
- **Laravel Server:** Dijalankan dengan `php artisan serve` (default port 8000)

### API Endpoints
Semua endpoint otomatis menggunakan base URL dari environment:

| Endpoint | Full URL (Development) |
|----------|------------------------|
| Login | `http://localhost:8000/api/auth/login` |
| Logout | `http://localhost:8000/api/auth/logout` |
| Forgot Password | `http://localhost:8000/api/auth/forgot-password` |
| Reset Password | `http://localhost:8000/api/auth/reset-password` |
| User Profile | `http://localhost:8000/api/user/profile` |

## Cara Menggunakan

### 1. Di Service
```typescript
import { environment } from '../../../environments/environment';

// Gunakan environment.apiUrl
this.http.post(`${environment.apiUrl}/auth/login`, credentials)
```

### 2. Build untuk Production
```bash
# Build dengan environment production
ionic build --prod

# atau
ng build --configuration=production
```

Angular akan otomatis mengganti `environment.ts` dengan `environment.prod.ts` saat build production.

## Best Practices ✅

### ✅ DO (Yang Benar)
- Simpan semua konfigurasi URL di environment files
- Gunakan environment yang berbeda untuk development dan production
- Commit kedua file environment ke repository
- Update `environment.prod.ts` sebelum deployment

### ❌ DON'T (Jangan)
- Hardcode URL langsung di service
- Gunakan URL production di development
- Simpan credentials atau API keys di environment files
- Ignore environment files di `.gitignore` (kecuali ada data sensitif)

## Update Backend URL

### Untuk Development
Edit `src/environments/environment.ts`:
```typescript
apiUrl: 'http://localhost:8000/api'  // atau port lain
```

### Untuk Production
Edit `src/environments/environment.prod.ts`:
```typescript
apiUrl: 'https://api.yourdomain.com/api'  // URL production Anda
```

## Testing

### Test dengan Backend Lokal
1. Jalankan Laravel backend:
   ```bash
   cd c:\laragon\sq-backend
   php artisan serve
   ```

2. Jalankan Ionic app:
   ```bash
   cd d:\Project\sq-mobile
   ionic serve
   ```

3. Backend akan berjalan di: `http://localhost:8000`
4. Frontend akan berjalan di: `http://localhost:8100`

### Test Login
Coba login dengan:
- **Email:** user@example.com
- **Password:** password123

## Troubleshooting

### CORS Issues
Jika ada masalah CORS, pastikan Laravel backend sudah mengizinkan origin dari frontend:

Edit `config/cors.php` di backend:
```php
'allowed_origins' => ['http://localhost:8100'],
```

### Connection Refused
- Pastikan Laravel backend sudah running
- Periksa port yang digunakan (default 8000)
- Periksa firewall settings

### 404 Not Found
- Pastikan endpoint API benar
- Periksa routing di backend (`routes/api.php`)
- Pastikan prefix `/api` sudah sesuai

## Additional Configuration

Anda bisa menambahkan konfigurasi lain di environment:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  apiVersion: 'v1',
  
  // Tambahan konfigurasi
  appName: 'SQ Mobile',
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  storagePrefix: 'sq_',
  
  // Feature flags
  features: {
    enableOfflineMode: true,
    enableNotifications: false,
    enableAnalytics: false
  }
};
```

## Security Notes

⚠️ **Penting:**
- Jangan simpan API keys atau secrets di environment files
- Gunakan environment variables untuk data sensitif di production
- Untuk data sensitif, gunakan capacitor storage atau secure storage plugins
