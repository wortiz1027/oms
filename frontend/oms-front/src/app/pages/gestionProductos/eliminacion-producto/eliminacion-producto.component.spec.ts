import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminacionProductoComponent } from './eliminacion-producto.component';

describe('EliminacionProductoComponent', () => {
  let component: EliminacionProductoComponent;
  let fixture: ComponentFixture<EliminacionProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminacionProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
