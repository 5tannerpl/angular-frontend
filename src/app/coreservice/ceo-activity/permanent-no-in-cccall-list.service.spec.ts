import { TestBed } from '@angular/core/testing';

import { PermanentNoInCccallListService } from './permanent-no-in-cccall-list.service';

describe('PermanentNoInCccallListService', () => {
  let service: PermanentNoInCccallListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermanentNoInCccallListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
