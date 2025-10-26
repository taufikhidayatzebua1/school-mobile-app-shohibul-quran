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
      padding: 0;
      margin: 0;
      
      ion-item {
        --padding-start: 16px;
        --padding-end: 16px;
        --min-height: 52px;
        --border-width: 0;
        --inner-border-width: 0;
        font-size: 16px;
        border: none;
        
        ion-icon {
          font-size: 24px;
          margin-right: 14px;
        }
        
        ion-label {
          font-size: 16px;
          margin: 0;
          white-space: nowrap;
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
