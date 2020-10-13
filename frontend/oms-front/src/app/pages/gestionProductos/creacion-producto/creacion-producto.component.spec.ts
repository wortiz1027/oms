import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionProductoComponent } from './creacion-producto.component';

describe('CreacionProductoComponent', () => {
  let component: CreacionProductoComponent;
  let fixture: ComponentFixture<CreacionProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
