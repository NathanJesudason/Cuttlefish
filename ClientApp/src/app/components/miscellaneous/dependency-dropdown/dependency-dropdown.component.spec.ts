import {
  MockRender,
  ngMocks
} from 'ng-mocks';

import { TaskData } from 'src/types/task';

import { DependencyDropdownComponent } from './dependency-dropdown.component';

describe('DependencyDropdownComponent', () => {
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
    cost: 0
  };

  it('should create', () => {
    MockRender(DependencyDropdownComponent);
    expect(ngMocks.findAll(DependencyDropdownComponent)[0]).toBeTruthy();
  });
});
