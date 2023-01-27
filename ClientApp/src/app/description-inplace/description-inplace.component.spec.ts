import { FormsModule } from '@angular/forms';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';

import { DescriptionInplaceComponent } from './description-inplace.component';
import { ProjectData } from '../../types/project';

describe('DateInplaceComponent', () => {
  const data: ProjectData = {
    id: 12345,
    name: 'Project Name',
    color: '#234001',
    description: 'This is the project description',
    endDate: new Date(),
    funds: 49.95,
    sprints: [{
      id: 234597,
      name: 'Sprint Name',
      startDate: new Date(Date.parse('19 Jan 2023 00:00:00 GMT')),
      endDate: new Date(Date.parse('2 Feb 2023 00:00:00 GMT')),
      pointsAttempted: 0,
      pointsCompleted: 0,
      projectId: 1,
      isBacklog: false,
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
  
  beforeEach(() => MockBuilder(DescriptionInplaceComponent, [CalendarModule, FormsModule, ToastModule]));

  it('should create', () => {
    MockRender(DescriptionInplaceComponent, {entityData: data});
    expect(ngMocks.findAll(DescriptionInplaceComponent)[0]).toBeTruthy();
  });

  it('should have correct inplace structure', () => {
    const fixture = MockRender(DescriptionInplaceComponent, {entityData: data});
    const component = fixture.point.componentInstance;

    const calendar = ngMocks.find('p-calendar');
    expect(calendar).withContext('primeng\'s calendar HTML element exists').toBeTruthy();
    const calendarBoundValue = ngMocks.input(calendar, 'ngModel');
    expect(calendarBoundValue).withContext('calendar is properly bound with ngModel').toBe(component.selectedDate);
  });
});
