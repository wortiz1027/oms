import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarOrdenComponent } from './cancelar-orden.component';

describe('CancelarOrdenComponent', () => {
  let component: CancelarOrdenComponent;
  let fixture: ComponentFixture<CancelarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
