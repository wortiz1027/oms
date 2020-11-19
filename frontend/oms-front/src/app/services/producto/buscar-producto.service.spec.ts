import { TestBed } from '@angular/core/testing';

import { BuscarProductoService } from './buscar-producto.service';

describe('BuscarProductoService', () => {
  let service: BuscarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
