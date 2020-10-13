import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionProveedoresComponent } from './creacion-proveedores.component';

describe('CreacionProveedoresComponent', () => {
  let component: CreacionProveedoresComponent;
  let fixture: ComponentFixture<CreacionProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
