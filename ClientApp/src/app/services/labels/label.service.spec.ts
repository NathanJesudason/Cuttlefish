import { TestBed } from '@angular/core/testing';

import { LabelService } from './label.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LabelService', () => {
  let service: LabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule ]});
    service = TestBed.inject(LabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
