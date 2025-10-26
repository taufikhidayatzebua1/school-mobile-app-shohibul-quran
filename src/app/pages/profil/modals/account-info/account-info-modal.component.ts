import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonLabel,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  close, 
  personOutline, 
  mailOutline, 
  cardOutline, 
  shieldCheckmarkOutline,
  schoolOutline,
  calendarOutline,
  locationOutline,
  callOutline,
  briefcaseOutline,
  cashOutline
} from 'ionicons/icons';
import { UserProfile } from '../../../../core/models/user.model';

@Component({
  selector: 'app-account-info-modal',
  templateUrl: './account-info-modal.component.html',
  styleUrls: ['./account-info-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class AccountInfoModalComponent {
  @Input() profile!: UserProfile;

  constructor(private modalCtrl: ModalController) {
    addIcons({ 
      close, 
      personOutline, 
      mailOutline, 
      cardOutline, 
      shieldCheckmarkOutline,
      schoolOutline,
      calendarOutline,
      locationOutline,
      callOutline,
      briefcaseOutline,
      cashOutline
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

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

  formatDate(dateString: string | null): string {
    if (!dateString) return 'Belum diverifikasi';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
  }
}
