import { TestBed } from '@angular/core/testing';

import { BuildingPlanService } from './building-plan.service';

describe('BuildingPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildingPlanService = TestBed.get(BuildingPlanService);
    expect(service).toBeTruthy();
  });
});
