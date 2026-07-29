import { Component, signal, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { TranslateService } from '@ngx-translate/core';

const AVAILABLE_LANGUAGES = ['uk', 'en'] as const;

type Language = (typeof AVAILABLE_LANGUAGES)[number];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('adExLabFront');

  constructor(private translate: TranslateService) {
    afterNextRender(() => {
      const lang = this.getInitialLanguage();

      this.translate.setFallbackLang('en');

      this.translate.use(lang);
    });
  }

  changeLang(lang: Language) {
    this.translate.use(lang);

    localStorage.setItem('lang', lang);
  }

  private getInitialLanguage(): Language {
    // 1. Мова з попередньої сесії
    const savedLanguage = localStorage.getItem('lang') as Language | null;

    if (savedLanguage && AVAILABLE_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }

    // 2. Мова браузера
    const browserLanguage = navigator.language.split('-')[0].toLowerCase();

    if (AVAILABLE_LANGUAGES.includes(browserLanguage as Language)) {
      return browserLanguage as Language;
    }

    // 3. Fallback
    return 'en';
  }
}
