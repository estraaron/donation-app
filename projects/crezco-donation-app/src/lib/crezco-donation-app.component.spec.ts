import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrezcoDonationAppComponent } from './crezco-donation-app.component';

describe('CrezcoDonationAppComponent', () => {
  let component: CrezcoDonationAppComponent;
  let fixture: ComponentFixture<CrezcoDonationAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrezcoDonationAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrezcoDonationAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
