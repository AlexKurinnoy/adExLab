import { Component, computed, effect, inject, signal } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';

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

  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  readonly lang = computed<Language>(() => {
    const navigation = this.router.lastSuccessfulNavigation();

    const url = navigation?.finalUrl
      ? this.router.serializeUrl(navigation.finalUrl)
      : this.router.url;

    const segment = url.split('/').filter(Boolean)[0];

    return this.isLanguage(segment) ? segment : 'en';
  });

  constructor() {
    this.translate.setFallbackLang('en');

    effect(() => {
      this.translate.use(this.lang());
    });
  }

  changeLang(lang: Language): void {
    const newUrl = this.router.url.replace(/^\/(uk|en)(?=\/|$)/, `/${lang}`);

    void this.router.navigateByUrl(newUrl);
  }

  private isLanguage(value: string | undefined): value is Language {
    return !!value && AVAILABLE_LANGUAGES.includes(value as Language);
  }
}
