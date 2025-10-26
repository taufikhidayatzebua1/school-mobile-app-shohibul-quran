import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonAvatar,
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonButtons,
  IonIcon,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  AlertController,
  ToastController,
  ModalController,
  PopoverController,
  AnimationController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/user.model';
import { AccountInfoModalComponent } from './modals/account-info/account-info-modal.component';
import { SecurityModalComponent } from './modals/security/security-modal.component';
import { HelpCenterModalComponent } from './modals/help-center/help-center-modal.component';
import { TermsModalComponent } from './modals/terms/terms-modal.component';
import { PrivacyModalComponent } from './modals/privacy/privacy-modal.component';
import { AboutModalComponent } from './modals/about/about-modal.component';
import { ProfileMenuPopoverComponent } from './components/profile-menu-popover.component';
import { 
  personOutline, 
  mailOutline, 
  callOutline, 
  locationOutline,
  schoolOutline,
  briefcaseOutline,
  cashOutline,
  calendarOutline,
  logOutOutline,
  refreshOutline,
  cardOutline,
  alertCircleOutline,
  chevronForwardOutline,
  shieldCheckmarkOutline,
  helpCircleOutline,
  documentTextOutline,
  lockClosedOutline,
  informationCircleOutline,
  ellipsisVertical,
  ellipsisVerticalOutline,
  createOutline,
  settingsOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonAvatar,
    IonLabel,
    IonItem,
    IonList,
    IonButton,
    IonIcon,
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
    IonButtons
  ],
})
export class ProfilPage implements OnInit {
  profile: UserProfile | null = null;
  isLoading = true;
  error: string | null = null;

  // Slide animations for modal
  slideFromRight = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateX(100%)' },
        { offset: 1, opacity: '1', transform: 'translateX(0)' }
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(300)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  slideToRight = (baseEl: HTMLElement) => {
    return this.slideFromRight(baseEl).direction('reverse');
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private animationCtrl: AnimationController
  ) {
    // Register icons
    addIcons({
      personOutline,
      mailOutline,
      callOutline,
      locationOutline,
      schoolOutline,
      briefcaseOutline,
      cashOutline,
      calendarOutline,
      logOutOutline,
      refreshOutline,
      cardOutline,
      alertCircleOutline,
      chevronForwardOutline,
      shieldCheckmarkOutline,
      helpCircleOutline,
      documentTextOutline,
      lockClosedOutline,
      informationCircleOutline,
      ellipsisVertical,
      ellipsisVerticalOutline,
      createOutline,
      settingsOutline
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  /**
   * Load user profile from API
   */
  loadProfile() {
    this.isLoading = true;
    this.error = null;

    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
        
        // Handle 401 Unauthorized specifically
        if (error?.status === 401) {
          this.error = 'Sesi Anda telah berakhir. Silakan login kembali.';
          this.showToast('Sesi berakhir, silakan login kembali', 'warning');
          // Redirect to login after a short delay
          setTimeout(() => {
            this.router.navigate(['/login'], { replaceUrl: true });
          }, 2000);
        } else {
          const errorMsg = error?.error?.message || error?.message || 'Gagal memuat profil';
          this.error = errorMsg;
          this.showToast(errorMsg, 'danger');
        }
      }
    });
  }

  /**
   * Refresh profile data
   */
  handleRefresh(event: any) {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        event.target.complete();
        this.showToast('Profil berhasil diperbarui', 'success');
      },
      error: (error) => {
        console.error('Error refreshing profile:', error);
        event.target.complete();
        this.showToast('Gagal memperbarui profil', 'danger');
      }
    });
  }

  /**
   * Open profile menu popover
   */
  async openProfileMenu(event: any) {
    const popover = await this.popoverCtrl.create({
      component: ProfileMenuPopoverComponent,
      event: event,
      translucent: true,
      showBackdrop: true,
      dismissOnSelect: true,
      size: 'auto',
      cssClass: 'profile-menu-popover'
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    
    if (data === 'edit') {
      this.editProfile();
    } else if (data === 'settings') {
      this.openSettings();
    }
  }

  /**
   * Edit profile (placeholder)
   */
  editProfile() {
    this.showToast('Fitur Edit Profil sedang dalam pengembangan', 'warning');
  }

  /**
   * Open settings (placeholder)
   */
  openSettings() {
    this.showToast('Fitur Pengaturan sedang dalam pengembangan', 'warning');
  }

  /**
   * Logout user with confirmation
   */
  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin keluar?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Logout',
          role: 'confirm',
          handler: () => {
            this.performLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Perform logout action
   */
  private performLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.showToast('Berhasil logout', 'success');
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Still navigate to login even if API fails
        this.showToast('Berhasil logout', 'success');
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    });
  }

  /**
   * Get avatar URL or default
   */
  getAvatarUrl(): string {
    if (this.profile?.siswa?.url_photo) {
      return this.profile.siswa.url_photo;
    }
    if (this.profile?.guru?.url_photo) {
      return this.profile.guru.url_photo;
    }
    if (this.profile?.orang_tua?.url_photo) {
      return this.profile.orang_tua.url_photo;
    }
    return 'assets/icon/default-avatar.png';
  }

  /**
   * Get display name
   */
  getDisplayName(): string {
    if (this.profile?.siswa?.nama) {
      return this.profile.siswa.nama;
    }
    if (this.profile?.guru?.nama) {
      return this.profile.guru.nama;
    }
    if (this.profile?.orang_tua?.nama) {
      return this.profile.orang_tua.nama;
    }
    return this.profile?.name || 'User';
  }

  /**
   * Get role display text
   */
  getRoleText(): string {
    const roleMap: { [key: string]: string } = {
      'siswa': 'Siswa',
      'orang-tua': 'Orang Tua',
      'guru': 'Guru',
      'wali-kelas': 'Wali Kelas',
      'kepala-sekolah': 'Kepala Sekolah',
      'tata-usaha': 'Tata Usaha',
      'yayasan': 'Yayasan',
      'admin': 'Admin',
      'super-admin': 'Super Admin'
    };
    return roleMap[this.profile?.role || ''] || this.profile?.role || 'User';
  }

  /**
   * Format date to Indonesian format
   */
  formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  }

  /**
   * Show toast message
   */
  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  /**
   * Open Account Info Modal
   */
  async openAccountInfo() {
    if (!this.profile) return;

    const modal = await this.modalCtrl.create({
      component: AccountInfoModalComponent,
      componentProps: {
        profile: this.profile
      },
      presentingElement: await this.modalCtrl.getTop(),
      cssClass: 'slide-modal',
      enterAnimation: this.slideFromRight,
      leaveAnimation: this.slideToRight
    });

    await modal.present();
  }

  /**
   * Open Security Modal
   */
  async openSecurity() {
    const modal = await this.modalCtrl.create({
      component: SecurityModalComponent,
      presentingElement: await this.modalCtrl.getTop(),
      cssClass: 'slide-modal',
      enterAnimation: this.slideFromRight,
      leaveAnimation: this.slideToRight
    });

    await modal.present();
  }

  /**
   * Open Help Center Modal
   */
  async openHelpCenter() {
    const modal = await this.modalCtrl.create({
      component: HelpCenterModalComponent,
      presentingElement: await this.modalCtrl.getTop(),
      cssClass: 'slide-modal',
      enterAnimation: this.slideFromRight,
      leaveAnimation: this.slideToRight
    });

    await modal.present();
  }

  /**
   * Open Terms Modal
   */
  async openTerms() {
    const modal = await this.modalCtrl.create({
      component: TermsModalComponent,
      presentingElement: await this.modalCtrl.getTop(),
      cssClass: 'slide-modal',
      enterAnimation: this.slideFromRight,
      leaveAnimation: this.slideToRight
    });

    await modal.present();
  }

  /**
   * Open Privacy Modal
   */
  async openPrivacy() {
    const modal = await this.modalCtrl.create({
      component: PrivacyModalComponent,
      presentingElement: await this.modalCtrl.getTop(),
      cssClass: 'slide-modal',
      enterAnimation: this.slideFromRight,
      leaveAnimation: this.slideToRight
    });

    await modal.present();
  }

  /**
   * Open About Modal
   */
  async openAbout() {
    const modal = await this.modalCtrl.create({
      component: AboutModalComponent,
      presentingElement: await this.modalCtrl.getTop(),
      cssClass: 'slide-modal',
      enterAnimation: this.slideFromRight,
      leaveAnimation: this.slideToRight
    });

    await modal.present();
  }
}
