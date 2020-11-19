import { TestBed } from '@angular/core/testing';

import { CrearImagenService } from './crear-imagen.service';

describe('CrearImagenService', () => {
  let service: CrearImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
