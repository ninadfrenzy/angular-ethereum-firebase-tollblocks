import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectTollComponent } from './collect-toll.component';

describe('CollectTollComponent', () => {
  let component: CollectTollComponent;
  let fixture: ComponentFixture<CollectTollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectTollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectTollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
