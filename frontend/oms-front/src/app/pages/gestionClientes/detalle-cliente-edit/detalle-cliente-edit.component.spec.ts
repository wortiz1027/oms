import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleClienteEditComponent } from './detalle-cliente-edit.component';

describe('DetalleClienteEditComponent', () => {
  let component: DetalleClienteEditComponent;
  let fixture: ComponentFixture<DetalleClienteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleClienteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleClienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
