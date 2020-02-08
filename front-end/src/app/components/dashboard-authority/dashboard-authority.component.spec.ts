import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAuthorityComponent } from './dashboard-authority.component';

describe('DashboardAuthorityComponent', () => {
  let component: DashboardAuthorityComponent;
  let fixture: ComponentFixture<DashboardAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
