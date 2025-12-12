# 📱 SQ Mobile App

<div align="center">

![Ionic](https://img.shields.io/badge/Ionic-8.0.0-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-20.0.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-6.1.2-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Aplikasi Mobile Sistem Pembelajaran Al-Quran**

Aplikasi mobile berbasis Ionic Angular yang terintegrasi dengan backend `sq-backend` untuk sistem pembelajaran Al-Quran dengan fitur manajemen siswa, guru, dan orang tua.

[Demo](#) • [Dokumentasi](#-dokumentasi-lengkap) • [API Docs](API_DOCUMENTATION.md) • [Best Practices](BEST_PRACTICES.md)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Build & Deploy](#-build--deploy)
- [Struktur Proyek](#-struktur-proyek)
- [Dokumentasi Lengkap](#-dokumentasi-lengkap)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Tentang Proyek

**SQ Mobile** adalah aplikasi mobile cross-platform untuk sistem pembelajaran Al-Quran yang dirancang untuk mendukung ekosistem pendidikan Quran dengan berbagai role pengguna:

- 👨‍💼 **Admin** - Manajemen sistem lengkap
- 🏫 **Kepala Sekolah** - Monitoring dan pelaporan
- 👨‍🏫 **Guru** - Pengelolaan kelas dan penilaian
- 👪 **Orang Tua** - Monitoring perkembangan anak
- 👨‍🎓 **Siswa** - Akses materi dan tugas

### Keunggulan

✅ **Terintegrasi Penuh** dengan backend API  
✅ **Secure Authentication** dengan JWT token  
✅ **Offline-First Approach** (Coming Soon)  
✅ **Real-time Notifications**  
✅ **Modern UI/UX** dengan Ionic Components  
✅ **Cross-Platform** - Android & iOS ready

---

## ✨ Fitur Utama

### 🔐 Authentication & Security
- [x] Login dengan username & password
- [x] JWT Token management
- [x] Auto-logout on token expiration
- [x] Route guards (auth & login guards)
- [x] HTTP interceptor untuk automatic token attachment
- [x] 401 error handling

### 👤 User Profile Management
- [x] View & edit profile
- [x] Upload profile picture
- [x] Role-based profile display
- [x] Personal information management

### 📱 Core Features
- [x] Feed/News (Timeline sekolah)
- [x] Donasi (Donation system)
- [x] Notifikasi (Push notifications)
- [x] Bottom navigation tabs
- [x] Responsive design untuk semua ukuran layar

### 🏗️ Technical Features
- [x] Clean architecture implementation
- [x] Type-safe dengan TypeScript
- [x] Service-based architecture
- [x] Environment-based configuration
- [x] Error handling & logging
- [x] Loading states & UX feedback

---

## 🛠️ Teknologi

### Frontend Framework
- **Angular** 20.0.0 - Web framework
- **Ionic** 8.0.0 - UI components
- **TypeScript** 5.8.0 - Programming language
- **RxJS** 7.8.0 - Reactive programming
- **SCSS** - Styling

### Mobile Runtime
- **Capacitor** 6.1.2 - Native runtime
- **Android SDK** - Android development
- iOS (Ready to build)

### Development Tools
- **Angular CLI** 20.0.0
- **ESLint** 9.16.0 - Code linting
- **Karma** 6.4.0 - Unit testing
- **Jasmine** 5.1.0 - Testing framework

---

## 📦 Prasyarat

Pastikan sistem Anda telah terinstall:

- **Node.js** >= 18.x
- **npm** >= 9.x atau **yarn** >= 1.22.x
- **Ionic CLI** >= 7.x
  ```bash
  npm install -g @ionic/cli
  ```
- **Angular CLI** >= 20.x
  ```bash
  npm install -g @angular/cli
  ```

### Untuk Development Android
- **Android Studio** (Latest version)
- **JDK** 17 atau lebih tinggi
- **Android SDK** (API Level 24+)
- **Gradle** 8.x

### Untuk Development iOS (Mac only)
- **Xcode** 14+
- **CocoaPods**

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/your-username/sq-mobile-app.git
cd sq-mobile-app
```

### 2. Install Dependencies

```bash
npm install
```

atau dengan yarn:

```bash
yarn install
```

### 3. Install Capacitor

```bash
npx cap sync
```

---

## ⚙️ Konfigurasi

### Environment Configuration

Konfigurasi API endpoint di file environment:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost/sq-backend/public/api/v1',
  apiVersion: 'v1'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api/v1',
  apiVersion: 'v1'
};
```

### Capacitor Configuration

Edit `capacitor.config.ts` untuk konfigurasi app:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.sqmobile', // Ganti dengan App ID Anda
  appName: 'SQ Mobile',
  webDir: 'www'
};

export default config;
```

### Proxy Configuration (Development)

Untuk menghindari CORS issue saat development, gunakan proxy di `proxy.conf.json`.

---

## 🏃 Menjalankan Aplikasi

### Development Server (Browser)

```bash
# Start development server
npm start
# atau
ionic serve

# Dengan live reload
ionic serve --lab  # Tampilkan iOS, Android, dan web side-by-side
```

Aplikasi akan berjalan di `http://localhost:8100`

### Run on Android

```bash
# Build dan sync
ionic build
npx cap sync android

# Open in Android Studio
npx cap open android

# Atau run langsung
npx cap run android
```

### Run on iOS (Mac only)

```bash
# Build dan sync
ionic build
npx cap sync ios

# Open in Xcode
npx cap open ios
```

---

## 📦 Build & Deploy

### Build untuk Production

```bash
# Build with production configuration
npm run build --prod
# atau
ionic build --prod
```

### Build Android APK/AAB

```bash
# Sync capacitor
npx cap sync android

# Open Android Studio
npx cap open android
```

Di Android Studio:
1. **Build > Build Bundle(s) / APK(s) > Build APK(s)** untuk APK
2. **Build > Generate Signed Bundle / APK** untuk release

### Build iOS App (Mac only)

```bash
# Sync capacitor
npx cap sync ios

# Open Xcode
npx cap open ios
```

Di Xcode:
1. Select your team/provisioning profile
2. **Product > Archive**
3. Upload to App Store Connect

---

## 📁 Struktur Proyek

```
sq-mobile/
├── 📱 android/                      # Android native project
│   ├── app/
│   │   └── src/main/
│   └── build.gradle
│
├── 📄 src/
│   ├── app/
│   │   ├── 🔐 core/                # Core functionality
│   │   │   ├── guards/             # Route protection
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── login.guard.ts
│   │   │   ├── interceptors/       # HTTP interceptors
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/             # TypeScript models
│   │   │   │   └── user.model.ts
│   │   │   └── services/           # Business logic
│   │   │       └── auth.service.ts
│   │   │
│   │   ├── 📄 pages/               # Application pages
│   │   │   ├── login/             # Login page
│   │   │   ├── profil/            # Profile page
│   │   │   ├── feed/              # News feed
│   │   │   ├── donasi/            # Donation
│   │   │   └── notifikasi/        # Notifications
│   │   │
│   │   ├── 🏠 home/               # Home/Dashboard
│   │   ├── 📑 tabs/               # Tab navigation
│   │   ├── app.component.ts       # Root component
│   │   └── app.routes.ts          # Route configuration
│   │
│   ├── 🎨 assets/                 # Static assets
│   │   └── icon/                  # App icons
│   │
│   ├── 🌍 environments/           # Environment configs
│   │   ├── environment.ts         # Development
│   │   └── environment.prod.ts    # Production
│   │
│   ├── 🎨 theme/                  # Global styles
│   │   └── variables.scss
│   │
│   ├── global.scss                # Global SCSS
│   ├── index.html                 # Entry HTML
│   └── main.ts                    # Application bootstrap
│
├── 📚 Dokumentasi/
│   ├── API_DOCUMENTATION.md       # API integration guide
│   ├── BEST_PRACTICES.md          # Development guidelines
│   ├── PROJECT_OVERVIEW.md        # Project summary
│   ├── ENVIRONMENT_CONFIG.md      # Environment setup
│   ├── USER_MODEL.md              # User data models
│   ├── CHEATSHEET.md              # Quick commands
│   └── ... (more docs)
│
├── ⚙️ Configuration Files
│   ├── angular.json               # Angular config
│   ├── capacitor.config.ts        # Capacitor config
│   ├── ionic.config.json          # Ionic config
│   ├── tsconfig.json              # TypeScript config
│   ├── package.json               # Dependencies
│   └── .gitignore                 # Git ignore rules
│
└── 🌐 www/                        # Built output (generated)
```

### Architecture Principles

✅ **Clean Architecture**
- Separation of concerns (guards, services, interceptors)
- Single responsibility principle
- Dependency injection

✅ **Type Safety**
- Full TypeScript implementation
- Interface-based models
- Compile-time error checking

✅ **Security First**
- JWT token management
- Route guards
- HTTP interceptor
- Secure token storage

✅ **Best Practices**
- ESLint code linting
- Consistent code style
- Component-based architecture
- Reactive programming with RxJS

---

## 📚 Dokumentasi Lengkap

### Setup & Configuration
- 📖 [**Project Overview**](PROJECT_OVERVIEW.md) - Ringkasan lengkap proyek
- 📖 [**Installation Summary**](INSTALLATION_SUMMARY.md) - Panduan instalasi detail
- 📖 [**Quickstart Guide**](QUICKSTART.md) - Mulai dengan cepat
- 📖 [**Environment Config**](ENVIRONMENT_CONFIG.md) - Konfigurasi environment
- 📖 [**Cheatsheet**](CHEATSHEET.md) - Command & tips berguna

### Development Guide
- 📖 [**Best Practices**](BEST_PRACTICES.md) - Panduan development
- 📖 [**API Documentation**](API_DOCUMENTATION.md) - Integrasi API backend
- 📖 [**User Model**](USER_MODEL.md) - Struktur data user

### UI/UX Documentation
- 📖 [**Bottom Navigation**](BOTTOM_NAVIGATION.md) - Tab navigation system
- 📖 [**Modern Profile Design**](MODERN_PROFILE_DESIGN.md) - Profile page design
- 📖 [**Tab Icons Update**](TAB_ICONS_UPDATE.md) - Icon customization
- 📖 [**Profile Modal**](PROFILE_MODAL_UPDATE.md) - Modal components
- 📖 [**Profile Testing**](PROFIL_PAGE_TESTING.md) - Testing guidelines

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
ng test --watch
```

### E2E Tests

```bash
# Run e2e tests
npm run e2e
```

### Manual Testing Checklist

- [ ] Login functionality
- [ ] Token persistence
- [ ] Profile display
- [ ] Route guards working
- [ ] API integration
- [ ] Error handling
- [ ] Responsive design

---

## 🔧 Troubleshooting

### Common Issues

**1. CORS Error saat Development**
```bash
# Solution: Gunakan proxy configuration
ionic serve --proxy-config proxy.conf.json
```

**2. Android Build Failed**
```bash
# Clear cache dan rebuild
cd android
./gradlew clean
cd ..
npx cap sync android
```

**3. Node Modules Error**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**4. Capacitor Sync Issues**
```bash
# Force sync
npx cap sync --force
```

---

## 🚀 Roadmap

### Phase 1 (Current) ✅
- [x] Authentication system
- [x] User profile management
- [x] Basic navigation
- [x] API integration

### Phase 2 (In Progress) 🔄
- [ ] Offline mode support
- [ ] Push notifications
- [ ] Enhanced feed features
- [ ] File upload/download

### Phase 3 (Planned) 📋
- [ ] Real-time chat
- [ ] Video streaming
- [ ] Advanced reporting
- [ ] Multi-language support

---

## 🤝 Contributing

Kami menerima kontribusi! Ikuti langkah berikut:

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/sq-mobile-app.git
cd sq-mobile-app
```

### 2. Create Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes
- Ikuti [Best Practices](BEST_PRACTICES.md)
- Tulis kode yang clean dan terdokumentasi
- Tambahkan tests jika diperlukan

### 4. Commit
```bash
git add .
git commit -m "feat: add amazing feature"
```

**Commit Message Convention:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance

### 5. Push & PR
```bash
git push origin feature/amazing-feature
```
Kemudian buat Pull Request di GitHub.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 SQ Mobile Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 👥 Team & Support

### Development Team
- 👨‍💻 **Lead Developer** - Full Stack Development
- 🎨 **UI/UX Designer** - Interface Design
- 🔧 **Backend Team** - API Development

### Support
- 📧 Email: support@sqmobile.com
- 💬 Discord: [Join our community](#)
- 📱 WhatsApp: +62-xxx-xxxx-xxxx
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/sq-mobile-app/issues)

---

## 🙏 Acknowledgments

Terima kasih kepada:

- **[Ionic Framework](https://ionicframework.com/)** - Amazing mobile UI framework
- **[Angular Team](https://angular.io/)** - Powerful web framework
- **[Capacitor](https://capacitorjs.com/)** - Native mobile runtime
- **All Contributors** - Everyone who contributed to this project

---

## 📊 Stats & Badges

![GitHub stars](https://img.shields.io/github/stars/your-username/sq-mobile-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/sq-mobile-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/sq-mobile-app)
![GitHub license](https://img.shields.io/github/license/your-username/sq-mobile-app)

---

<div align="center">

**[⬆ Back to Top](#-sq-mobile-app)**

Made with ❤️ by SQ Mobile Team

</div>
