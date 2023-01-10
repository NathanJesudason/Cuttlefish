import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule
} from '@angular/router';
import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';

import { TaskData } from '../../types/task';

import { ServerApi } from '../server-api/server-api.service';
import { TaskPageComponent } from './task-page.component';

describe('TaskPageComponent', () => {
  const data: TaskData = {
    id: 43572,
    name: 'this is the task name',
    storyPoints: 3,
    assignee: 'Person',
    description: 'This is the description of the task',
    progress: 'In Progress',
    startDate: new Date(Date.parse('12/23/2022')),
    endDate: new Date(Date.parse('12/26/2022')),
  };

  beforeEach(() => {
    return MockBuilder(TaskPageComponent, [TagModule, ChipModule, ButtonModule, RouterModule])
      .mock(ActivatedRoute, {
        snapshot: {
          paramMap: convertToParamMap({ 'id': data.id })
        },
      } as Partial<ActivatedRoute>, { export: true })
      .mock(ServerApi, {
        getFullTaskData: (id: number): TaskData => data,
      } as Partial<ServerApi>);
  });

  it('should create', () => {
    MockRender(TaskPageComponent);
    expect(ngMocks.findAll(TaskPageComponent)[0]).toBeTruthy();
  });
});
