import { TestBed } from '@angular/core/testing';

import { TeamMemberToProjectService } from './team-member-to-project.service';

describe('TeamMemberToProjectService', () => {
  let service: TeamMemberToProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMemberToProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
