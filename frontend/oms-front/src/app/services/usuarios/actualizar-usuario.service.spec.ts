import { TestBed } from '@angular/core/testing';

import { ActualizarUsuarioService } from './actualizar-usuario.service';

describe('ActualizarUsuarioService', () => {
  let service: ActualizarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
