import { TestBed } from '@angular/core/testing';

import { AgregarProductService } from './agregar-product.service';

describe('AgregarProductService', () => {
  let service: AgregarProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
