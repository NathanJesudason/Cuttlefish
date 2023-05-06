import {
    MockBuilder,
    MockRender,
    ngMocks
  } from 'ng-mocks';
  
  import { OverlayPanelModule } from 'primeng/overlaypanel';
  import { TagModule } from 'primeng/tag';
  
  import { TaskTypePickerComponent } from './task-type-picker.component'
  import { TaskData } from 'src/types/task';
  import { AppModule } from 'src/app/app.module';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { of } from 'rxjs';
  
  describe('TaskTypePickerComponent', () => {
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
    
    beforeEach(() => MockBuilder(TaskTypePickerComponent, [OverlayPanelModule, AppModule, TagModule]).mock(TaskApi, {
        putTask: (id: TaskData): unknown => of(data),
      } as Partial<TaskApi>));
  
    it('should create', () => {
      MockRender(TaskTypePickerComponent, {data: data});
      expect(ngMocks.findAll(TaskTypePickerComponent)[0]).toBeTruthy();
    });
  
    it('should have correct progress modification', () => {
      const fixture = MockRender(TaskTypePickerComponent, {data: data});
      const component = fixture.point.componentInstance;
  
      expect(component.selectedType).toBe(data.type);
      component.showOption('Epic');
      expect(component.selectedType).toBe('Epic');
    });
  });
  