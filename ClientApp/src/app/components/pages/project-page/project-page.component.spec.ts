import {
  ActivatedRoute,
  convertToParamMap,
  Params,
  RouterModule
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { of } from 'rxjs';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ServerApi } from 'src/app/services/server-api/server-api.service';

import { SprintDropdownComponent } from 'src/app/components/miscellaneous/sprint-dropdown/sprint-dropdown.component';
import { ProjectPageComponent } from './project-page.component';
import { TitleInplaceComponent } from 'src/app/components/inplaces/title-inplace/title-inplace.component';

import { CreateSprintModalComponent } from 'src/app/components/modals/create-sprint-modal/create-sprint-modal.component';

import { ProjectData } from 'src/types/project';
import { SprintData } from 'src/types/sprint';

describe('ProjectPageComponent', () => {
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
    return MockBuilder(ProjectPageComponent, [
        AccordionModule,
        ButtonModule,
        RouterModule,
        ToolbarModule,
        CheckboxModule,
        FormsModule,
        ToastModule,
        DividerModule,
        BrowserAnimationsModule,
        ProgressSpinnerModule,
      ])
      .mock(SprintDropdownComponent, { export: true })
      .mock(TitleInplaceComponent, { export: true })
      .mock(CreateSprintModalComponent, { export: true })
      .mock(ActivatedRoute, {
        snapshot: {
          paramMap: convertToParamMap({ 'id': data.id })
        },
        params: of({ 'id': data.id } as Partial<Params>),
      } as Partial<ActivatedRoute>, { export: true })
      .mock(ServerApi, {
        getProjectData: (id: number): ProjectData => data,
      } as Partial<ServerApi>);
  });

  it('should create', () => {
    MockRender(ProjectPageComponent);
    expect(ngMocks.findAll(ProjectPageComponent)[0]).toBeTruthy();
  });

  it('should order sprints correctly', () => {
    const blankDate = new Date();
    const test1: SprintData[] = [
      {
        id: 0,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: true,
        tasks: [],
      },
      {
        id: 1,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      }
    ];
    const test1Expected: SprintData[] = [
      {
        id: 1,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      },
      {
        id: 0,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: true,
        tasks: [],
      }
    ];
    expect(test1.sort(ProjectPageComponent.sprintOrdering))
      .withContext('Prioritize backlogs at bottom')
      .toEqual(test1Expected);
    
    const test2: SprintData[] = [
      {
        id: 0,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      },
      {
        id: 1,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: true,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      }
    ];
    const test2Expected: SprintData[] = [
      {
        id: 1,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: true,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      },
      {
        id: 0,
        name: '',
        goal: '',
        startDate: blankDate,
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      }
    ];
    expect(test2.sort(ProjectPageComponent.sprintOrdering))
      .withContext('Prioritize completed sprints at top')
      .toEqual(test2Expected);
    
    const test3: SprintData[] = [
      {
        id: 0,
        name: '',
        goal: '',
        startDate: new Date('19 Jan 2023 00:00:00 GMT'),
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      },
      {
        id: 1,
        name: '',
        goal: '',
        startDate: new Date('18 Jan 2023 00:00:00 GMT'),
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      }
    ];
    const test3Expected: SprintData[] = [
      {
        id: 1,
        name: '',
        goal: '',
        startDate: new Date('18 Jan 2023 00:00:00 GMT'),
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      },
      {
        id: 0,
        name: '',
        goal: '',
        startDate: new Date('19 Jan 2023 00:00:00 GMT'),
        endDate: blankDate,
        isCompleted: false,
        pointsAttempted: 0,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: false,
        tasks: [],
      }
    ];
    expect(test3.sort(ProjectPageComponent.sprintOrdering))
      .withContext('Prioritize earlier sprints at top')
      .toEqual(test3Expected);
  });
});
