import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-page',
  imports: [TranslatePipe],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {}
