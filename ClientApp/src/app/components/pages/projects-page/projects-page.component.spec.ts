import { RouterModule } from '@angular/router';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { ServerApi } from 'src/app/services/server-api/server-api.service';

import { ProjectsPageComponent } from './projects-page.component';
import { ProjectData } from 'src/types/project';
import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';

describe('ProjectsPageComponent', () => {
  const data: ProjectData[] = [{
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
      isCompleted: false,
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
  }];

  beforeEach(() => {
    return MockBuilder(ProjectsPageComponent, [CardModule, ButtonModule, RouterModule])
      .mock(CreateProjectModalComponent, { export: true })
      .mock(ServerApi, {
        getAllProjects: (id: number): ProjectData[] => data,
      } as Partial<ServerApi>);
  });

  it('should create', () => {
    MockRender(ProjectsPageComponent);
    expect(ngMocks.findAll(ProjectsPageComponent)[0]).toBeTruthy();
  });
});
