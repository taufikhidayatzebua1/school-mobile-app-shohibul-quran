# Tab Icons - Outline & Fill

## Perubahan yang Dilakukan

Mengubah icon tabs agar menggunakan:
- **Outline** untuk tab yang **tidak aktif** (inactive)
- **Fill** untuk tab yang **aktif** (active)

## Files yang Diubah

### 1. `tabs.page.ts`
- Import semua icon outline dan fill:
  - `home` & `homeOutline`
  - `heart` & `heartOutline`
  - `newspaper` & `newspaperOutline`
  - `notifications` & `notificationsOutline`
  - `person` & `personOutline`
- Register semua icon di `addIcons()`

### 2. `tabs.page.html`
- Setiap tab button sekarang memiliki 2 icon:
  - `icon-outline` - Untuk state tidak aktif
  - `icon-fill` - Untuk state aktif
  
Contoh:
```html
<ion-tab-button tab="home">
  <ion-icon name="home-outline" class="icon-outline"></ion-icon>
  <ion-icon name="home" class="icon-fill"></ion-icon>
</ion-tab-button>
```

### 3. `tabs.page.scss`
- CSS untuk mengatur visibility icon berdasarkan state:
  - Default: `icon-outline` visible, `icon-fill` hidden
  - Selected (`.tab-selected`): `icon-outline` hidden, `icon-fill` visible
- Transition smooth dengan `opacity 0.2s ease-in-out`
- Position absolute untuk overlap kedua icon
- Dark mode support

## Cara Kerja

1. **Default State (Tidak Aktif):**
   ```scss
   .icon-outline { opacity: 1; } // Terlihat
   .icon-fill { opacity: 0; }    // Tersembunyi
   ```

2. **Active State (Tab Selected):**
   ```scss
   &.tab-selected {
     .icon-outline { opacity: 0; } // Tersembunyi
     .icon-fill { opacity: 1; }    // Terlihat
   }
   ```

3. Ionic secara otomatis menambahkan class `.tab-selected` pada tab yang aktif

## Visual Effect

- ✨ Smooth transition saat berpindah tab
- 🎨 Icon outline (tidak aktif) = abu-abu (`--ion-color-medium`)
- 🎨 Icon fill (aktif) = primary color (`--ion-color-primary`)
- 📱 Responsive dan mendukung safe area (iOS notch)
- 🌙 Dark mode support

## Testing

1. Buka aplikasi
2. Klik berbagai tab (Home, Donasi, Feed, Notifikasi, Profil)
3. Perhatikan icon berubah dari outline → fill saat diklik
4. Icon yang tidak aktif tetap outline

## Icon Mapping

| Tab | Outline Icon | Fill Icon |
|-----|-------------|-----------|
| Home | `home-outline` | `home` |
| Donasi | `heart-outline` | `heart` |
| Feed | `newspaper-outline` | `newspaper` |
| Notifikasi | `notifications-outline` | `notifications` |
| Profil | `person-outline` | `person` |

## Result

Sekarang tabs memiliki visual feedback yang lebih jelas:
- Tab tidak aktif: Icon dengan garis luar (outline) ⭕
- Tab aktif: Icon terisi penuh (fill) ⚫

Ini memberikan UX yang lebih baik dan lebih modern! 🚀
