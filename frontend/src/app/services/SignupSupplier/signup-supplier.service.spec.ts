import { TestBed } from '@angular/core/testing';

import { SignupSupplierService } from './signup-supplier.service';

describe('SignupSupplierService', () => {
  let service: SignupSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
