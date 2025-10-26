import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  ModalController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  close, 
  chevronBackOutline,
  lockClosedOutline, 
  keyOutline,
  shieldCheckmarkOutline,
  eyeOutline, 
  eyeOffOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-security-modal',
  templateUrl: './security-modal.component.html',
  styleUrls: ['./security-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonInput
  ]
})
export class SecurityModalComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    addIcons({
      close,
      chevronBackOutline,
      lockClosedOutline,
      keyOutline,
      shieldCheckmarkOutline,
      eyeOutline,
      eyeOffOutline
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async changePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      await this.showToast('Semua field harus diisi', 'warning');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      await this.showToast('Password baru tidak cocok', 'danger');
      return;
    }

    if (this.newPassword.length < 8) {
      await this.showToast('Password minimal 8 karakter', 'warning');
      return;
    }

    // TODO: Implement password change API call
    await this.showToast('Fitur ganti password akan segera hadir', 'primary');
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' | 'primary' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
