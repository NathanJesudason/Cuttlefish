/**
 * Test file for ResetPasswordService
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ResetPasswordService } from './reset-password.service';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [ HttpClientTestingModule ],
      providers: [ 
        ResetPasswordService,
        
      ],
    });
    service = TestBed.inject(ResetPasswordService);
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
