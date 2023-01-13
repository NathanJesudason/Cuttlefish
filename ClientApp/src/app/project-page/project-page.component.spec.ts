import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule
} from '@angular/router';
import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

import { ServerApi } from '../server-api/server-api.service';

import { SprintDropdownComponent } from '../sprint-dropdown/sprint-dropdown.component';
import { ProjectPageComponent } from './project-page.component';
import { ProjectData } from '../../types/project';

describe('ProjectPageComponent', () => {
  const data: ProjectData = {
    id: 12345,
    name: 'Project Name',
    color: '#234001',
    description: 'This is the project description',
    dueDate: new Date(),
    funds: 49.95,
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
    return MockBuilder(ProjectPageComponent, [AccordionModule, ButtonModule, RouterModule])
      .mock(SprintDropdownComponent, { export: true })
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
    MockRender(ProjectPageComponent);
    expect(ngMocks.findAll(ProjectPageComponent)[0]).toBeTruthy();
  });

  // if we ever put anything in the projectpage besides a single accordion, add more unit tests for that
});
