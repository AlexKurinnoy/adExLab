import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('adExLabFront');

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
  ) {
    this.languageService.initLanguage();
    this.translate.setFallbackLang('en');
  }

  changeLang(lang: 'uk' | 'en') {
    this.languageService.changeLanguage(lang);
  }
}
