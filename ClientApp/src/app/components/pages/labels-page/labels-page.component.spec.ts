import {
  ActivatedRoute,
  convertToParamMap,
  Router,
  RouterModule
} from '@angular/router';

import {
  MockBuilder,
  MockInstance,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { LabelsPageComponent } from './labels-page.component';
import { AppModule } from 'src/app/app.module';
import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { of } from 'rxjs';
import { LabelService } from 'src/app/services/labels/label.service';
import { TestBed } from '@angular/core/testing';

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
    progress: 'Backlog',
    order: 0,
    comments: [],
  }];
  
  MockInstance.scope();


  beforeEach(() => {
    return MockBuilder(LabelsPageComponent, [AppModule, RouterModule, Router])
      .mock(TaskApi, {
        getLabels: () => of(mockLabels),
        getTasksByLabel: () => of(mockTasks),
        getAllTasksWithLabel: () => of(mockTasks),
      } as Partial<TaskApi>)
      .mock(LabelService, {
        getLabels: () => of(mockLabels)
      })
      
  });

  it('should create', () => {
    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      queryParamMap: convertToParamMap({ 'label': null }),
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
      queryParamMap: convertToParamMap({ 'label': mockLabelName }),
    });
    
    const fixture = MockRender(LabelsPageComponent);
    const component = fixture.point.componentInstance;

    expect(component.currentLabel!.label).toEqual(mockLabelName);
  });
});
