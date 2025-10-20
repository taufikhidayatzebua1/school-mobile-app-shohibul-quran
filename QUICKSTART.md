# SQ Mobile - Quick Start Guide

## 🚀 Cara Cepat Memulai

### 1. Pastikan Backend Running
```bash
# Di terminal backend (sq-backend)
cd c:\laragon\sq-backend
php artisan serve
```

Backend harus berjalan di: `http://localhost:8000` atau sesuai konfigurasi Laragon Anda.

### 2. Update API URL (Jika Perlu)

Edit file `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/v1',  // Sesuaikan dengan URL backend Anda
  apiVersion: 'v1'
};
```

Kemungkinan URL backend:
- Laragon: `http://localhost/sq-backend/public/api/v1`
- PHP artisan serve: `http://localhost:8000/api/v1`
- Custom domain: `http://sq-backend.test/api/v1`

### 3. Install Dependencies (Jika Belum)
```bash
cd d:\Project\sq-mobile\sq-mobile
npm install
```

### 4. Jalankan Aplikasi
```bash
ionic serve
```

Aplikasi akan buka otomatis di browser: `http://localhost:8100`

### 5. Login dengan User Backend

Gunakan salah satu user yang ada di backend:

| Username | Password | Role |
|----------|----------|------|
| admin | password | Admin |
| kepala_sekolah | password | Kepala Sekolah |
| guru | password | Guru |
| orang_tua | password | Orang Tua |
| siswa | password | Siswa |

> **Note**: Sesuaikan dengan user yang ada di database backend Anda.

## 🔍 Troubleshooting Cepat

### CORS Error
Jika muncul CORS error di console:

1. **Backend (sq-backend)**: Edit `config/cors.php`
   ```php
   'paths' => ['api/*'],
   'allowed_origins' => ['http://localhost:8100'],
   'allowed_methods' => ['*'],
   ```

2. **Atau gunakan proxy**: Jalankan dengan proxy config
   ```bash
   ionic serve --proxy-config proxy.conf.json
   ```

### API URL Salah
Cek di browser DevTools (F12) → Network tab:
- Lihat URL request yang dipanggil
- Pastikan mengarah ke backend yang benar
- Update `environment.ts` jika perlu

### Login Gagal
1. Cek backend running: Buka `http://localhost:8000/api/v1/auth/login` di browser
2. Pastikan database backend sudah di-seed dengan user
3. Cek console browser untuk error detail

## 📱 Test di Device

### Via Browser (Quickest)
```bash
ionic serve --external
```
Akses dari phone menggunakan IP yang ditampilkan (e.g., `http://192.168.1.100:8100`)

### Build Android APK
```bash
ionic build
ionic capacitor add android
ionic capacitor copy android
ionic capacitor open android
```

### Build iOS (MacOS Only)
```bash
ionic build
ionic capacitor add ios
ionic capacitor copy ios
ionic capacitor open ios
```

## 🎯 Next Steps

1. ✅ Login berhasil
2. ✅ Lihat data user di home page
3. ➡️ Tambahkan fitur sesuai role user
4. ➡️ Integrate dengan API backend lainnya

## 📚 File Penting

- `src/environments/environment.ts` - Config API URL
- `src/app/core/services/auth.service.ts` - Auth logic
- `src/app/core/interceptors/auth.interceptor.ts` - Token handling
- `src/app/pages/login/` - Login page
- `src/app/home/` - Home page (protected)

---

**Happy Coding! 🚀**
