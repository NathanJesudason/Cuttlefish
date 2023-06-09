import {
  ActivatedRoute,
  convertToParamMap,
  Params,
  RouterModule
} from '@angular/router';
import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskData } from 'src/types/task';
import { TitleInplaceComponent } from 'src/app/components/inplaces/title-inplace/title-inplace.component';
import { DescriptionInplaceComponent } from 'src/app/components/inplaces/description-inplace/description-inplace.component';
import { ProgressPickerComponent } from 'src/app/components/pickers/progress-picker/progress-picker.component';
import { DateInplaceComponent } from 'src/app/components/inplaces/date-inplace/date-inplace.component';
import { TaskPageComponent } from './task-page.component';

import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { of } from 'rxjs';

import { TaskTypePickerComponent } from 'src/app/components/pickers/task-type-picker/task-type-picker.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FundsInplaceComponent } from 'src/app/components/inplaces/funds-inplace/funds-inplace.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { DependencyDropdownComponent } from '../../miscellaneous/dependency-dropdown/dependency-dropdown.component';
import { DependencyPickerComponent } from '../../pickers/dependency-picker/dependency-picker.component';
import { DeleteDependencyPickerComponent } from '../../pickers/delete-dependency-picker/delete-dependency-picker.component';
import { CommentsSectionComponent } from 'src/app/components/miscellaneous/comments-section/comments-section.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { SprintData } from 'src/types/sprint';
import { ProjectData } from 'src/types/project';
import { SprintService } from 'src/app/services/sprint/sprint.service';

describe('TaskPageComponent', () => {
  const mockLabels: { label: string; color: string; }[] = [
    { label: 'thisisalabel', color: '#582C8E' },
    { label: 'thisisanotherlabel', color: '#123472' },
  ];

  const data: TaskData = {
    id: 43572,
    name: 'this is the task name',
    storyPoints: 3,
    assignee: 'Person',
    description: 'This is the description of the task',
    progress: 'In Progress',
    startDate: new Date(Date.parse('12/23/2022')),
    endDate: new Date(Date.parse('12/26/2022')),
    sprintID: 0,
    priority: 0,
    type: 'Epic',
    cost: 0,
    order: 0,
    comments: [],
  };

  const mockSprint: SprintData = {
    id: 0,
    name: '',
    goal: '',
    startDate: new Date(Date.parse('12/23/2022')),
    endDate: new Date(Date.parse('12/26/2022')),
    isCompleted: false,
    pointsCompleted: 0,
    pointsAttempted: 0,
    projectId: 0,
    isBacklog: false,
    tasks: [data],
  };

  const mockProject: ProjectData = {
    id: 0,
    name: '',
    description: '',
    startDate: new Date(Date.parse('12/23/2022')),
    endDate: new Date(Date.parse('12/26/2022')),
    sprints: [mockSprint],
    color: '#000000',
    funds: 0,
  };

  beforeEach(() => {
    return MockBuilder(TaskPageComponent,
      [TagModule, ChipModule, ButtonModule, RouterModule,
       ProgressSpinnerModule, MultiSelectModule, BrowserAnimationsModule,
       ToolbarModule, DropdownModule, FormsModule, ReactiveFormsModule])
      .mock(DescriptionInplaceComponent, { export: true })
      .mock(TitleInplaceComponent, { export: true })
      .mock(ProgressPickerComponent, { export: true })
      .mock(TaskTypePickerComponent, { export: true })
      .mock(FundsInplaceComponent, {export: true })
      .mock(DateInplaceComponent, { export: true })
      .mock(DependencyDropdownComponent, { export: true })
      .mock(DependencyPickerComponent, { export: true })
      .mock(DeleteDependencyPickerComponent, { export: true })
      .mock(CommentsSectionComponent, { export: true })
      .mock(ActivatedRoute, {
        snapshot: {
          paramMap: convertToParamMap({ 'id': data.id })
        },
        params: of({ 'id': data.id } as Params),
      } as Partial<ActivatedRoute>, { export: true })
      .mock(TaskApi, {
        getTaskDataWithLabels: (id: number) => of(data),
        getLabels: () => of(mockLabels),
      } as Partial<TaskApi>)
      .mock(ProjectService, {
        getProject: (id: number, getSprints: boolean, getTasks: boolean) => of(mockProject),
      } as Partial<ProjectService>)
      .mock(SprintService, {
        getSprint: (id: number) => of(mockSprint),
      } as Partial<SprintService>);
  });

  it('should create', () => {
    MockRender(TaskPageComponent);
    expect(ngMocks.findAll(TaskPageComponent)[0]).toBeTruthy();
  });
});
