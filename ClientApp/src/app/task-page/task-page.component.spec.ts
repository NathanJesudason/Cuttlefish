import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { AccordionModule } from 'primeng/accordion';

import { TaskData } from '../../types/task';
import { TaskPageComponent } from './task-page.component';

describe('TaskPageComponent', () => {
  const data: TaskData = {
    id: 43572,
    name: 'this is the task name',
    storyPoints: 3,
    assignee: 'Person'
  };

  beforeEach(() => MockBuilder(TaskPageComponent, AccordionModule));

  it('should create', () => {
    MockRender(TaskPageComponent, data);
    expect(ngMocks.findAll(TaskPageComponent)[0]).toBeTruthy();
  });
});
