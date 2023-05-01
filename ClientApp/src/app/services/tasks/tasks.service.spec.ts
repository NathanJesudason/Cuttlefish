import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

describe('TaskService', () => {
  let taskServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let taskService: TaskApi;

  beforeEach(() => {
    taskServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    taskService = new TaskApi(taskServiceHttpSpy);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should get all projects', () => {
    const mockTasks: TaskData[] = [{
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description',
      assignee: "",
      assignee_id: 0,
      sprintID: 0,
      storyPoints: 0,
      progress:"Backlog",
      priority: 1,
      type: "Bug",
      cost: 10,
      startDate: new Date(),
      endDate: new Date(),
      order: 0,
    }];

    taskServiceHttpSpy.get.and.returnValue(of(mockTasks));
    taskService.getAllTasks().subscribe((tasks) => {
      expect(mockTasks).toEqual(tasks);
    });
  });
});
