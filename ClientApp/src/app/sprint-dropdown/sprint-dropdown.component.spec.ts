import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { AccordionModule } from 'primeng/accordion';

import { SprintData } from '../../types/sprint';
import { ServerApi } from '../server-api/server-api.service';
import { SprintDropdownComponent } from './sprint-dropdown.component';

describe('SprintDropdownComponent', () => {
  const data: SprintData = {
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
  };
  
  beforeEach(() => {
    return MockBuilder(SprintDropdownComponent, AccordionModule).mock(ServerApi, {
      getSprintData: (id: number): SprintData => data,
    } as Partial<ServerApi>);
  });
    

  it('should create', () => {
    MockRender(SprintDropdownComponent);
    expect(ngMocks.findAll(SprintDropdownComponent)[0]).toBeTruthy();
  });

  it('should get SprintData provided by ServerApi', () => {
    const fixture = MockRender(SprintDropdownComponent, {id: data.id});
    expect(fixture.point.componentInstance.data).toEqual(data);
  });

  // if we ever put anything in the sprintdropdown besides a single accordiontab, add more unit tests for that
});
