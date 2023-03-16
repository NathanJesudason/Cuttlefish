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
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';

import { TaskData } from 'src/types/task';
import { TitleInplaceComponent } from 'src/app/components/inplaces/title-inplace/title-inplace.component';
import { DescriptionInplaceComponent } from 'src/app/components/inplaces/description-inplace/description-inplace.component';
import { ProgressPickerComponent } from 'src/app/components/pickers/progress-picker/progress-picker.component';
import { DateInplaceComponent } from 'src/app/components/inplaces/date-inplace/date-inplace.component';

import { TaskPageComponent } from './task-page.component';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { of } from 'rxjs';
import { TaskTypePickerComponent } from '../../pickers/task-type-picker/task-type-picker.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FundsInplaceComponent } from '../../inplaces/funds-inplace/funds-inplace.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    cost: 0
  };

  beforeEach(() => {
    return MockBuilder(TaskPageComponent, [TagModule, ChipModule, ButtonModule, RouterModule, ProgressSpinnerModule, MultiSelectModule, BrowserAnimationsModule])
      .mock(DescriptionInplaceComponent, { export: true })
      .mock(TitleInplaceComponent, { export: true })
      .mock(ProgressPickerComponent, { export: true })
      .mock(TaskTypePickerComponent, { export: true })
      .mock(FundsInplaceComponent, {export: true })
      .mock(DateInplaceComponent, { export: true })
      .mock(ActivatedRoute, {
        snapshot: {
          paramMap: convertToParamMap({ 'id': data.id })
        },
      } as Partial<ActivatedRoute>, { export: true })
      .mock(TaskApi, {
        getTaskDataWithLabels: (id: number) => of(data),
        getLabels: () => of(mockLabels),
      } as Partial<TaskApi>);
  });

  it('should create', () => {
    MockRender(TaskPageComponent);
    expect(ngMocks.findAll(TaskPageComponent)[0]).toBeTruthy();
  });
});
