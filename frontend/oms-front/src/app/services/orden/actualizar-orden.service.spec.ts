import { TestBed } from '@angular/core/testing';

import { ActualizarOrdenService } from './actualizar-orden.service';

describe('ActualizarOrdenService', () => {
  let service: ActualizarOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
