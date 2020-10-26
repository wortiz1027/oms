import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProductosComponent } from './asignar-productos.component';

describe('AsignarProductosComponent', () => {
  let component: AsignarProductosComponent;
  let fixture: ComponentFixture<AsignarProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
