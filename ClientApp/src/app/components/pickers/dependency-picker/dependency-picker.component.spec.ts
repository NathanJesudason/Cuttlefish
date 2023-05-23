/**
 * Test file for DependencyPickerComponent
 */

import {
  ActivatedRoute,
  convertToParamMap,
} from '@angular/router';
import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { TaskData } from 'src/types/task';

import { DependencyPickerComponent } from './dependency-picker.component';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { of } from 'rxjs';

describe('DependencyPickerComponent', () => {
  const mockLabels: { label: string; color: string; }[] = [
    { label: 'thisisalabel', color: '#582C8E' },
    { label: 'thisisanotherlabel', color: '#123472' },
  ];

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
    order: 0,
    comments: [],
  };

  beforeEach(() => {
    return MockBuilder(DependencyPickerComponent, [])
      .mock(DependencyPickerComponent, { export: true })
      .mock(ActivatedRoute, {
        snapshot: {
          paramMap: convertToParamMap({ 'id': data.id })
        },
      } as Partial<ActivatedRoute>, { export: true })
      .mock(TaskApi, {
        getTaskDataWithLabels: (id: number) => of(data),
        getLabels: () => of(mockLabels),
      } as Partial<TaskApi>);
  });

  it('should create', () => {
    MockRender(DependencyPickerComponent);
    expect(ngMocks.findAll(DependencyPickerComponent)[0]).toBeTruthy();
  });
});
