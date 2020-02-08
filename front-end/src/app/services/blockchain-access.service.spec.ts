import { TestBed } from '@angular/core/testing';

import { BlockchainAccessService } from './blockchain-access.service';

describe('BlockchainAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockchainAccessService = TestBed.get(BlockchainAccessService);
    expect(service).toBeTruthy();
  });
});
