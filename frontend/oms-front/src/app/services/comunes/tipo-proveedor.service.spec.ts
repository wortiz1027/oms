import { TestBed } from '@angular/core/testing';

import { TipoProveedorService } from './tipo-proveedor.service';

describe('TipoProveedorService', () => {
  let service: TipoProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
