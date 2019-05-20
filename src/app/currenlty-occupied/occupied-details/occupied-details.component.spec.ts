import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupiedDetailsComponent } from './occupied-details.component';

describe('OccupiedDetailsComponent', () => {
  let component: OccupiedDetailsComponent;
  let fixture: ComponentFixture<OccupiedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupiedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupiedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
