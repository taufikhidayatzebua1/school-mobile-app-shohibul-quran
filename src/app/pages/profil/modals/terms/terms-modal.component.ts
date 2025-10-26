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
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent
  ]
})
export class TermsModalComponent {
  constructor(private modalCtrl: ModalController) {
    addIcons({ 
      close, 
      chevronBackOutline 
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
