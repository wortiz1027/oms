import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionCampaniaComponent } from './creacion-campania.component';

describe('CreacionCampaniaComponent', () => {
  let component: CreacionCampaniaComponent;
  let fixture: ComponentFixture<CreacionCampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionCampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
