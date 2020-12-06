import { TestBed } from '@angular/core/testing';

import { CancelarOrdenBpmService } from './cancelar-orden-bpm.service';

describe('CancelarOrdenBpmService', () => {
  let service: CancelarOrdenBpmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelarOrdenBpmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
