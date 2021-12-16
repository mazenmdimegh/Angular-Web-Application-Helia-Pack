import { TestBed } from '@angular/core/testing';

import { Export2Service } from './export2.service';

describe('Export2Service', () => {
  let service: Export2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Export2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
