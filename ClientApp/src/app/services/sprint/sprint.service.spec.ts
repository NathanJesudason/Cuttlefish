import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { ProjectData } from 'src/types/project';
import {
  BackendSprintData,
  backendSprintToSprintData
} from 'src/types/sprint';

import { SprintService } from './sprint.service';

describe('SprintService', () => {
  let sprintServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let sprintService: SprintService;

  beforeEach(() => {
    sprintServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sprintService = new SprintService(sprintServiceHttpSpy);
  });

  it('should be created', () => {
    expect(sprintService).toBeTruthy();
  });

  it('should get sprints for a project', () => {
    const mockProject: ProjectData = {
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description',
      color: '#000000',
      startDate: new Date(),
      endDate: new Date(),
      funds: 100,
      sprints: [],
    };

    const mockSprints: BackendSprintData[] = [{
      id: 1,
      name: 'Sprint 1',
      projectID: 1,
      goal: 'Sprint 1 description',
      storyPointsAttempted: 10,
      storyPointsCompleted: 5,
      isBacklog: false,
      isCompleted: false,
      startDate: '2020-01-01',
      endDate: '2020-01-31',
    }];

    sprintServiceHttpSpy.get.and.returnValue(of(mockSprints));
    sprintService.getSprintsForProject(mockProject, false).subscribe((project) => {
      const expectedProject = {
        ...mockProject,
        sprints: mockSprints.map(backendSprintToSprintData)
      };
      expect(project).toEqual(expectedProject);
    });
  });
});
