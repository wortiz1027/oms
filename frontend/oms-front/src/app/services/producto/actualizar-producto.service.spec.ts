import { TestBed } from '@angular/core/testing';

import { ActualizarProductoService } from './actualizar-producto.service';

describe('ActualizarProductoService', () => {
  let service: ActualizarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
