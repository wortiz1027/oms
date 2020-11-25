import { TestBed } from '@angular/core/testing';

import { CrearCampaniaService } from './crear-campania.service';

describe('CrearCampaniaService', () => {
  let service: CrearCampaniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearCampaniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
