import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsPage } from './steps-page';

describe('StepsPage', () => {
  let component: StepsPage;
  let fixture: ComponentFixture<StepsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StepsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
