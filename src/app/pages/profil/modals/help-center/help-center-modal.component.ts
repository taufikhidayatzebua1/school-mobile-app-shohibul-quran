import { Component } from '@angular/core';
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
  IonAccordionGroup,
  IonAccordion,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, helpCircleOutline, chatbubbleOutline, mailOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-help-center-modal',
  templateUrl: './help-center-modal.component.html',
  styleUrls: ['./help-center-modal.component.scss'],
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
    IonLabel,
    IonAccordionGroup,
    IonAccordion
  ]
})
export class HelpCenterModalComponent {
  faqs = [
    {
      question: 'Bagaimana cara mengganti password?',
      answer: 'Anda dapat mengganti password melalui menu "Keamanan Akun" di halaman profil. Klik menu tersebut, lalu isi password lama dan password baru Anda.'
    },
    {
      question: 'Bagaimana cara memperbarui informasi profil?',
      answer: 'Informasi profil seperti nama, email dapat diperbarui melalui menu "Informasi Akun". Hubungi administrator jika ada data yang perlu diubah.'
    },
    {
      question: 'Apa yang harus dilakukan jika lupa password?',
      answer: 'Gunakan fitur "Lupa Password" di halaman login. Masukkan email Anda dan ikuti instruksi yang dikirimkan ke email tersebut.'
    },
    {
      question: 'Bagaimana cara menghubungi dukungan teknis?',
      answer: 'Anda dapat menghubungi kami melalui email support@sekolahquran.com atau telepon (021) 1234-5678 pada jam kerja (Senin-Jumat, 08:00-17:00 WIB).'
    },
    {
      question: 'Apakah data saya aman?',
      answer: 'Ya, kami menggunakan enkripsi dan standar keamanan terbaik untuk melindungi data pribadi Anda. Baca lebih lanjut di "Kebijakan Privasi".'
    }
  ];

  constructor(private modalCtrl: ModalController) {
    addIcons({ close, helpCircleOutline, chatbubbleOutline, mailOutline, callOutline });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
