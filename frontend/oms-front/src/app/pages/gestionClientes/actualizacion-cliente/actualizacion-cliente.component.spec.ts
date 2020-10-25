import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionClienteComponent } from './actualizacion-cliente.component';

describe('ActualizacionClienteComponent', () => {
  let component: ActualizacionClienteComponent;
  let fixture: ComponentFixture<ActualizacionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizacionClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
