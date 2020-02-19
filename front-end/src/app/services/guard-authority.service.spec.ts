import { TestBed } from '@angular/core/testing';

import { GuardAuthorityService } from './guard-authority.service';

describe('GuardAuthorityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardAuthorityService = TestBed.get(GuardAuthorityService);
    expect(service).toBeTruthy();
  });
});
