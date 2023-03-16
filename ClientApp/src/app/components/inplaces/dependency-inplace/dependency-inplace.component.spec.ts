import {
    MockBuilder,
    MockRender,
    ngMocks
  } from 'ng-mocks';
  
  import { OverlayPanelModule } from 'primeng/overlaypanel';
  import { TagModule } from 'primeng/tag';
  
  import { DependencyInplaceComponent } from './dependency-inplace.component';
  import { TaskData } from 'src/types/task';
  import { AppModule } from 'src/app/app.module';
  
  describe('DependencyInplaceComponent', () => {
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
    
    
  });
