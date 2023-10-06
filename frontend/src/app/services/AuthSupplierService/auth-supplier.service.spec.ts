import { TestBed } from '@angular/core/testing';

import { AuthSupplierService } from './auth-supplier.service';

describe('AuthSupplierService', () => {
  let service: AuthSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
