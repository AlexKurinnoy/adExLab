import { Component, HostListener } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [TranslatePipe],
  styleUrl: './header.css',
})
export class Header {
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang() || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
  }

  toggleLanguage(event: Event) {
    event.preventDefault();

    const newLanguage = this.currentLanguage === 'en' ? 'uk' : 'en';

    this.translate.use(newLanguage);
  }
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
