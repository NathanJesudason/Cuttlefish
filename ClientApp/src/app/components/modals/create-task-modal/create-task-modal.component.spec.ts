/**
 * Testing file for CreateTaskModalComponent
 */

import { FormsModule } from '@angular/forms';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { TaskTypePickerComponent } from 'src/app/components/pickers/task-type-picker/task-type-picker.component';

import { CreateTaskModalComponent } from './create-task-modal.component';

describe('CreateTaskModalComponent', () => {
  beforeEach(() => {
    return MockBuilder(CreateTaskModalComponent, [
      DialogModule, 
      ButtonModule, 
      ToastModule, 
      CheckboxModule, 
      FormsModule, 
      CalendarModule,
      InputNumberModule,
    ]).mock(TaskTypePickerComponent, { export: true });
  });

  it('should create', () => {
    MockRender(CreateTaskModalComponent);
    expect(ngMocks.findAll(CreateTaskModalComponent)[0]).toBeTruthy();
  });

  it('should be bound with visibility variable', () => {
    const fixture = MockRender(CreateTaskModalComponent);
    const component = fixture.point.componentInstance;

    const modal = ngMocks.find('p-dialog');
    expect(modal).withContext('primeng dialog element exists').toBeTruthy();

    component.showCreateTaskModal();
    fixture.detectChanges();

    const visibilityVar = ngMocks.input(modal, 'visible');
    expect(visibilityVar).withContext('modal visibility bound with createTaskModalShown').toBe(component.createTaskModalShown);
  });

  it('should show and hide modal programmatically', () => {
    const fixture = MockRender(CreateTaskModalComponent);
    const component = fixture.point.componentInstance;

    const modal = ngMocks.find('p-dialog');
    expect(modal).withContext('primeng dialog element exists').toBeTruthy();

    expect(component.createTaskModalShown).withContext('modal is hidden by default').toBeFalse();

    component.showCreateTaskModal();
    fixture.detectChanges();

    expect(component.createTaskModalShown).withContext('modal is shown after showCreateTaskModal()').toBeTrue();

    component.hideCreateTaskModal();
    fixture.detectChanges();

    expect(component.createTaskModalShown).withContext('modal is hidden after hideCreateTaskModal()').toBeFalse();
  });
});
