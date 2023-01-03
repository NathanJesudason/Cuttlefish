import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

import { GanttPageComponent } from './gantt-page.component';
import { ProjectData } from '../../types/project';
import { ServerApi } from '../server-api/server-api.service';

describe('GanttPageComponent', () => {
  const data: ProjectData = {
    id: 12345,
    name: 'Project Name',
    sprints: [{
      id: 234597,
      name: 'Sprint Name',
      dueDate: new Date(),
      complete: true,
      tasks: [{
        id: 12345,
        name: 'Task Name',
        assignee: 'Me',
        storyPoints: 3,
        description: 'Task Description',
        startDate: new Date(),
        endDate: new Date(),
        progress: 'Backlog'
      }],
    }],
  };

  beforeEach(() => {
    return MockBuilder(GanttPageComponent, [RadioButtonModule, FormsModule, ButtonModule, RouterModule])
      .mock(ActivatedRoute, {
        snapshot: {
          paramMap: convertToParamMap({ 'id': data.id })
        },
      } as Partial<ActivatedRoute>, { export: true })
      .mock(ServerApi, {
        getProjectData: (id: number): ProjectData => data,
      } as Partial<ServerApi>);
  });

  it('should create', () => {
    MockRender(GanttPageComponent);
    expect(ngMocks.findAll(GanttPageComponent)[0]).toBeTruthy();
  });

  it('should respond to viewMode inputs', () => {
    const targetComponent = MockRender(GanttPageComponent).point.componentInstance;
    const viewElements = ngMocks.findAll('p-radioButton');
    const dayViewElement = viewElements[0];
    const weekViewElement = viewElements[1];
    const monthViewElement = viewElements[2];

    expect(dayViewElement.attributes.value).withContext('make sure day view element exists').toEqual('day');
    expect(weekViewElement.attributes.value).withContext('make sure week view element exists').toEqual('week');
    expect(monthViewElement.attributes.value).withContext('make sure month view element exists').toEqual('month');

    ngMocks.output(weekViewElement, 'ngModelChange').emit('week');
    expect(targetComponent.selectedViewMode).withContext('make sure week view element is properly bound with ngModel').toEqual('week');

    ngMocks.output(monthViewElement, 'ngModelChange').emit('month');
    expect(targetComponent.selectedViewMode).withContext('make sure month view element is properly bound with ngModel').toEqual('month');

    ngMocks.output(dayViewElement, 'ngModelChange').emit('day');
    expect(targetComponent.selectedViewMode).withContext('make sure day view element is properly bound with ngModel').toEqual('day');
  });

  // if we ever add things to the gantt page, add more unit tests for that
});
