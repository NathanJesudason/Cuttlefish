import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ProjectData } from 'src/types/project';

import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  const project: ProjectData = {
    id: 12345,
    name: 'Project Name',
    color: '#234001',
    description: 'This is the project description',
    startDate: new Date(Date.parse('19 Jan 2023 00:00:00 GMT')),
    endDate: new Date(),
    funds: 49.95,
    sprints: [],
  };
  
  beforeEach(async () => {
    return MockBuilder(ProjectCardComponent, [ConfirmDialogModule, CardModule]);
  });

  it('should create', () => {
    MockRender(ProjectCardComponent, {project: project});
    expect(ngMocks.findAll(ProjectCardComponent)[0]).toBeTruthy();
  });
});
