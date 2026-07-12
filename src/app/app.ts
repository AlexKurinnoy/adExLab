import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { StartPage } from './start-page/start-page';
import { ServicesPage } from './services-page/services-page';
import { MainPage } from './main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('adExLabFront');
}
