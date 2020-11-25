import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductosCampaniaComponent } from './detalle-productos-campania.component';

describe('DetalleProductosCampaniaComponent', () => {
  let component: DetalleProductosCampaniaComponent;
  let fixture: ComponentFixture<DetalleProductosCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProductosCampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProductosCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
