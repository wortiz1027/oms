import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCampaniaComponent } from './busqueda-campania.component';

describe('BusquedaCampaniaComponent', () => {
  let component: BusquedaCampaniaComponent;
  let fixture: ComponentFixture<BusquedaCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaCampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
