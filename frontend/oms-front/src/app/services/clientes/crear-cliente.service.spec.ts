import { TestBed } from '@angular/core/testing';

import { CrearClienteService } from './crear-cliente.service';

describe('CrearClienteService', () => {
  let service: CrearClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
