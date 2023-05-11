import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

import { TaskProgressTagComponent } from './task-progress-tag.component';
import { TagModule } from 'primeng/tag';

describe('TaskProgressTagComponent', () => {
  beforeEach(() => MockBuilder(TaskProgressTagComponent, [TagModule]));

  it('should create', () => {
    MockRender(TaskProgressTagComponent, { progress: 'Backlog' });
    expect(ngMocks.findAll(TaskProgressTagComponent)[0]).toBeTruthy();
  });
});
