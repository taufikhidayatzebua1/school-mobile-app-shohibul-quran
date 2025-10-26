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
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  close, 
  chevronBackOutline,
  informationCircleOutline, 
  codeSlashOutline, 
  buildOutline,
  calendarOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss'],
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
export class AboutModalComponent {
  appInfo = {
    name: 'Sekolah Quran',
    version: '1.0.0',
    buildNumber: '100',
    releaseDate: '1 Januari 2024'
  };

  constructor(private modalCtrl: ModalController) {
    addIcons({
      close,
      chevronBackOutline,
      informationCircleOutline,
      codeSlashOutline,
      buildOutline,
      calendarOutline
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
