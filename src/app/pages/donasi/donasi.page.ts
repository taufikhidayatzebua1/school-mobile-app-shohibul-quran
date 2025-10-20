import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-donasi',
  templateUrl: './donasi.page.html',
  styleUrls: ['./donasi.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class DonasiPage {}
