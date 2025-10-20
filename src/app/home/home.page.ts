import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonAvatar,
  IonItem,
  IonLabel,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonText,
    IonAvatar,
    IonItem,
    IonLabel
  ],
})
export class HomePage implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ logOutOutline, personCircleOutline });
  }

  ngOnInit() {
    // Get current user
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  /**
   * Handle logout
   */
  async onLogout() {
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
            this.authService.logout().subscribe({
              next: () => {
                this.router.navigate(['/login']);
              },
              error: () => {
                // Navigate to login even if API call fails
                this.router.navigate(['/login']);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Get role display name in Indonesian
   */
  getRoleDisplayName(role: string): string {
    const roleMap: { [key: string]: string } = {
      'admin': 'Administrator',
      'kepala_sekolah': 'Kepala Sekolah',
      'guru': 'Guru',
      'orang_tua': 'Orang Tua',
      'siswa': 'Siswa'
    };
    return roleMap[role] || role;
  }
}
