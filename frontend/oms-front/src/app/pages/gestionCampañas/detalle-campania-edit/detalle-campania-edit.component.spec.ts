import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCampaniaEditComponent } from './detalle-campania-edit.component';

describe('DetalleCampaniaEditComponent', () => {
  let component: DetalleCampaniaEditComponent;
  let fixture: ComponentFixture<DetalleCampaniaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCampaniaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCampaniaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
