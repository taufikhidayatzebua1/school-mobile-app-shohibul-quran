import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonList, 
  IonItem, 
  IonLabel, 
  IonIcon,
  PopoverController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile-menu-popover',
  template: `
    <ion-list class="profile-menu-list" lines="none">
      <ion-item button (click)="selectOption('edit')" detail="false">
        <ion-icon slot="start" name="create-outline"></ion-icon>
        <ion-label>Edit Profil</ion-label>
      </ion-item>
      <ion-item button (click)="selectOption('settings')" detail="false">
        <ion-icon slot="start" name="settings-outline"></ion-icon>
        <ion-label>Pengaturan</ion-label>
      </ion-item>
    </ion-list>
  `,
  styles: [`
    .profile-menu-list {
      padding: 4px 0;
      margin: 0;
      min-width: auto !important;
      width: fit-content !important;
      
      ion-item {
        --padding-start: 12px;
        --padding-end: 12px;
        --min-height: 44px;
        --border-width: 0;
        --inner-border-width: 0;
        --min-width: auto !important;
        font-size: 15px;
        border: none;
        width: fit-content !important;
        min-width: auto !important;
        
        ion-icon {
          font-size: 20px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        
        ion-label {
          font-size: 15px;
          margin: 0;
          white-space: nowrap;
          flex-shrink: 1;
        }
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  ]
})
export class ProfileMenuPopoverComponent {
  constructor(private popoverCtrl: PopoverController) {
    addIcons({ createOutline, settingsOutline });
  }

  selectOption(option: string) {
    this.popoverCtrl.dismiss(option);
  }
}
