import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule
} from '@angular/router';

import {
  MockBuilder,
  MockInstance,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { LabelsPageComponent } from './labels-page.component';
import { ServerApi } from 'src/app/services/server-api/server-api.service';
import { AppModule } from 'src/app/app.module';
import { LabelData } from 'src/types/label';
import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { Observable, of } from 'rxjs';

describe('LabelsPageComponent', () => {
  const mockLabels: { label: string; color: string; }[] = [
    { label: 'thisisalabel', color: '#582C8E' },
    { label: 'thisisanotherlabel', color: '#123472' },
  ];
  const mockTasks: TaskData[] = [{
    id: 12345,
    sprintID: 0,
    priority: 0,
    type: "Epic",
    cost: 0,
    name: 'Task Name',
    assignee: 'Me',
    storyPoints: 3,
    description: 'Task Description',
    startDate: new Date(),
    endDate: new Date(),
    progress: 'Backlog'
  }];
  
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(LabelsPageComponent, [AppModule, RouterModule])
      .mock(TaskApi, {
        getLabels: () => of(mockLabels),
        getTasksByLabel: () => of(mockTasks),
        getAllTasksWithLabel: () => of(mockTasks),
      } as Partial<TaskApi>);
  });

  it('should create', () => {
    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      queryParamMap: convertToParamMap({ 'name': null }),
    });
    
    MockRender(LabelsPageComponent);
    expect(ngMocks.findAll(LabelsPageComponent)[0]).toBeTruthy();
  });

  it('should read the label from url params', () => {
    const mockLabelName = 'thisisalabel';
    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      queryParamMap: convertToParamMap({ 'name': mockLabelName }),
    });
    
    const fixture = MockRender(LabelsPageComponent);
    const component = fixture.point.componentInstance;

    expect(component.currentLabel.name).toEqual(mockLabelName);
  });
});
