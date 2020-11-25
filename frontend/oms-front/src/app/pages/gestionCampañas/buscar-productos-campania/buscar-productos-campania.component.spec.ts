import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarProductosCampaniaComponent } from './buscar-productos-campania.component';

describe('BuscarProductosCampaniaComponent', () => {
  let component: BuscarProductosCampaniaComponent;
  let fixture: ComponentFixture<BuscarProductosCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarProductosCampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarProductosCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
