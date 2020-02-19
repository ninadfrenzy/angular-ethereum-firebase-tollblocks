import { TestBed } from '@angular/core/testing';

import { GuardCustomerService } from './guard-customer.service';

describe('GuardCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardCustomerService = TestBed.get(GuardCustomerService);
    expect(service).toBeTruthy();
  });
});
