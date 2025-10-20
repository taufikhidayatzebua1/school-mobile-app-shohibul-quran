import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  home,
  homeOutline,
  heart, 
  heartOutline,
  grid,
  gridOutline,
  notifications, 
  notificationsOutline,
  person,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ 
      home,
      homeOutline,
      heart, 
      heartOutline,
      grid,
      gridOutline,
      notifications, 
      notificationsOutline,
      person,
      personOutline
    });
  }
}
