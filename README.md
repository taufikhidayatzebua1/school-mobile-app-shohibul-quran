# SQ Mobile - Sistem Pembelajaran Al-Quran

Aplikasi mobile berbasis Ionic Angular yang terintegrasi dengan backend `sq-backend` untuk sistem pembelajaran Al-Quran.

## 📱 Fitur Utama

- ✅ **Autentikasi dengan Backend** - Login terintegrasi dengan API sq-backend
- ✅ **No Registration** - Tidak ada halaman register, user dibuat oleh administrator
- ✅ **Role-based Access** - Mendukung berbagai role: Admin, Kepala Sekolah, Guru, Orang Tua, Siswa
- ✅ **Token Management** - Automatic token handling dengan interceptor
- ✅ **Route Guards** - Protected routes untuk keamanan
- ✅ **Responsive Design** - UI yang optimal untuk berbagai ukuran layar

## 🏗️ Arsitektur & Best Practices

### Struktur Folder
```
sq-mobile/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   ├── guards/              # Route guards
│   │   │   │   ├── auth.guard.ts    # Protect authenticated routes
│   │   │   │   └── login.guard.ts   # Prevent access to login if authenticated
│   │   │   ├── interceptors/        # HTTP interceptors
│   │   │   │   └── auth.interceptor.ts  # Add token to requests
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   │   └── user.model.ts
│   │   │   └── services/            # Business logic services
│   │   │       └── auth.service.ts  # Authentication service
│   │   ├── pages/                   # Application pages
│   │   │   └── login/               # Login page
│   │   │       ├── login.page.ts
│   │   │       ├── login.page.html
│   │   │       └── login.page.scss
│   │   └── home/                    # Home page (protected)
│   └── environments/                # Environment configurations
│       ├── environment.ts           # Development config
│       └── environment.prod.ts      # Production config
```

### Best Practices Implemented

1. **Separation of Concerns**
   - Services untuk business logic
   - Guards untuk route protection
   - Interceptors untuk HTTP handling
   - Models untuk type safety

2. **Security**
   - Token stored in localStorage
   - Automatic token attachment via interceptor
   - 401 error handling dengan auto-logout
   - Route guards untuk unauthorized access prevention

3. **User Experience**
   - Loading indicators
   - Toast notifications untuk feedback
   - Responsive design
   - Clear error messages

4. **Code Quality**
   - TypeScript untuk type safety
   - Standalone components (Angular modern approach)
   - Reactive programming dengan RxJS
   - Clean code principles

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Ionic CLI (`npm install -g @ionic/cli`)
- Backend `sq-backend` harus sudah running

### Installation Steps

1. **Clone atau navigate ke project folder**
   ```bash
   cd d:\Project\sq-mobile\sq-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   
   Edit `src/environments/environment.ts` untuk development:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost/sq-backend/public/api/v1', // Sesuaikan dengan URL backend Anda
     apiVersion: 'v1'
   };
   ```

   Edit `src/environments/environment.prod.ts` untuk production:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-domain.com/api/v1', // URL production backend
     apiVersion: 'v1'
   };
   ```

4. **Run Development Server**
   ```bash
   ionic serve
   ```
   
   Aplikasi akan berjalan di `http://localhost:8100`

## 📱 Build untuk Mobile

### Android

1. **Add Android platform**
   ```bash
   ionic capacitor add android
   ```

2. **Build the app**
   ```bash
   ionic build
   ionic capacitor copy android
   ```

3. **Open in Android Studio**
   ```bash
   ionic capacitor open android
   ```

### iOS (Requires macOS)

1. **Add iOS platform**
   ```bash
   ionic capacitor add ios
   ```

2. **Build the app**
   ```bash
   ionic build
   ionic capacitor copy ios
   ```

3. **Open in Xcode**
   ```bash
   ionic capacitor open ios
   ```

## 🔐 Autentikasi

### Login Flow

1. User mengakses aplikasi → redirect ke `/login`
2. User input username & password
3. Aplikasi mengirim request ke `POST /api/v1/auth/login`
4. Backend memvalidasi credentials
5. Jika valid, backend mengembalikan token & user data
6. Token disimpan di localStorage
7. User diarahkan ke `/home`
8. Setiap request selanjutnya otomatis menyertakan token via interceptor

### Endpoint Backend yang Digunakan

```
POST /api/v1/auth/login
- Body: { username, password }
- Response: { success, message, data: { user, token } }

POST /api/v1/auth/logout
- Headers: Authorization: Bearer {token}
- Response: { success, message }

POST /api/v1/auth/forgot-password
- Body: { email }

POST /api/v1/auth/reset-password
- Body: { token, email, password, password_confirmation }
```

## 🎯 User Flow

1. **Unauthenticated User**
   - Akses aplikasi → Redirect ke login page
   - Tidak bisa akses halaman lain tanpa login

2. **Authenticated User**
   - Login berhasil → Redirect ke home page
   - Token otomatis disertakan di setiap request
   - Bisa logout kapan saja

3. **Session Expired (401)**
   - Interceptor mendeteksi 401 error
   - Otomatis logout dan clear data
   - Redirect ke login page

## 📝 Penggunaan

### Testing dengan User Backend

Gunakan user yang sudah ada di backend untuk testing:

```
Username: admin / kepala_sekolah / guru / orang_tua / siswa
Password: password (atau sesuai yang di-set di backend)
```

### Tidak Ada Halaman Register

❌ Aplikasi ini **tidak memiliki halaman register**
✅ User account dibuat oleh **administrator melalui backend**

Alasan:
- Sistem sekolah memerlukan kontrol user management
- Setiap user harus di-approve dan di-assign role yang tepat
- Data user terintegrasi dengan data siswa, guru, orang tua, dll

## 🛠️ Development

### Adding New Features

1. **Create Service**
   ```bash
   ionic generate service core/services/FeatureName
   ```

2. **Create Page**
   ```bash
   ionic generate page pages/PageName
   ```

3. **Create Guard**
   ```bash
   ionic generate guard core/guards/GuardName
   ```

### API Integration Pattern

```typescript
// In your service
getData(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(`${environment.apiUrl}/endpoint`)
    .pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => error);
      })
    );
}
```

## 🔧 Troubleshooting

### CORS Issues
Jika mengalami CORS error saat development:
1. Pastikan backend sudah enable CORS
2. Check `config/cors.php` di backend
3. Atau gunakan `ionic serve --proxy-config proxy.conf.json`

### Token Not Included
Jika token tidak ter-attach:
1. Check `AuthInterceptor` sudah di-register di `main.ts`
2. Verify token tersimpan di localStorage
3. Check console untuk error

### Login Failed
1. Verify backend running
2. Check `environment.ts` API URL sudah benar
3. Check network tab di browser DevTools
4. Verify credentials valid di backend

## 📚 Resources

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

## 👥 Roles Supported

- **Admin** - Full access ke semua fitur
- **Kepala Sekolah** - Manajemen sekolah
- **Guru** - Input dan monitoring hafalan
- **Orang Tua** - Monitoring progress anak
- **Siswa** - View progress dan data pribadi

## 📄 License

Sesuai dengan license backend sq-backend.

---

**Note**: Pastikan backend `sq-backend` sudah running sebelum menggunakan aplikasi ini.
