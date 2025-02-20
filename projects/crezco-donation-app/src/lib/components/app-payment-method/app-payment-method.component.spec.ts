import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPaymentMethodComponent } from './app-payment-method.component';

describe('AppPaymentMethodComponent', () => {
  let component: AppPaymentMethodComponent;
  let fixture: ComponentFixture<AppPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPaymentMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
