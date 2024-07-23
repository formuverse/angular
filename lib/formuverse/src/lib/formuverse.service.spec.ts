import { TestBed } from '@angular/core/testing';

import { FormuverseService } from './formuverse.service';

describe('FormuverseService', () => {
  let service: FormuverseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormuverseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
