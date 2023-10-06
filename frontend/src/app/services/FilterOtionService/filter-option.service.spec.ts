import { TestBed } from '@angular/core/testing';

import { FilterOptionService } from './filter-option.service';

describe('FilterOptionService', () => {
  let service: FilterOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
