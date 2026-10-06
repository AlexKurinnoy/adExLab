import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroParallax } from './hero-parallax';

describe('HeroParallax', () => {
  let component: HeroParallax;
  let fixture: ComponentFixture<HeroParallax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroParallax],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroParallax);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
