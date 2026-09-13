import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  readonly supportedLanguages = ['uk', 'en'];
  readonly defaultLanguage = 'uk';

  initLanguage() {
    const lang = this.getLanguageFromUrl();

    if (this.supportedLanguages.includes(lang)) {
      this.translate.use(lang);
    } else {
      this.translate.use(this.defaultLanguage);
    }
  }

  changeLanguage(lang: string) {
    if (!this.supportedLanguages.includes(lang)) {
      return;
    }

    this.translate.use(lang);

    const url = this.router.url;
    const segments = url.split('/').filter(Boolean);

    if (segments.length === 0) {
      this.router.navigate(['/', lang]);
      return;
    }

    // перший segment — це поточна мова
    segments[0] = lang;

    this.router.navigate(['/', ...segments]);
  }

  private getLanguageFromUrl(): string {
    const segments = this.router.url.split('/').filter(Boolean);

    return segments[0] ?? this.defaultLanguage;
  }
}
