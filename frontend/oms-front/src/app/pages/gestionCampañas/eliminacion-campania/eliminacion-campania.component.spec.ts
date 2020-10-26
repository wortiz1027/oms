import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminacionCampaniaComponent } from './eliminacion-campania.component';

describe('EliminacionCampaniaComponent', () => {
  let component: EliminacionCampaniaComponent;
  let fixture: ComponentFixture<EliminacionCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminacionCampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminacionCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
