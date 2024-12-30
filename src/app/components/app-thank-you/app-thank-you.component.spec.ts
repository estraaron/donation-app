import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThankYouComponent } from './app-thank-you.component';

describe('AppThankYouComponent', () => {
  let component: AppThankYouComponent;
  let fixture: ComponentFixture<AppThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppThankYouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
