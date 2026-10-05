import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-steps-page',
  imports: [TranslatePipe],
  templateUrl: './steps-page.html',
  styleUrl: './steps-page.css',
})
export class StepsPage {}
