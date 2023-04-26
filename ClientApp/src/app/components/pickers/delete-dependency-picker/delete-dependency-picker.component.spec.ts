import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';

import { DeleteDependencyPickerComponent } from './delete-dependency-picker.component';
import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { of } from 'rxjs';

describe('DeleteDependencyPickerComponent', () => {
  let component: DeleteDependencyPickerComponent;
  let fixture: ComponentFixture<DeleteDependencyPickerComponent>;
  let taskApi: jasmine.SpyObj<TaskApi>;

  const mockTaskApi = jasmine.createSpyObj<TaskApi>('TaskApi', ['deleteTaskRelation']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDependencyPickerComponent],
      imports: [OverlayPanelModule, HttpClientTestingModule],
      providers: [
        MessageService,
        { provide: TaskApi, useValue: mockTaskApi }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDependencyPickerComponent);
    component = fixture.componentInstance;
    taskApi = TestBed.inject(TaskApi) as jasmine.SpyObj<TaskApi>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set dependencyOptions on ngOnInit', () => {
    const dependencies = [1, 2];
    const data: TaskData = {
      id: 12345,
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
      dependencies: dependencies
    };
    component.data = data;

    component.ngOnInit();

    expect(component.dependencyOptions).toEqual(dependencies);
  });

  it('should remove dependency when removeDependency is called', () => {
    const dependencyToRemove = 2;
    const initialDependencies = [1, dependencyToRemove];
    const expectedDependencies = [1];
    const data: TaskData = {
      id: 12345,
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
      dependencies: initialDependencies
    };
    component.data = data;

    const result = component.removeDependency(dependencyToRemove);

    expect(result).toBe(1);
    expect(component.data.dependencies).toEqual(expectedDependencies);
  });

  it('should call deleteTaskRelation and removeDependency when approveChanges is called', () => {
    const taskId = 12345;
    const dependencyToRemove = 2;
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
      dependencies: [1, dependencyToRemove]
    };
    component.data = data;
    component.selectedDependency = dependencyToRemove;

    const deleteTaskRelationSpy = mockTaskApi.deleteTaskRelation.and.returnValue(of({}));

    spyOn(component, 'removeDependency').and.returnValue(1);

    component.approveChanges();

    expect(deleteTaskRelationSpy).toHaveBeenCalledWith(taskId, dependencyToRemove);
    expect(component.removeDependency).toHaveBeenCalledWith(dependencyToRemove);
  });
});