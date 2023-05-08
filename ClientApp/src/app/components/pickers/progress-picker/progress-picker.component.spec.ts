import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';

import { ProgressPickerComponent } from './progress-picker.component'
import { TaskData } from 'src/types/task';
import { AppModule } from 'src/app/app.module';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { of } from 'rxjs';

describe('ProgressPickerComponent', () => {
  const data: TaskData = {
    id: 12345,
    sprintID: 0,
    priority: 0,
    type: "Bug",
    cost: 0,
    name: 'Task Name',
    assignee: 'Me',
    storyPoints: 3,
    description: 'Task Description',
    startDate: new Date(),
    endDate: new Date(),
    progress: 'Backlog',
    order: 0,
  };
  
  beforeEach(() => {
    return MockBuilder(ProgressPickerComponent, [OverlayPanelModule, AppModule, TagModule])
      .mock(TaskApi, {
        completeTask: (task: TaskData) => {
          return of();
        },
        putTask: (task: TaskData) => {
          return of();
        },
      } as Partial<TaskApi>)
  });

  it('should create', () => {
    MockRender(ProgressPickerComponent, {data: data});
    expect(ngMocks.findAll(ProgressPickerComponent)[0]).toBeTruthy();
  });

  it('should have correct progress modification', () => {
    const fixture = MockRender(ProgressPickerComponent, {data: data});
    const component = fixture.point.componentInstance;

    expect(component.selectedProgress).toBe(data.progress);
    component.showOption('Done');
    expect(component.selectedProgress).toBe('Done');
  });
});
