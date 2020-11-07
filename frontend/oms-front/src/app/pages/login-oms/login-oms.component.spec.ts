import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOmsComponent } from './login-oms.component';

describe('LoginOmsComponent', () => {
  let component: LoginOmsComponent;
  let fixture: ComponentFixture<LoginOmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
