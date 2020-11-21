import { TestBed } from '@angular/core/testing';

import { EliminarProductoService } from './eliminar-producto.service';

describe('EliminarProductoService', () => {
  let service: EliminarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
