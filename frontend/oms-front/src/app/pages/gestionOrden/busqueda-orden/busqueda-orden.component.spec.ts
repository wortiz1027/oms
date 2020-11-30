import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaOrdenComponent } from './busqueda-orden.component';

describe('BusquedaOrdenComponent', () => {
  let component: BusquedaOrdenComponent;
  let fixture: ComponentFixture<BusquedaOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
