/**
 * Test file for TaskService
 */

import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { SprintOrderingService } from 'src/app/services/sprint-ordering/sprint-ordering.service';
import { CommentService } from 'src/app/services/comment/comment.service';

describe('TaskService', () => {
  let taskServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let sprintOrderingServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let commentServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let taskService: TaskApi;

  beforeEach(() => {
    taskServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sprintOrderingServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['patch']);
    commentServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    taskService = new TaskApi(
      taskServiceHttpSpy,
      new SprintOrderingService(sprintOrderingServiceHttpSpy),
      new CommentService(commentServiceHttpSpy),
    );
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
      comments: [],
    }];

    taskServiceHttpSpy.get.and.returnValue(of(mockTasks));
    taskService.getAllTasks().subscribe((tasks) => {
      expect(mockTasks).toEqual(tasks);
    });
  });
});
