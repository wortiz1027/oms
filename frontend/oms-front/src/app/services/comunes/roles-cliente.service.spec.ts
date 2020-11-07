import { TestBed } from '@angular/core/testing';

import { RolesClienteService } from './roles-cliente.service';

describe('RolesClienteService', () => {
  let service: RolesClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
