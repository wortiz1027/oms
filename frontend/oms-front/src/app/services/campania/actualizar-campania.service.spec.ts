import { TestBed } from '@angular/core/testing';

import { ActualizarCampaniaService } from './actualizar-campania.service';

describe('ActualizarCampaniaService', () => {
  let service: ActualizarCampaniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarCampaniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
