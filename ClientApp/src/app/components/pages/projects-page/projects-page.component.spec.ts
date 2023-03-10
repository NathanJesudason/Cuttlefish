import { RouterModule } from '@angular/router';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { Observable, of } from 'rxjs';

import { ProjectService } from 'src/app/services/project/project.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

import { ProjectData } from 'src/types/project';

import { ProjectsPageComponent } from './projects-page.component';
import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';
import { ProjectCardComponent } from 'src/app/components/miscellaneous/project-card/project-card.component';

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
    return MockBuilder(ProjectsPageComponent, [CardModule, ButtonModule, RouterModule, ToastModule])
      .mock(CreateProjectModalComponent, { export: true })
      .mock(ProjectCardComponent, { export: true })
      .mock(ProjectService, {
        getAllProjects: (id: number): Observable<ProjectData[]> => of(data),
      } as Partial<ProjectService>)
      .mock(AuthService, {
        getUsernameFromToken: (): string => 'Test User',
      })
      .mock(UserService, {
        getUserName: (): Observable<string> => of('Test User'),
      });
  });

  it('should create', () => {
    MockRender(ProjectsPageComponent);
    expect(ngMocks.findAll(ProjectsPageComponent)[0]).toBeTruthy();
  });
});
