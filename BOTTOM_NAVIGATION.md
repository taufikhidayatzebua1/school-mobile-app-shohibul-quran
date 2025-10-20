# Bottom Navigation Implementation

## Structure

Aplikasi sekarang menggunakan **Tabs Layout** dengan bottom navigation bar yang minimalis dan modern.

### Tab Navigation Structure

```
/tabs (Parent dengan bottom navigation)
  ├── /home - Halaman Home
  ├── /donasi - Halaman Donasi
  ├── /feed - Halaman Feed
  ├── /notifikasi - Halaman Notifikasi
  └── /profil - Halaman Profil
```

## Files Created

### 1. Tabs Layout
- `src/app/tabs/tabs.page.html` - Template tabs dengan bottom navigation
- `src/app/tabs/tabs.page.ts` - Tabs component logic
- `src/app/tabs/tabs.page.scss` - Styling untuk bottom navigation

### 2. Page Components (Placeholder)
All pages are minimalist with centered title:

- **Home**: `src/app/home/`
- **Donasi**: `src/app/pages/donasi/`
- **Feed**: `src/app/pages/feed/`
- **Notifikasi**: `src/app/pages/notifikasi/`
- **Profil**: `src/app/pages/profil/`

## Bottom Navigation Bar

### Icons Used
| Tab | Icon | Ionicon Name |
|-----|------|--------------|
| Home | 🏠 | `home` |
| Donasi | ❤️ | `heart` |
| Feed | 📰 | `newspaper` |
| Notifikasi | 🔔 | `notifications` |
| Profil | 👤 | `person` |

### Styling
- **Background**: Clean white with subtle shadow
- **Active Color**: Primary color (blue)
- **Inactive Color**: Medium gray
- **Icon Size**: 24px
- **Label**: Small, 11px font
- **Shadow**: Subtle top shadow for depth

## Routing

### Updated Routes
```typescript
{
  path: 'tabs',
  loadComponent: () => import('./tabs/tabs.page'),
  canActivate: [authGuard],
  children: [
    { path: 'home', loadComponent: ... },
    { path: 'donasi', loadComponent: ... },
    { path: 'feed', loadComponent: ... },
    { path: 'notifikasi', loadComponent: ... },
    { path: 'profil', loadComponent: ... },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]
}
```

### Login Flow
```
Login Success → /tabs/home (with bottom nav)
```

## Design Philosophy

### ✨ Minimalist & Modern
- **Clean**: No clutter, only essentials
- **Spacious**: Generous whitespace
- **Centered**: Content centered for focus
- **Lightweight**: Thin fonts (300 weight)
- **Subtle Colors**: Medium gray for non-intrusive design

### 📱 Mobile-First
- **Bottom Navigation**: Easy thumb reach
- **Safe Area**: Respects device safe areas
- **Touch-Friendly**: Large tap targets
- **Clear Labels**: Text + icons for clarity

## Page Structure

Each page follows this minimal template:

```html
<ion-content [fullscreen]="true" class="ion-padding">
  <div class="page-container">
    <h1>Page Title</h1>
  </div>
</ion-content>
```

```scss
.page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  
  h1 {
    font-size: 32px;
    font-weight: 300;
    color: var(--ion-color-medium);
    margin: 0;
  }
}
```

## Next Steps

### To Add Content to Pages:

1. **Home Page**
   - Dashboard widgets
   - Quick actions
   - Statistics

2. **Donasi Page**
   - Donation campaigns
   - Payment methods
   - History

3. **Feed Page**
   - News/updates
   - Announcements
   - Activities

4. **Notifikasi Page**
   - Notification list
   - Read/unread status
   - Actions

5. **Profil Page**
   - User information
   - Settings
   - Logout button

### Adding New Content

Simply edit the respective page files:
```
src/app/pages/{page-name}/{page-name}.page.html
src/app/pages/{page-name}/{page-name}.page.ts
src/app/pages/{page-name}/{page-name}.page.scss
```

## Features

### ✅ Implemented
- Bottom navigation with 5 tabs
- Minimalist page design
- Auth guard on tabs
- Login redirect to tabs
- Clean, modern styling
- Standalone components
- Lazy loading

### 🚀 Ready for Development
- Pages are placeholder, ready for content
- Routing configured
- Auth protection in place
- Easy to extend

## Usage

### Navigate Between Tabs
Click on any tab in the bottom navigation to switch pages.

### Development
Start the dev server and navigate after login:
```bash
ionic serve
```

The bottom navigation will appear on all tab pages, providing consistent navigation throughout the app.

## Customization

### Change Tab Icons
Edit `src/app/tabs/tabs.page.html`:
```html
<ion-tab-button tab="home">
  <ion-icon name="home"></ion-icon> <!-- Change icon name -->
  <ion-label>Home</ion-label>
</ion-tab-button>
```

### Change Tab Colors
Edit `src/app/tabs/tabs.page.scss`:
```scss
ion-tab-button {
  --color: var(--ion-color-medium);         // Inactive color
  --color-selected: var(--ion-color-primary); // Active color
}
```

### Add New Tab
1. Create new page in `src/app/pages/`
2. Add route in `app.routes.ts`
3. Add tab button in `tabs.page.html`
4. Import icon in `tabs.page.ts`

---

**Result**: Clean, minimalist mobile app with modern bottom navigation! 🎉
