import { TestBed } from '@angular/core/testing';

import { ServicesService } from './service.service';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesService = TestBed.get(ServicesService);
    expect(service).toBeTruthy();
  });
});
