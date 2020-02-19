import { TestBed } from '@angular/core/testing';

import { GuardGenericService } from './guard-generic.service';

describe('GuardGenericService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardGenericService = TestBed.get(GuardGenericService);
    expect(service).toBeTruthy();
  });
});
