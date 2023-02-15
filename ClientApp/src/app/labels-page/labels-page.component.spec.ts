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
import { ServerApi } from '../server-api/server-api.service';
import { AppModule } from '../app.module';
import { LabelData } from '../../types/label';
import { TaskData } from 'src/types/task';

describe('LabelsPageComponent', () => {
  const mockLabels: LabelData[] = [
    { name: 'thisisalabel', color: '#582C8E' },
    { name: 'thisisanotherlabel', color: '#123472' },
  ];
  const mockTasks: TaskData[] = [{
    id: 12345,
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
      .mock(ServerApi, {
        getAllLabels: () => mockLabels,
        getTasksByLabel: () => mockTasks,
      } as Partial<ServerApi>);
  });

  it('should create', () => {
    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      paramMap: convertToParamMap({ 'id': 0 }),
      queryParamMap: convertToParamMap({ 'name': null }),
    });
    
    MockRender(LabelsPageComponent);
    expect(ngMocks.findAll(LabelsPageComponent)[0]).toBeTruthy();
  });

  it('should read the project id and label from url params', () => {
    const mockProjectId = 12495;
    const mockLabelName = 'thisisalabel';
    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      paramMap: convertToParamMap({ 'id': mockProjectId }),
      queryParamMap: convertToParamMap({ 'name': mockLabelName }),
    });
    
    const fixture = MockRender(LabelsPageComponent);
    const component = fixture.point.componentInstance;

    expect(component.projectId).toEqual(mockProjectId);
    expect(component.currentLabel.name).toEqual(mockLabelName);
  });
});
