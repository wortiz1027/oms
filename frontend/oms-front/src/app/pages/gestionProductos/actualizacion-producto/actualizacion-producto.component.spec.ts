import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionProductoComponent } from './actualizacion-producto.component';

describe('ActualizacionProductoComponent', () => {
  let component: ActualizacionProductoComponent;
  let fixture: ComponentFixture<ActualizacionProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizacionProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
