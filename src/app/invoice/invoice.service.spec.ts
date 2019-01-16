import { TestBed } from '@angular/core/testing';

import { InvoiceServiceService } from './invoice-service.service';

describe('InvoiceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceService = TestBed.get(InvoiceServiceService);
    expect(service).toBeTruthy();
  });
});
