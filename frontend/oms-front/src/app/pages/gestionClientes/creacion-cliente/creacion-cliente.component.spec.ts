import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionClienteComponent } from './creacion-cliente.component';

describe('CreacionClienteComponent', () => {
  let component: CreacionClienteComponent;
  let fixture: ComponentFixture<CreacionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
