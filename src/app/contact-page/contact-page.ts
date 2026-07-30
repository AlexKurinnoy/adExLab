import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactComponent } from '../contact/contact';

@Component({
  selector: 'app-contact-page',
  imports: [ContactComponent, TranslatePipe],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {}
