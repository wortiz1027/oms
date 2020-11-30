import { TestBed } from '@angular/core/testing';

import { BuscarProveedorService } from './buscar-proveedor.service';

describe('BuscarProveedorService', () => {
  let service: BuscarProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
