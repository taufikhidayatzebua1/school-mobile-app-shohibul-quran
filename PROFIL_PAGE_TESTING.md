# Testing Halaman Profil

## Masalah yang Sudah Diperbaiki

### 1. HTTP Interceptor
- ✅ Diubah dari class-based menjadi functional interceptor (sesuai Angular modern)
- ✅ Registered dengan `withInterceptors()` di `main.ts`
- ✅ Menambahkan Authorization header dengan Bearer token

### 2. Icon Error
- ✅ Menambahkan `alertCircleOutline` ke registrasi icons

### 3. Error Handling
- ✅ Menangani 401 Unauthorized dengan redirect ke login
- ✅ Menampilkan pesan error yang informatif

## Cara Testing

### Prerequisites
Pastikan backend Laravel sudah running di `http://localhost:8000`

### Step 1: Login Dulu
1. Buka aplikasi di browser: `http://localhost:8100`
2. Anda akan diarahkan ke halaman `/login`
3. Login dengan credentials yang valid dari backend, contoh:
   ```
   Email: siswa@example.com (atau user lain dari seeder)
   Password: password
   ```

### Step 2: Akses Halaman Profil
1. Setelah login berhasil, navigate ke tab "Profil"
2. Halaman akan otomatis load data profile dari API endpoint `/api/v1/auth/profile`

### Step 3: Verifikasi Data
Profil akan menampilkan data berbeda sesuai role:

#### Untuk Role: Siswa
- Informasi Akun (username, email)
- Data Siswa (NIS, Kelas, Jenis Kelamin, TTL, Alamat, No HP, Tahun Masuk)

#### Untuk Role: Guru/Wali Kelas/Kepala Sekolah
- Informasi Akun (username, email)
- Data Guru (NIP, Jenis Kelamin, TTL, Alamat, No HP)

#### Untuk Role: Orang Tua
- Informasi Akun (username, email)
- Data Orang Tua (Jenis Kelamin, TTL, Alamat, No HP, Pendidikan, Pekerjaan, Penghasilan)

#### Untuk Role: Admin/Tata Usaha/Yayasan
- Hanya Informasi Akun (username, email)

## Troubleshooting

### Jika Masih Error 401:
1. **Cek apakah user sudah login:**
   - Buka Developer Console (F12)
   - Lihat log: `[AuthGuard] Checking authentication`
   - Jika `isAuthenticated: false`, berarti belum login

2. **Cek localStorage:**
   - Buka Developer Tools → Application → Local Storage
   - Cek apakah ada `auth_token` dan `current_user`
   - Jika tidak ada, login ulang

3. **Cek Network Tab:**
   - Buka Developer Tools → Network
   - Cari request ke `/api/v1/auth/profile`
   - Lihat Request Headers, pastikan ada `Authorization: Bearer <token>`

4. **Cek Token di Backend:**
   ```bash
   # Di terminal backend
   php artisan tinker
   
   # Check user tokens
   \App\Models\User::find(1)->tokens;
   ```

### Jika Icon Tidak Muncul:
- Refresh browser (Ctrl+Shift+R atau Cmd+Shift+R)
- Clear cache dan reload

### Jika Data Tidak Muncul (null/undefined):
- Cek migration di backend, pastikan field yang nullable sudah ada data
- Cek UserProfileResource di backend untuk memastikan response sesuai

## Testing Skenario

### Test Case 1: Login & View Profile (Happy Path)
1. Login dengan user valid
2. Navigate ke tab Profil
3. ✅ Expect: Melihat data profil lengkap sesuai role

### Test Case 2: Session Expired
1. Login dengan user valid
2. Hapus token dari localStorage (Developer Tools)
3. Refresh halaman profil
4. ✅ Expect: Error "Sesi berakhir", redirect ke login setelah 2 detik

### Test Case 3: Pull to Refresh
1. Login dan buka profil
2. Pull down untuk refresh
3. ✅ Expect: Data di-reload, toast "Profil berhasil diperbarui"

### Test Case 4: Logout
1. Login dan buka profil
2. Klik tombol Logout
3. Konfirmasi dialog
4. ✅ Expect: Redirect ke login, localStorage cleared

## Backend Endpoints yang Digunakan

```
POST /api/v1/auth/login
- Login user
- Response: { success, message, data: { user, access_token, token_type, expires_at } }

GET /api/v1/auth/profile
- Get user profile with role-specific data
- Requires: Authorization Bearer Token
- Response: { success, message, data: UserProfile }

POST /api/v1/auth/logout
- Logout user (revoke current token)
- Requires: Authorization Bearer Token
- Response: { success, message }
```

## File yang Sudah Diubah

1. **Frontend (sq-mobile):**
   - ✅ `src/app/core/models/user.model.ts` - Interface UserProfile lengkap
   - ✅ `src/app/core/services/auth.service.ts` - Method getUserProfile()
   - ✅ `src/app/core/interceptors/auth.interceptor.ts` - Functional interceptor
   - ✅ `src/app/core/guards/auth.guard.ts` - Added debug logging
   - ✅ `src/app/pages/profil/profil.page.ts` - Logic lengkap
   - ✅ `src/app/pages/profil/profil.page.html` - UI minimalis modern
   - ✅ `src/app/pages/profil/profil.page.scss` - Styling modern
   - ✅ `src/main.ts` - Register interceptor dengan benar

2. **Backend (sq-backend):**
   - Tidak ada perubahan, semua endpoint sudah tersedia

## Notes

- Avatar default: Jika `url_photo` null, akan fallback ke `assets/icon/default-avatar.png`
- Semua field nullable di-handle dengan `*ngIf` dan operator `?.`
- Format tanggal menggunakan locale Indonesia
- Role text di-translate ke bahasa Indonesia

## Kesimpulan

Setelah perbaikan ini, error 401 seharusnya hanya muncul jika:
1. User belum login
2. Token expired/invalid
3. Backend tidak running

Dalam semua kasus, user akan di-redirect ke halaman login dengan pesan yang jelas.
