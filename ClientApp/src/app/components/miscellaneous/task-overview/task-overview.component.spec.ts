import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import {
  Observable,
  of
} from 'rxjs';

import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';

import { TaskData } from 'src/types/task';
import { TaskOverviewComponent } from './task-overview.component';
import { TaskApi } from 'src/app/services/tasks/tasks.service';



describe('TaskOverviewComponent', () => {
  const data: TaskData = {
    id: 43572,
    name: 'this is the task name',
    storyPoints: 3,
    assignee: 'Person',
    description: 'This is the description of the task',
    progress: 'In Progress',
    startDate: new Date(Date.parse('12/23/2022')),
    endDate: new Date(Date.parse('12/26/2022')),
    sprintID: 0,
    priority: 0,
    type: 'Epic',
    cost: 0,
    labels: [{
      name: 'label1',
      color: '#000000',
    }],
    order: 0,
    comments: [],
  };

  beforeEach(() => MockBuilder(TaskOverviewComponent, [
    TagModule,
    ChipModule,
    AvatarModule,
    RouterModule,
    DragDropModule,
  ])
  .mock(TaskApi, {
    getTaskDataWithlabels: (id: number): Observable<TaskData> => of(data),
  } as Partial<TaskApi>));

  it('should create', () => {
    MockRender(TaskOverviewComponent, {taskData: data});
    expect(ngMocks.findAll(TaskOverviewComponent)[0]).toBeTruthy();
  });
});
