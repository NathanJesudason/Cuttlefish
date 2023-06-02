import { TestBed } from '@angular/core/testing';

import { TeamMemberToProjectService } from './team-member-to-project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamMemberToProjectService', () => {
  let service: TeamMemberToProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(TeamMemberToProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
