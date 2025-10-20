# 📱 SQ Mobile - Project Overview

## 🎯 Ringkasan Proyek

**SQ Mobile** adalah aplikasi mobile berbasis Ionic Angular untuk Sistem Pembelajaran Al-Quran yang terintegrasi dengan backend `sq-backend`. Aplikasi ini menggunakan autentikasi dari backend tanpa fitur registrasi di mobile app.

## ✨ Fitur yang Sudah Diimplementasikan

### ✅ Core Features
- [x] **Authentication System**
  - Login dengan username & password
  - Logout functionality
  - Token management (localStorage)
  - Session persistence
  - Auto-logout on token expiration

- [x] **Security**
  - Route guards (auth & login guards)
  - HTTP interceptor untuk automatic token attachment
  - 401 error handling
  - Protected routes

- [x] **UI/UX**
  - Responsive login page
  - User profile display
  - Loading indicators
  - Toast notifications
  - Confirmation dialogs

- [x] **Architecture**
  - Clean folder structure
  - Separation of concerns
  - Service-based architecture
  - Type-safe with TypeScript
  - Best practices implementation

## 📂 Struktur Proyek Lengkap

```
sq-mobile/
├── src/
│   ├── app/
│   │   ├── core/                           # Core functionality
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts           # Protect authenticated routes
│   │   │   │   └── login.guard.ts          # Redirect if authenticated
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts     # HTTP interceptor (add token)
│   │   │   ├── models/
│   │   │   │   └── user.model.ts           # User interface & types
│   │   │   └── services/
│   │   │       ├── auth.service.ts         # Authentication logic
│   │   │       ├── api.service.ts          # Generic API calls
│   │   │       └── ui.service.ts           # UI utilities (toast, loading, etc)
│   │   ├── pages/
│   │   │   └── login/                      # Login page
│   │   │       ├── login.page.ts
│   │   │       ├── login.page.html
│   │   │       └── login.page.scss
│   │   ├── home/                           # Home page (protected)
│   │   │   ├── home.page.ts
│   │   │   ├── home.page.html
│   │   │   └── home.page.scss
│   │   ├── app.component.ts                # Root component
│   │   ├── app.component.html
│   │   └── app.routes.ts                   # App routing
│   ├── environments/
│   │   ├── environment.ts                  # Dev environment
│   │   └── environment.prod.ts             # Prod environment
│   ├── assets/                             # Static assets
│   ├── theme/                              # Global styles
│   ├── index.html
│   ├── main.ts                             # App bootstrap
│   └── global.scss
├── android/                                # Android platform (after adding)
├── ios/                                    # iOS platform (after adding)
├── .gitignore
├── angular.json                            # Angular configuration
├── capacitor.config.ts                     # Capacitor configuration
├── ionic.config.json                       # Ionic configuration
├── package.json                            # Dependencies
├── tsconfig.json                           # TypeScript config
├── proxy.conf.json                         # Dev proxy config
├── README.md                               # Project documentation
├── QUICKSTART.md                           # Quick start guide
├── BEST_PRACTICES.md                       # Best practices documentation
└── API_DOCUMENTATION.md                    # API integration guide
```

## 🔧 Tech Stack

### Frontend Framework
- **Ionic Framework 8.x** - Mobile UI framework
- **Angular 18.x** - Application framework
- **Capacitor 6.x** - Native runtime

### Language & Tools
- **TypeScript 5.x** - Type-safe programming
- **RxJS 7.x** - Reactive programming
- **SCSS** - Styling

### Development Tools
- **Ionic CLI** - Development server & build tools
- **Angular CLI** - Code generation & build
- **ESLint** - Code linting
- **Karma & Jasmine** - Testing

## 🚀 Available Commands

### Development
```bash
# Start development server
ionic serve
ionic serve --external          # Access from other devices

# With proxy (for CORS issues)
ionic serve --proxy-config proxy.conf.json
```

### Building
```bash
# Production build
ionic build --prod

# Development build
ionic build
```

### Mobile Platforms
```bash
# Add platforms
ionic capacitor add android
ionic capacitor add ios

# Copy web assets to native projects
ionic capacitor copy

# Sync (copy + update)
ionic capacitor sync

# Open in native IDE
ionic capacitor open android
ionic capacitor open ios
```

### Code Generation
```bash
# Generate page
ionic generate page pages/PageName

# Generate service
ionic generate service core/services/ServiceName

# Generate guard
ionic generate guard core/guards/GuardName

# Generate component
ionic generate component components/ComponentName
```

### Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run e2e
```

## 🎨 Design System

### Color Palette
Ionic provides default colors that can be customized in `src/theme/variables.scss`:
- **Primary**: Main brand color
- **Secondary**: Secondary brand color
- **Tertiary**: Accent color
- **Success**: Green for success states
- **Warning**: Orange for warnings
- **Danger**: Red for errors
- **Medium**: Gray for neutral elements
- **Light**: Light backgrounds
- **Dark**: Dark text/backgrounds

### Components Used
- **IonHeader/IonToolbar** - Page headers
- **IonContent** - Main content area
- **IonCard** - Card containers
- **IonInput** - Form inputs
- **IonButton** - Action buttons
- **IonIcon** - Icons from Ionicons
- **IonToast** - Toast notifications
- **IonLoading** - Loading overlays
- **IonAlert** - Alert dialogs

## 🔐 Authentication Flow

```
┌─────────────┐
│   App Start │
└──────┬──────┘
       │
       ├─ Check Token in localStorage
       │
       ├─ Token exists? ─── Yes ──> Navigate to /home
       │
       └─ No ──> Navigate to /login
                      │
                      ├─ User inputs credentials
                      │
                      ├─ POST /api/v1/auth/login
                      │
                      ├─ Success?
                      │   │
                      │   ├─ Yes ──> Store token & user
                      │   │          Navigate to /home
                      │   │
                      │   └─ No ──> Show error message
                      │
                      └─ All subsequent requests include token
```

## 🗂️ Data Flow

```
┌──────────────┐
│  Component   │  ← User interaction
└──────┬───────┘
       │
       ├─ Calls Service method
       │
┌──────▼───────┐
│   Service    │  ← Business logic
└──────┬───────┘
       │
       ├─ Makes HTTP request
       │
┌──────▼───────┐
│ Interceptor  │  ← Add token, handle errors
└──────┬───────┘
       │
       ├─ Send to API
       │
┌──────▼───────┐
│   Backend    │  ← Process request
└──────┬───────┘
       │
       ├─ Return response
       │
       ▼
   Component updates UI
```

## 👥 User Roles & Access

| Role | Description | Akses |
|------|-------------|-------|
| **Admin** | Administrator sistem | Full access |
| **Kepala Sekolah** | Kepala Sekolah | Manajemen sekolah |
| **Guru** | Guru/Pengajar | Input & monitoring hafalan |
| **Orang Tua** | Wali murid | View progress anak |
| **Siswa** | Siswa/Santri | View progress pribadi |

## 📋 Development Checklist

### ✅ Phase 1: Foundation (COMPLETED)
- [x] Project setup
- [x] Folder structure
- [x] Authentication service
- [x] Route guards
- [x] HTTP interceptor
- [x] Login page
- [x] Home page
- [x] Environment configuration

### 🔄 Phase 2: Core Features (NEXT)
- [ ] Hafalan list page
- [ ] Hafalan detail page
- [ ] Create hafalan form
- [ ] Profile page
- [ ] Settings page

### 🔜 Phase 3: Advanced Features
- [ ] Offline support
- [ ] Push notifications
- [ ] Camera integration (for evidence)
- [ ] Audio recording (for hafalan verification)
- [ ] Reports & analytics

### 🔜 Phase 4: Polish & Deploy
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Build & deploy to app stores

## 🐛 Known Issues & Limitations

### Current Limitations
1. **No Offline Support** - Requires internet connection
2. **No Push Notifications** - Not yet implemented
3. **Basic Error Handling** - Can be improved
4. **No Data Caching** - Every request hits the API

### Future Improvements
- Implement local database (SQLite via Capacitor)
- Add push notifications (FCM/APNS)
- Implement advanced error recovery
- Add data caching strategy
- Implement retry logic for failed requests

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `QUICKSTART.md` | Quick start guide |
| `BEST_PRACTICES.md` | Best practices & patterns |
| `API_DOCUMENTATION.md` | API integration guide |
| `PROJECT_OVERVIEW.md` | This file - project overview |

## 🤝 Development Workflow

1. **Start Backend**
   ```bash
   cd c:\laragon\sq-backend
   php artisan serve
   ```

2. **Start Mobile App**
   ```bash
   cd d:\Project\sq-mobile\sq-mobile
   ionic serve
   ```

3. **Development Cycle**
   - Make changes
   - Test in browser (auto-reload)
   - Test on device (if needed)
   - Commit changes

4. **Adding New Features**
   - Create service (if needed)
   - Create page/component
   - Add routing
   - Implement UI
   - Connect to API
   - Test functionality

## 🔗 Related Resources

### Backend
- Location: `c:\laragon\sq-backend`
- API Docs: Backend project documentation

### Links
- [Ionic Docs](https://ionicframework.com/docs)
- [Angular Docs](https://angular.io/docs)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Ionicons](https://ionic.io/ionicons)

## 📞 Support & Contact

For issues or questions:
1. Check documentation files
2. Review backend API documentation
3. Check console logs (F12 in browser)
4. Review network requests in DevTools

---

**Version**: 1.0.0  
**Last Updated**: October 20, 2025  
**Status**: ✅ Foundation Complete, Ready for Feature Development
