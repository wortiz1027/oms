import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCampaniaComponent } from './buscar-campania.component';

describe('BuscarCampaniaComponent', () => {
  let component: BuscarCampaniaComponent;
  let fixture: ComponentFixture<BuscarCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarCampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
