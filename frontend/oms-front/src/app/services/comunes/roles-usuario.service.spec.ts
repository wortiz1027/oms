import { TestBed } from '@angular/core/testing';

import { RolesUsuarioService } from './roles-usuario.service';

describe('RolesClienteService', () => {
  let service: RolesUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
