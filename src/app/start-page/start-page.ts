import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroParallax } from '../hero-parallax/hero-parallax';

@Component({
  selector: 'app-start-page',
  imports: [TranslatePipe, HeroParallax],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage {}
