import { TestBed } from '@angular/core/testing';

import { DataAccessService } from './data-access.service';

describe('DataAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAccessService = TestBed.get(DataAccessService);
    expect(service).toBeTruthy();
  });
});
