import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';

import { TaskData } from 'src/types/task';
import { TaskDropdownComponent } from './task-dropdown.component';

describe('TaskDropdownComponent', () => {
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
    cost: 0
  };

  beforeEach(() => MockBuilder(TaskDropdownComponent, [
    TagModule,
    ChipModule,
    AvatarModule
  ]));

  it('should create', () => {
    MockRender(TaskDropdownComponent, {taskData: data});
    expect(ngMocks.findAll(TaskDropdownComponent)[0]).toBeTruthy();
  });
});
