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
    <ion-list class="profile-menu-list">
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
    :host {
      --width: 120px;
    }
    
    .profile-menu-list {
      padding: 0;
      margin: 0;
      min-width: 120px;
      max-width: 120px;
      width: 120px;
      
      ion-item {
        --padding-start: 8px;
        --padding-end: 8px;
        --min-height: 36px;
        font-size: 11px;
        
        ion-icon {
          font-size: 16px;
          margin-right: 6px;
        }
        
        ion-label {
          font-size: 11px;
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
