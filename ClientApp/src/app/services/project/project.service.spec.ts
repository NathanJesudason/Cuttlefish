import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import {
  BackendProjectData,
  backendProjectToProjectData
} from 'src/types/project';
import { SprintService } from 'src/app/services/sprint/sprint.service';

import { ProjectService } from './project.service';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

describe('ProjectService', () => {
  let projectServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let sprintServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let taskServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let projectService: ProjectService;

  beforeEach(() => {
    projectServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sprintServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    taskServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    projectService = new ProjectService(projectServiceHttpSpy, new SprintService(sprintServiceHttpSpy, new TaskApi(taskServiceHttpSpy)));
  });

  it('should be created', () => {
    expect(projectService).toBeTruthy();
  });

  it('should get all projects', () => {
    const mockProjects: BackendProjectData[] = [{
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description',
      color: '#000000',
      startDate: '2020-01-01',
      dueDate: '2020-01-31',
      funds: 100,
    }];

    projectServiceHttpSpy.get.and.returnValue(of(mockProjects));
    projectService.getAllProjects().subscribe((projects) => {
      expect(projects).toEqual(mockProjects.map(backendProjectToProjectData));
    });
  });
});
