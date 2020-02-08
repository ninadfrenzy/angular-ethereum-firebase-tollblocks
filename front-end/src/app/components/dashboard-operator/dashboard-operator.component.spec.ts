import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOperatorComponent } from './dashboard-operator.component';

describe('DashboardOperatorComponent', () => {
  let component: DashboardOperatorComponent;
  let fixture: ComponentFixture<DashboardOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
