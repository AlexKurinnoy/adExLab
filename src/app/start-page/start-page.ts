import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-start-page',
  imports: [TranslatePipe],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage {}
