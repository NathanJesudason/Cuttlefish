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
