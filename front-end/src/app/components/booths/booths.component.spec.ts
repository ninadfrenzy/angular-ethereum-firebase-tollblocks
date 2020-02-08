import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothsComponent } from './booths.component';

describe('BoothsComponent', () => {
  let component: BoothsComponent;
  let fixture: ComponentFixture<BoothsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
