import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner,
  IonIcon,
  IonText,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner,
    IonIcon,
    IonText
  ]
})
export class LoginPage implements OnInit {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };

  showPassword = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({ personOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
    // Check if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle login form submission
   */
  async onLogin() {
    // Validate inputs
    if (!this.credentials.username || !this.credentials.password) {
      await this.presentToast('Silakan isi username dan password', 'warning');
      return;
    }

    // Show loading
    const loading = await this.loadingController.create({
      message: 'Memverifikasi...',
      spinner: 'crescent'
    });
    await loading.present();

    this.isLoading = true;

    // Call login API
    this.authService.login(this.credentials).subscribe({
      next: async (response) => {
        await loading.dismiss();
        this.isLoading = false;

        if (response.success) {
          await this.presentToast('Login berhasil!', 'success');
          this.router.navigate(['/home']);
        } else {
          await this.presentToast(response.message || 'Login gagal', 'danger');
        }
      },
      error: async (error) => {
        await loading.dismiss();
        this.isLoading = false;

        const errorMessage = error.message || 'Terjadi kesalahan saat login';
        await this.presentToast(errorMessage, 'danger');
      }
    });
  }

  /**
   * Navigate to forgot password (if implemented in backend)
   */
  onForgotPassword() {
    // You can implement this later
    this.presentToast('Fitur lupa password akan segera tersedia', 'medium');
  }

  /**
   * Present toast notification
   */
  private async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
