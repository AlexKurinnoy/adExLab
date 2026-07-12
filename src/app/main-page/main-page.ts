import { Component } from '@angular/core';
import { ServicesPage } from '../services-page/services-page';
import { StartPage } from '../start-page/start-page';
import { StepsPage } from '../steps-page/steps-page';
import { ContactPage } from '../contact-page/contact-page';

@Component({
  selector: 'app-main-page',
  imports: [ServicesPage, StartPage, StartPage, ServicesPage, StepsPage, ContactPage],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
