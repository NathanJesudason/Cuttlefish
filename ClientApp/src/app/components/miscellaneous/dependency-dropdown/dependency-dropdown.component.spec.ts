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
import { TaskTypePickerComponent } from 'src/app/components/pickers/task-type-picker/task-type-picker.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FundsInplaceComponent } from 'src/app/components/inplaces/funds-inplace/funds-inplace.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';

describe('DependencyDropdownComponent', () => {
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
    return MockBuilder(TaskPageComponent, [ToastModule])
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



/*

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';

import { DependencyDropdownComponent } from './dependency-dropdown.component';
import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { SimpleChanges } from '@angular/core';

describe('DependencyDropdownComponent', () => {
  let component: DependencyDropdownComponent;
  let fixture: ComponentFixture<DependencyDropdownComponent>;
  let taskApi: jasmine.SpyObj<TaskApi>;

  const mockTaskApi = jasmine.createSpyObj<TaskApi>('TaskApi', ['getTaskData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DependencyDropdownComponent],
      imports: [DropdownModule, RouterTestingModule],
      providers: [
        MessageService,
        ConfirmationService,
        { provide: TaskApi, useValue: mockTaskApi }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DependencyDropdownComponent);
    component = fixture.componentInstance;
    taskApi = TestBed.inject(TaskApi) as jasmine.SpyObj<TaskApi>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadDependencies when ngOnChanges is called', () => {
    spyOn(component, 'loadDependencies');
    const changes = { dependencies: { currentValue: [1, 2], previousValue: null, firstChange: true, isFirstChange: () => true } };

    component.ngOnChanges(changes as SimpleChanges);

    expect(component.loadDependencies).toHaveBeenCalled();
  });

  it('should load dependencies when loadDependencies is called', () => {
    const dependencyId = 1;
    const taskData: TaskData = {
      id: dependencyId,
      name: 'Task Name',
      assignee: 'Me',
      storyPoints: 3,
      description: 'Task Description',
      startDate: new Date(),
      endDate: new Date(),
      progress: 'Backlog',
      sprintID: 0,
      priority: 0,
      type: 'Epic',
      cost: 0
    };
    const getTaskDataSpy = mockTaskApi.getTaskData.and.returnValue(of(taskData));

    component.dependencies = [dependencyId];
    component.loadDependencies();

    expect(getTaskDataSpy).toHaveBeenCalledWith(dependencyId);
    expect(component.taskDataArray).toContain(taskData);
  });

  // Add more tests here
});

*/