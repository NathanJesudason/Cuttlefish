import { ActivatedRoute, convertToParamMap } from '@angular/router';
import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { TaskData } from '../../types/task';

import { ServerApi } from '../server-api/server-api.service';
import { TaskPageComponent } from './task-page.component';

describe('TaskPageComponent', () => {
  const data: TaskData = {
    id: 43572,
    name: 'this is the task name',
    storyPoints: 3,
    assignee: 'Person'
  };

  beforeEach(() => {
    return MockBuilder(TaskPageComponent)
      .mock(ActivatedRoute, {
        snapshot: {
          paramMap: convertToParamMap({ 'id': data.id })
        }
      } as Partial<ActivatedRoute>)
      .mock(ServerApi, {
        getFullTaskData: (id: number): TaskData => data,
      } as Partial<ServerApi>);
  });

  it('should create', () => {
    MockRender(TaskPageComponent, data);
    expect(ngMocks.findAll(TaskPageComponent)[0]).toBeTruthy();
  });
});
