import { TestBed } from '@angular/core/testing';

import { AvStateService } from './av-state.service';

describe('AvStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvStateService = TestBed.get(AvStateService);
    expect(service).toBeTruthy();
  });
});
