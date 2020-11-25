import { TestBed } from '@angular/core/testing';

import { BuscarCampaniaService } from './buscar-campania.service';

describe('BuscarCampaniaService', () => {
  let service: BuscarCampaniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarCampaniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
