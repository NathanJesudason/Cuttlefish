import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { TaskData } from 'src/types/task';
import { DependencyPickerComponent } from './dependency-picker.component';

describe('DependencyPickerComponent', () => {
  let component: DependencyPickerComponent;
  let fixture: ComponentFixture<DependencyPickerComponent>;
  let mockTaskApi: jasmine.SpyObj<TaskApi>;

  beforeEach(async () => {
    const taskApiSpy = jasmine.createSpyObj('TaskApi', ['getTaskRelations', 'addTaskRelation']);

    await TestBed.configureTestingModule({
      declarations: [DependencyPickerComponent],
      imports: [OverlayPanelModule],
      providers: [
        MessageService,
        { provide: TaskApi, useValue: taskApiSpy }
      ]
    }).compileComponents();

    mockTaskApi = TestBed.inject(TaskApi) as jasmine.SpyObj<TaskApi>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve task relations on init', () => {
    const taskRelations = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ];
    mockTaskApi.getTaskRelations.and.returnValue(of(taskRelations));

    component.ngOnInit();

    expect(mockTaskApi.getTaskRelations).toHaveBeenCalled();
    expect(component.dependencyOptions).toEqual([
      { label: 'Task 1', value: 1 },
      { label: 'Task 2', value: 2 },
      { label: 'Task 3', value: 3 }
    ]);
  });

  it('should call addTaskRelation and update dependencies when approveChanges is called', () => {
    const taskId = 12345;
    const dependencyToAdd = 2;
    const data: TaskData = {
      id: taskId,
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
      cost: 0,
      dependencies: [1]
    };
    component.data = data;
    component.selectedDependency = dependencyToAdd;

    spyOn(component, 'addDependency').and.returnValue(1);
    const addTaskRelationSpy = mockTaskApi.addTaskRelation.and.returnValue(of({}));

    component.approveChanges();

    expect(component.addDependency).toHaveBeenCalledWith(dependencyToAdd);
    expect(addTaskRelationSpy).toHaveBeenCalledWith(taskId, dependencyToAdd);
  });
});
