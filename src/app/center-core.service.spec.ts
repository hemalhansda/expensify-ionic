import { TestBed } from '@angular/core/testing';

import { CenterCoreService } from './center-core.service';

describe('CenterCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CenterCoreService = TestBed.get(CenterCoreService);
    expect(service).toBeTruthy();
  });
});
