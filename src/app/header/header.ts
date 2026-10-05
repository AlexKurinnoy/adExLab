import { Component, DestroyRef, HostListener, inject, output } from '@angular/core';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type Language = 'ua' | 'en';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [TranslatePipe],
  styleUrl: './header.css',
})
export class Header {
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  currentLanguage: Language = 'en';

  languageChange = output<Language>();

  isScrolled = false;

  constructor() {
    this.currentLanguage = (this.translate.currentLang() as Language) || 'en';

    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.currentLanguage = event.lang as Language;
    });
  }

  changeLanguage(event: Event): void {
    event.preventDefault();

    const newLanguage: Language = this.currentLanguage === 'en' ? 'ua' : 'en';

    this.languageChange.emit(newLanguage);
    this.closeMenu();
  }
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
