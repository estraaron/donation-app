import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrezcoDonationAppComponent } from 'crezco-donation-app'; // 📌 Importar el componente de la librería

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, CrezcoDonationAppComponent]
})
export class AppComponent {}
