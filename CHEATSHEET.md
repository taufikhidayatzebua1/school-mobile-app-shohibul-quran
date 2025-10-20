# 🚀 SQ Mobile - Command Cheatsheet

Quick reference untuk command-command yang sering digunakan dalam development SQ Mobile.

## 📱 Ionic Commands

### Development Server
```powershell
# Start dev server
ionic serve

# Start with specific port
ionic serve --port=8200

# Start dengan external access (untuk test di device lain)
ionic serve --external

# Start dengan proxy (untuk CORS issues)
ionic serve --proxy-config proxy.conf.json

# Start tanpa auto-open browser
ionic serve --no-open
```

### Building
```powershell
# Development build
ionic build

# Production build
ionic build --prod

# Build dengan configuration tertentu
ionic build --configuration=production
```

### Code Generation
```powershell
# Generate page
ionic generate page pages/NamaPage
ionic g page pages/NamaPage                    # shorthand

# Generate component
ionic generate component components/NamaComponent
ionic g component components/NamaComponent     # shorthand

# Generate service
ionic generate service core/services/NamaService
ionic g service core/services/NamaService      # shorthand

# Generate guard
ionic generate guard core/guards/NamaGuard
ionic g guard core/guards/NamaGuard            # shorthand

# Generate interface
ionic generate interface core/models/NamaModel
ionic g interface core/models/NamaModel        # shorthand
```

## 📱 Capacitor Commands

### Platform Management
```powershell
# Add platforms
ionic capacitor add android
ionic capacitor add ios

# Copy web assets to native projects
ionic capacitor copy

# Copy to specific platform
ionic capacitor copy android
ionic capacitor copy ios

# Update native projects
ionic capacitor update

# Sync (build + copy)
ionic capacitor sync
ionic capacitor sync android
ionic capacitor sync ios
```

### Opening Native IDEs
```powershell
# Open Android Studio
ionic capacitor open android

# Open Xcode (macOS only)
ionic capacitor open ios
```

### Running on Device/Emulator
```powershell
# Run on Android
ionic capacitor run android

# Run on Android with live reload
ionic capacitor run android --livereload --external

# Run on iOS
ionic capacitor run ios

# Run on iOS with live reload
ionic capacitor run ios --livereload --external
```

## 🛠️ NPM Commands

### Dependencies
```powershell
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name

# Install specific version
npm install package-name@1.2.3

# Update packages
npm update

# Check outdated packages
npm outdated

# Remove package
npm uninstall package-name
```

### Scripts
```powershell
# Run script from package.json
npm run script-name

# Common scripts
npm start                    # Usually ionic serve
npm run build               # Build project
npm test                    # Run tests
npm run lint                # Run linter
```

## 🧪 Testing Commands

### Unit Tests
```powershell
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests
```powershell
# Run E2E tests
npm run e2e

# Run E2E tests in headless mode
npm run e2e:headless
```

## 🔍 Debugging Commands

### Ionic Info
```powershell
# Show environment info
ionic info

# Show detailed info
ionic info --verbose
```

### Check Configuration
```powershell
# Check Ionic configuration
ionic config get

# Check specific config
ionic config get app_id

# Set configuration
ionic config set key value
```

### Clear Cache
```powershell
# Clear Ionic cache
ionic cache clear

# Clear npm cache
npm cache clean --force

# Remove node_modules dan reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

## 📦 Build & Deploy Commands

### Android
```powershell
# Build Android debug APK
cd android
.\gradlew assembleDebug

# Build Android release APK
.\gradlew assembleRelease

# Build Android App Bundle (for Play Store)
.\gradlew bundleRelease
```

### iOS (macOS only)
```powershell
# Build iOS
xcodebuild -workspace App.xcworkspace -scheme App -configuration Release
```

## 🔧 Git Commands (Quick Reference)

```powershell
# Initialize git (jika belum)
git init

# Check status
git status

# Add files
git add .
git add filename.ts

# Commit
git commit -m "Commit message"

# Push to remote
git push origin branch-name

# Pull from remote
git pull origin branch-name

# Create new branch
git checkout -b new-branch-name

# Switch branch
git checkout branch-name

# Merge branch
git merge branch-name

# Check logs
git log
git log --oneline
```

## 🗄️ Database Commands (untuk backend)

```powershell
# Navigate ke backend
cd c:\laragon\sq-backend

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Fresh migrate (drop all tables & re-migrate)
php artisan migrate:fresh

# Fresh migrate with seed
php artisan migrate:fresh --seed
```

## 🚀 Backend Commands

```powershell
# Navigate ke backend
cd c:\laragon\sq-backend

# Start Laravel server
php artisan serve

# Start with specific port
php artisan serve --port=8080

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Generate key
php artisan key:generate

# Run tests
php artisan test
```

## 💻 PowerShell Shortcuts

```powershell
# Clear terminal
cls

# List directory
ls
dir

# Change directory
cd path\to\directory

# Go back one directory
cd ..

# Create directory
mkdir directory-name

# Remove directory (empty)
rmdir directory-name

# Remove directory (with contents)
Remove-Item -Recurse -Force directory-name

# Create file
New-Item filename.txt

# View file content
cat filename.txt
Get-Content filename.txt

# Open file in editor
code filename.txt          # VSCode
notepad filename.txt       # Notepad

# Find process using port
netstat -ano | findstr :8100

# Kill process by PID
taskkill /PID 1234 /F
```

## 🌐 Network Commands

```powershell
# Show network interfaces
ipconfig

# Test connection
ping google.com

# Test port
Test-NetConnection localhost -Port 8100

# Show listening ports
netstat -an | findstr LISTENING
```

## 📝 Useful Ionic Commands

### Plugins
```powershell
# List installed Capacitor plugins
ionic capacitor ls

# Update plugin
npm install @capacitor/plugin-name@latest
```

### Resources
```powershell
# Generate icon and splash screen
ionic capacitor resources

# Generate specific resource
ionic capacitor resources android --icon
ionic capacitor resources ios --splash
```

### Documentation
```powershell
# Open Ionic docs
ionic docs

# Open component docs
ionic docs ion-button

# Search docs
ionic docs --search "tabs"
```

## 🔄 Development Workflow Commands

### Typical Daily Workflow
```powershell
# 1. Start backend
cd c:\laragon\sq-backend
php artisan serve

# 2. Start mobile app (new terminal)
cd d:\Project\sq-mobile\sq-mobile
ionic serve

# 3. Make changes, test, commit
git add .
git commit -m "Description of changes"
git push origin dev
```

### Before Deployment
```powershell
# 1. Test build
ionic build --prod

# 2. Update version
# Edit package.json, ionic.config.json, capacitor.config.ts

# 3. Build for platforms
ionic capacitor sync
ionic capacitor build android
ionic capacitor build ios

# 4. Generate signed APK/IPA
# Follow platform-specific steps
```

## 🆘 Troubleshooting Commands

### Ionic Issues
```powershell
# Reinstall Ionic CLI
npm uninstall -g @ionic/cli
npm install -g @ionic/cli

# Clear Ionic cache
ionic cache clear

# Repair Ionic
ionic repair
```

### Node/NPM Issues
```powershell
# Clear NPM cache
npm cache clean --force

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Update NPM
npm install -g npm@latest
```

### Capacitor Issues
```powershell
# Remove and re-add platform
ionic capacitor remove android
ionic capacitor add android

# Reinstall plugins
npm install @capacitor/core @capacitor/cli --save
```

## 📚 Documentation Commands

### Generate Docs
```powershell
# Generate Angular documentation (with Compodoc)
npm install -g @compodoc/compodoc
compodoc -p tsconfig.json -s
```

## 🎯 Production Build Checklist

```powershell
# 1. Update version
# Edit: package.json, ionic.config.json

# 2. Test build locally
ionic build --prod

# 3. Test on device
ionic capacitor sync
ionic capacitor run android

# 4. Generate release build
ionic capacitor build android --prod

# 5. Sign APK/AAB (for Android)
# Use Android Studio or jarsigner

# 6. Submit to stores
# Google Play Store / Apple App Store
```

---

**Tips**: 
- Use `Tab` for autocomplete
- Use `Ctrl+C` to stop running processes
- Use `Ctrl+R` to search command history
- Use `↑` and `↓` arrows to navigate command history

**Quick Access**:
- Backend: `cd c:\laragon\sq-backend`
- Mobile: `cd d:\Project\sq-mobile\sq-mobile`

---

**Simpan file ini untuk referensi cepat! 📌**
