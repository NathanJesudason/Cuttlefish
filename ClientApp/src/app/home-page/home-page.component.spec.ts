import { RouterModule } from '@angular/router';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { ServerApi } from '../server-api/server-api.service';

import { HomePageComponent } from './home-page.component';
import { ProjectData } from '../../types/project';

describe('HomePageComponent', () => {
  const data: ProjectData[] = [{
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
  }];

  beforeEach(() => {
    return MockBuilder(HomePageComponent, [CardModule, ButtonModule, RouterModule])
      .mock(ServerApi, {
        getAllProjects: (id: number): ProjectData[] => data,
      } as Partial<ServerApi>);
  });

  it('should create', () => {
    MockRender(HomePageComponent);
    expect(ngMocks.findAll(HomePageComponent)[0]).toBeTruthy();
  });
});
