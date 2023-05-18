import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { ProjectData } from 'src/types/project';
import {
  BackendSprintData,
  backendSprintToSprintData
} from 'src/types/sprint';

import { SprintService } from './sprint.service';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { SprintOrderingService } from 'src/app/services/sprint-ordering/sprint-ordering.service';
import { CommentService } from 'src/app/services/comment/comment.service';

describe('SprintService', () => {
  let sprintServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let taskServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let sprintOrderingServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let commentServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let sprintService: SprintService;

  beforeEach(() => {
    taskServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sprintServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sprintOrderingServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['patch']);
    commentServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sprintService = new SprintService(
      sprintServiceHttpSpy,
      new TaskApi(
        taskServiceHttpSpy,
        new SprintOrderingService(sprintOrderingServiceHttpSpy),
        new CommentService(commentServiceHttpSpy),
      ),
    );
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
