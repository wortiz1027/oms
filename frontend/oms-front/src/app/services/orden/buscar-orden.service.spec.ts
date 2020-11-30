import { TestBed } from '@angular/core/testing';

import { BuscarOrdenService } from './buscar-orden.service';

describe('BuscarOrdenService', () => {
  let service: BuscarOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
