import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConnectorComponent } from './dashboard-connector.component';

describe('DashboardConnectorComponent', () => {
  let component: DashboardConnectorComponent;
  let fixture: ComponentFixture<DashboardConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
