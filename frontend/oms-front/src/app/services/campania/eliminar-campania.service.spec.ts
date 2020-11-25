import { TestBed } from '@angular/core/testing';

import { EliminarCampaniaService } from './eliminar-campania.service';

describe('EliminarCampaniaService', () => {
  let service: EliminarCampaniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarCampaniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
