import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerComponent } from './dashboard-customer.component';

describe('DashboardCustomerComponent', () => {
  let component: DashboardCustomerComponent;
  let fixture: ComponentFixture<DashboardCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
