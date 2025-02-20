import { TestBed } from '@angular/core/testing';

import { CrezcoDonationAppService } from './crezco-donation-app.service';

describe('CrezcoDonationAppService', () => {
  let service: CrezcoDonationAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrezcoDonationAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
