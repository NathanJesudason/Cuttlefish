import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { AccordionModule } from 'primeng/accordion';

import { TaskData } from '../../types/task';
import { TaskDropdownComponent } from './task-dropdown.component';

describe('TaskDropdownComponent', () => {
  const data: TaskData = {
    id: 43572,
    name: 'this is the task name',
    storyPoints: 3,
    assignee: 'Person'
  };

  beforeEach(() => MockBuilder(TaskDropdownComponent, AccordionModule));

  it('should create', () => {
    MockRender(TaskDropdownComponent, data);
    expect(ngMocks.findAll(TaskDropdownComponent)[0]).toBeTruthy();
  });

  // if we ever put anything in the taskdropdown besides a single accordiontab, add more unit tests for that
});
