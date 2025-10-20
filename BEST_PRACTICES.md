# Best Practices - SQ Mobile

Dokumentasi ini menjelaskan best practices yang diimplementasikan dalam aplikasi SQ Mobile.

## 📁 Arsitektur Aplikasi

### 1. Folder Structure (Feature-Based Organization)

```
src/app/
├── core/                           # Core module - singleton services
│   ├── guards/                     # Route guards
│   ├── interceptors/               # HTTP interceptors
│   ├── models/                     # TypeScript interfaces & types
│   └── services/                   # Singleton services (auth, api, ui)
├── pages/                          # Feature pages/modules
│   └── login/                      # Login feature
└── home/                           # Home page
```

**Why?**
- ✅ Clear separation of concerns
- ✅ Easy to maintain and scale
- ✅ Core functionality centralized
- ✅ Features are isolated and reusable

### 2. Core Module Pattern

#### Services (`core/services/`)
Singleton services yang digunakan di seluruh aplikasi:

```typescript
@Injectable({
  providedIn: 'root'  // Singleton pattern
})
export class AuthService { }
```

**Best Practices:**
- ✅ One responsibility per service
- ✅ Use RxJS for reactive programming
- ✅ Proper error handling
- ✅ Type safety with TypeScript

#### Models (`core/models/`)
TypeScript interfaces untuk type safety:

```typescript
export interface User {
  id: number;
  username: string;
  role: 'admin' | 'guru' | 'siswa';
  // ... other fields
}
```

**Benefits:**
- ✅ Compile-time type checking
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Prevents runtime errors

#### Guards (`core/guards/`)
Route protection dengan functional guards (Angular 15+):

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  // Guard logic
};
```

**Best Practices:**
- ✅ Use functional guards (modern Angular)
- ✅ Clear naming convention
- ✅ Single responsibility
- ✅ Return url for redirect after login

#### Interceptors (`core/interceptors/`)
HTTP request/response manipulation:

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req, next) {
    // Add token to request
  }
}
```

**Best Practices:**
- ✅ Automatic token attachment
- ✅ Centralized error handling
- ✅ 401 handling for expired tokens
- ✅ Request/response transformation

## 🔐 Authentication Best Practices

### 1. Token Management

**Storage:**
```typescript
// ✅ DO: Use localStorage for web
localStorage.setItem('auth_token', token);

// 🔜 TODO: Use Capacitor Storage for native apps
import { Preferences } from '@capacitor/preferences';
await Preferences.set({ key: 'auth_token', value: token });
```

**Security Considerations:**
- ✅ Token stored in localStorage (sufficient for most cases)
- ✅ HTTPS in production (prevents man-in-the-middle)
- ✅ Token expiration handled by backend
- 🔒 Consider Capacitor Secure Storage for sensitive data

### 2. Authentication Flow

```
User Input Credentials
       ↓
AuthService.login()
       ↓
POST /api/v1/auth/login
       ↓
Backend validates
       ↓
Store token & user data
       ↓
Update BehaviorSubject
       ↓
Navigate to /home
       ↓
Subsequent requests include token via interceptor
```

**Best Practices:**
- ✅ Centralized auth logic in AuthService
- ✅ BehaviorSubject for reactive user state
- ✅ Interceptor for automatic token attachment
- ✅ Guards for route protection

### 3. Session Management

```typescript
// Current user observable
public currentUser: Observable<User | null>;

// Check authentication status
isAuthenticated(): boolean {
  return !!this.getToken() && !!this.currentUserValue;
}
```

**Best Practices:**
- ✅ Observable pattern for reactive updates
- ✅ Check both token and user existence
- ✅ Clear data on logout
- ✅ Auto-logout on 401 errors

## 🛡️ Security Best Practices

### 1. Route Protection

```typescript
// Protected route
{
  path: 'home',
  canActivate: [authGuard],
  loadComponent: () => import('./home/home.page')
}

// Login guard (prevent access if authenticated)
{
  path: 'login',
  canActivate: [loginGuard],
  loadComponent: () => import('./login/login.page')
}
```

### 2. HTTP Security

```typescript
// In interceptor
request = request.clone({
  setHeaders: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
```

**Best Practices:**
- ✅ Always use HTTPS in production
- ✅ Validate response data
- ✅ Handle errors gracefully
- ✅ Don't expose sensitive data in errors

### 3. Input Validation

```typescript
// Frontend validation
if (!this.credentials.username || !this.credentials.password) {
  await this.presentToast('Silakan isi username dan password', 'warning');
  return;
}
```

**Best Practices:**
- ✅ Client-side validation for UX
- ✅ Server-side validation (primary)
- ✅ Sanitize user input
- ✅ Clear error messages

## 🎨 UI/UX Best Practices

### 1. Loading States

```typescript
async onLogin() {
  const loading = await this.loadingController.create({
    message: 'Memverifikasi...',
    spinner: 'crescent'
  });
  await loading.present();
  
  // API call
  
  await loading.dismiss();
}
```

**Best Practices:**
- ✅ Show loading for async operations
- ✅ Disable form during submission
- ✅ Clear loading states on error
- ✅ Timeout for long operations

### 2. User Feedback

```typescript
// Success
await this.presentToast('Login berhasil!', 'success');

// Error
await this.presentToast('Username atau password salah', 'danger');

// Warning
await this.presentToast('Silakan lengkapi form', 'warning');
```

**Best Practices:**
- ✅ Toast for quick feedback
- ✅ Alert for important messages
- ✅ Confirmation for destructive actions
- ✅ Clear, actionable messages

### 3. Responsive Design

```scss
// Mobile-first approach
.container {
  padding: 20px;
}

// Tablet and up
@media (min-width: 768px) {
  .container {
    max-width: 480px;
    margin: 0 auto;
  }
}
```

**Best Practices:**
- ✅ Mobile-first design
- ✅ Test on multiple devices
- ✅ Use Ionic components (responsive by default)
- ✅ Proper viewport configuration

## 🚀 Performance Best Practices

### 1. Lazy Loading

```typescript
// Routes with lazy loading
{
  path: 'login',
  loadComponent: () => import('./pages/login/login.page')
}
```

**Benefits:**
- ✅ Faster initial load
- ✅ Smaller bundle size
- ✅ Load on demand
- ✅ Better user experience

### 2. Change Detection

```typescript
// Use OnPush for better performance (when applicable)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 3. RxJS Best Practices

```typescript
// ✅ DO: Unsubscribe to prevent memory leaks
ngOnDestroy() {
  this.subscription.unsubscribe();
}

// ✅ BETTER: Use async pipe in template
// <div>{{ user$ | async }}</div>

// ✅ BETTER: Use takeUntil pattern
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## 📱 Mobile Best Practices

### 1. Native Features Integration

```typescript
// Capacitor plugins
import { App } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar } from '@capacitor/status-bar';
```

### 2. Platform-Specific Code

```typescript
import { Platform } from '@ionic/angular';

constructor(private platform: Platform) {
  if (this.platform.is('android')) {
    // Android-specific code
  }
  
  if (this.platform.is('ios')) {
    // iOS-specific code
  }
}
```

### 3. Offline Support (Future Enhancement)

```typescript
// Check network status
import { Network } from '@capacitor/network';

const status = await Network.getStatus();
if (!status.connected) {
  // Show offline message
}
```

## 🧪 Testing Best Practices

### 1. Unit Tests

```typescript
describe('AuthService', () => {
  it('should login user successfully', () => {
    // Test logic
  });
  
  it('should handle login error', () => {
    // Test error handling
  });
});
```

### 2. E2E Tests

```typescript
describe('Login Flow', () => {
  it('should navigate to home after successful login', () => {
    // Test complete flow
  });
});
```

## 📝 Code Quality Best Practices

### 1. TypeScript Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@angular-eslint/recommended"
  ]
}
```

### 3. Naming Conventions

```typescript
// ✅ DO
class UserService { }
interface User { }
const API_URL = 'https://api.example.com';

// ❌ DON'T
class userservice { }
interface user { }
const apiUrl = 'https://api.example.com';
```

**Conventions:**
- Classes: PascalCase
- Interfaces: PascalCase
- Variables/Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case

### 4. Component Organization

```typescript
@Component({ })
export class MyComponent {
  // 1. Public properties
  public user: User;
  
  // 2. Private properties
  private subscription: Subscription;
  
  // 3. Constructor
  constructor(private service: MyService) { }
  
  // 4. Lifecycle hooks
  ngOnInit() { }
  ngOnDestroy() { }
  
  // 5. Public methods
  public doSomething() { }
  
  // 6. Private methods
  private helperMethod() { }
}
```

## 🔄 State Management (Future Enhancement)

Untuk aplikasi yang lebih kompleks, pertimbangkan state management:

### Options:
1. **NgRx** - Redux pattern untuk Angular
2. **Akita** - Simpler alternative
3. **RxJS BehaviorSubject** - Current approach (sufficient untuk app sederhana)

## 🌍 Internationalization (i18n)

Untuk multi-language support:

```typescript
// ngx-translate
import { TranslateModule } from '@ngx-translate/core';

// Usage
<p>{{ 'LOGIN.TITLE' | translate }}</p>
```

## 📊 Analytics & Monitoring

```typescript
// Google Analytics / Firebase Analytics
import { AngularFireAnalytics } from '@angular/fire/analytics';

this.analytics.logEvent('login_success', { method: 'username' });
```

## 🚀 Deployment Best Practices

### 1. Environment Configuration

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com',
  enableAnalytics: true,
  enableLogging: false
};
```

### 2. Build Optimization

```bash
# Production build
ionic build --prod

# With specific configuration
ionic build --prod --configuration=production
```

### 3. App Store Preparation

```bash
# Android
ionic capacitor build android --prod

# iOS
ionic capacitor build ios --prod
```

## 📚 Additional Resources

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Best Practices](https://angular.io/guide/styleguide)
- [RxJS Best Practices](https://rxjs.dev/guide/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Remember**: Best practices evolve. Keep learning and adapting! 🚀
