import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductoEditComponent } from './detalle-producto-edit.component';

describe('DetalleProductoEditComponent', () => {
  let component: DetalleProductoEditComponent;
  let fixture: ComponentFixture<DetalleProductoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProductoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProductoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
