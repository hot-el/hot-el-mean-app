import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPlanComponent } from './building-plan.component';

describe('BuildingPlanComponent', () => {
  let component: BuildingPlanComponent;
  let fixture: ComponentFixture<BuildingPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
