import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-services-page',
  imports: [TranslatePipe],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {}
