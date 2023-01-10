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
    id: 3,
    name: 'Cuttlefish Team: Sprint 3',
    dueDate: new Date(),
    complete: false,
    tasks: [{
      id: 43572,
      name: 'this is the task name',
      storyPoints: 3,
      assignee: 'Person',
      description: 'This is the description of the task',
      progress: 'In Progress',
      startDate: new Date(Date.parse('12/23/2022')),
      endDate: new Date(Date.parse('12/26/2022')),
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
