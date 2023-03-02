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

describe('ProgressPickerComponent', () => {
  const data: TaskData = {
    id: 12345,
    name: 'Task Name',
    assignee: 'Me',
    storyPoints: 3,
    description: 'Task Description',
    startDate: new Date(),
    endDate: new Date(),
    progress: 'Backlog'    
  };
  
  beforeEach(() => MockBuilder(ProgressPickerComponent, [OverlayPanelModule, AppModule, TagModule]));

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
