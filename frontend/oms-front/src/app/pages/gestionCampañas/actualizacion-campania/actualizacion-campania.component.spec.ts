import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionCampaniaComponent } from './actualizacion-campania.component';

describe('ActualizacionCampaniaComponent', () => {
  let component: ActualizacionCampaniaComponent;
  let fixture: ComponentFixture<ActualizacionCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizacionCampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
