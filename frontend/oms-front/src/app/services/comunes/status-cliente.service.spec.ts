import { TestBed } from '@angular/core/testing';

import { StatusClienteService } from './status-cliente.service';

describe('StatusClienteService', () => {
  let service: StatusClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
