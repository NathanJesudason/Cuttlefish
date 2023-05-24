import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import {
  Observable,
  of
} from 'rxjs';

import { MenubarModule } from 'primeng/menubar';

import { ProjectData } from 'src/types/project';

import { ProjectService } from 'src/app/services/project/project.service';

import { NavMenuComponent } from './nav-menu.component';
import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';

describe('NavMenuComponent', () => {
  const data: ProjectData = {
    id: 12345,
    name: 'Project Name',
    color: '#234001',
    description: 'This is the project description',
    endDate: new Date(),
    startDate: new Date(Date.parse('19 Jan 2023 00:00:00 GMT')),
    funds: 49.95,
    sprints: [{
      id: 234597,
      name: 'Sprint Name',
      goal: '',
      startDate: new Date(Date.parse('19 Jan 2023 00:00:00 GMT')),
      endDate: new Date(Date.parse('2 Feb 2023 00:00:00 GMT')),
      isCompleted: false,
      pointsAttempted: 0,
      pointsCompleted: 0,
      projectId: 1,
      isBacklog: false,
      tasks: [{
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
        dependencies: [],
        order: 0,
        comments: [],
      }],
    }],
  };
  
  beforeEach(() => {
    return MockBuilder(NavMenuComponent, [MenubarModule])
      .mock(CreateProjectModalComponent, { export: true })
      .mock(ProjectService, {
        getAllProjects: (id: number): Observable<ProjectData[]> => of([data]),
      } as Partial<ProjectService>);
  });

  it('should create', () => {
    MockRender(NavMenuComponent);
    expect(ngMocks.findAll(NavMenuComponent)[0]).toBeTruthy();
  });
});
