import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadsComponent } from './roads.component';

describe('RoadsComponent', () => {
  let component: RoadsComponent;
  let fixture: ComponentFixture<RoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
